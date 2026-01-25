-- ============================================
-- AUDIT LOGGING & SECURITY ENHANCEMENTS
-- Migration 006
-- ============================================

-- Create audit_log table for tracking all database changes
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);

-- Create login_attempts table for tracking failed login attempts
CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT false,
  attempted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for login attempts
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip_address, attempted_at DESC);

-- Create security_events table for tracking security-related events
CREATE TABLE IF NOT EXISTS security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  user_id UUID REFERENCES auth.users(id),
  ip_address TEXT,
  user_agent TEXT,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for security events
CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_severity ON security_events(severity);
CREATE INDEX IF NOT EXISTS idx_security_events_user ON security_events(user_id);
CREATE INDEX IF NOT EXISTS idx_security_events_created ON security_events(created_at DESC);

-- ============================================
-- AUDIT TRIGGER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (
      table_name,
      record_id,
      action,
      old_data,
      user_id
    ) VALUES (
      TG_TABLE_NAME,
      OLD.id,
      'DELETE',
      row_to_json(OLD),
      auth.uid()
    );
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (
      table_name,
      record_id,
      action,
      old_data,
      new_data,
      user_id
    ) VALUES (
      TG_TABLE_NAME,
      NEW.id,
      'UPDATE',
      row_to_json(OLD),
      row_to_json(NEW),
      auth.uid()
    );
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (
      table_name,
      record_id,
      action,
      new_data,
      user_id
    ) VALUES (
      TG_TABLE_NAME,
      NEW.id,
      'INSERT',
      row_to_json(NEW),
      auth.uid()
    );
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- APPLY AUDIT TRIGGERS TO TABLES
-- ============================================

-- Profiles table
DROP TRIGGER IF EXISTS profiles_audit_trigger ON profiles;
CREATE TRIGGER profiles_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON profiles
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- Trade profiles table
DROP TRIGGER IF EXISTS trade_profiles_audit_trigger ON trade_profiles;
CREATE TRIGGER trade_profiles_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON trade_profiles
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- Jobs table
DROP TRIGGER IF EXISTS jobs_audit_trigger ON jobs;
CREATE TRIGGER jobs_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON jobs
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- Bids table
DROP TRIGGER IF EXISTS bids_audit_trigger ON bids;
CREATE TRIGGER bids_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON bids
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- Messages table
DROP TRIGGER IF EXISTS messages_audit_trigger ON messages;
CREATE TRIGGER messages_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON messages
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- Reviews table
DROP TRIGGER IF EXISTS reviews_audit_trigger ON reviews;
CREATE TRIGGER reviews_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- ============================================
-- ACCOUNT LOCKOUT FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION is_account_locked(user_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  failed_attempts INTEGER;
BEGIN
  -- Count failed login attempts in the last 15 minutes
  SELECT COUNT(*) INTO failed_attempts
  FROM login_attempts
  WHERE email = user_email
    AND success = false
    AND attempted_at > NOW() - INTERVAL '15 minutes';

  -- Account is locked if there are 5 or more failed attempts
  RETURN failed_attempts >= 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTION TO RECORD LOGIN ATTEMPT
-- ============================================

CREATE OR REPLACE FUNCTION record_login_attempt(
  p_email TEXT,
  p_ip_address TEXT,
  p_user_agent TEXT,
  p_success BOOLEAN
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO login_attempts (email, ip_address, user_agent, success)
  VALUES (p_email, p_ip_address, p_user_agent, p_success);

  -- Clean up old login attempts (older than 24 hours)
  DELETE FROM login_attempts
  WHERE attempted_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTION TO LOG SECURITY EVENT
-- ============================================

CREATE OR REPLACE FUNCTION log_security_event(
  p_event_type TEXT,
  p_severity TEXT,
  p_description TEXT,
  p_metadata JSONB DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO security_events (
    event_type,
    severity,
    description,
    metadata,
    user_id,
    ip_address,
    user_agent
  ) VALUES (
    p_event_type,
    p_severity,
    p_description,
    p_metadata,
    COALESCE(p_user_id, auth.uid()),
    p_ip_address,
    p_user_agent
  );

  -- Clean up old security events (older than 90 days) for low severity
  DELETE FROM security_events
  WHERE created_at < NOW() - INTERVAL '90 days'
    AND severity = 'low';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ROW LEVEL SECURITY FOR AUDIT TABLES
-- ============================================

-- Enable RLS on audit tables
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- Admin users can view all audit logs
-- (In production, you'd have an admin role check here)
CREATE POLICY "Audit logs are viewable by admins only"
  ON audit_log
  FOR SELECT
  USING (false); -- For now, only accessible via service role

-- Login attempts are not accessible via normal queries
CREATE POLICY "Login attempts are not publicly accessible"
  ON login_attempts
  FOR ALL
  USING (false);

-- Security events are not publicly accessible
CREATE POLICY "Security events are not publicly accessible"
  ON security_events
  FOR ALL
  USING (false);

-- ============================================
-- AUTOMATED CLEANUP FUNCTION
-- ============================================

-- Function to clean up old audit data
CREATE OR REPLACE FUNCTION cleanup_audit_data()
RETURNS VOID AS $$
BEGIN
  -- Keep audit logs for 1 year
  DELETE FROM audit_log
  WHERE created_at < NOW() - INTERVAL '1 year';

  -- Keep login attempts for 30 days
  DELETE FROM login_attempts
  WHERE attempted_at < NOW() - INTERVAL '30 days';

  -- Keep low-severity security events for 90 days
  DELETE FROM security_events
  WHERE created_at < NOW() - INTERVAL '90 days'
    AND severity IN ('low', 'medium');

  -- Keep high-severity events for 2 years
  DELETE FROM security_events
  WHERE created_at < NOW() - INTERVAL '2 years'
    AND severity IN ('high', 'critical');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on functions
GRANT EXECUTE ON FUNCTION is_account_locked(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION record_login_attempt(TEXT, TEXT, TEXT, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION log_security_event(TEXT, TEXT, TEXT, JSONB, UUID, TEXT, TEXT) TO authenticated;

COMMENT ON TABLE audit_log IS 'Comprehensive audit trail of all database changes';
COMMENT ON TABLE login_attempts IS 'Tracks login attempts for account lockout functionality';
COMMENT ON TABLE security_events IS 'Logs security-related events for monitoring and alerting';
COMMENT ON FUNCTION is_account_locked(TEXT) IS 'Checks if an account is locked due to failed login attempts';
COMMENT ON FUNCTION record_login_attempt(TEXT, TEXT, TEXT, BOOLEAN) IS 'Records a login attempt (success or failure)';
COMMENT ON FUNCTION log_security_event(TEXT, TEXT, TEXT, JSONB, UUID, TEXT, TEXT) IS 'Logs a security event for monitoring';
