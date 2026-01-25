-- Create function to calculate distance between two points (Haversine formula)
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DECIMAL,
  lng1 DECIMAL,
  lat2 DECIMAL,
  lng2 DECIMAL
) RETURNS DECIMAL AS $$
DECLARE
  earth_radius DECIMAL := 3959; -- miles
  dlat DECIMAL;
  dlng DECIMAL;
  a DECIMAL;
  c DECIMAL;
BEGIN
  dlat := radians(lat2 - lat1);
  dlng := radians(lng2 - lng1);

  a := sin(dlat/2) * sin(dlat/2) +
       cos(radians(lat1)) * cos(radians(lat2)) *
       sin(dlng/2) * sin(dlng/2);

  c := 2 * atan2(sqrt(a), sqrt(1-a));

  RETURN earth_radius * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create enum for bid status
CREATE TYPE bid_status AS ENUM ('pending', 'accepted', 'rejected');

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  trade_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  message TEXT,
  estimated_timeline TEXT,
  status bid_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT one_bid_per_trade_per_job UNIQUE (job_id, trade_id)
);

-- Enable RLS
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bids
-- Clients can view bids on their jobs
CREATE POLICY "Clients can view bids on own jobs"
  ON bids FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = bids.job_id
      AND jobs.client_id = auth.uid()
    )
  );

-- Trades can view their own bids
CREATE POLICY "Trades can view own bids"
  ON bids FOR SELECT
  USING (auth.uid() = trade_id);

-- Trades can create bids
CREATE POLICY "Trades can create bids"
  ON bids FOR INSERT
  WITH CHECK (
    auth.uid() = trade_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'trade'
    )
  );

-- Clients can update bid status (accept/reject)
CREATE POLICY "Clients can update bid status on own jobs"
  ON bids FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = bids.job_id
      AND jobs.client_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bids_job_id ON bids(job_id);
CREATE INDEX IF NOT EXISTS idx_bids_trade_id ON bids(trade_id);
CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);
CREATE INDEX IF NOT EXISTS idx_bids_created_at ON bids(created_at DESC);

-- Add updated_at trigger
CREATE TRIGGER update_bids_updated_at
  BEFORE UPDATE ON bids
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to get nearby jobs
CREATE OR REPLACE FUNCTION get_nearby_jobs(
  trade_lat DECIMAL,
  trade_lng DECIMAL,
  max_distance DECIMAL
) RETURNS TABLE (
  id UUID,
  client_id UUID,
  title TEXT,
  description TEXT,
  address TEXT,
  lat DECIMAL,
  lng DECIMAL,
  service_type service_type,
  status job_status,
  budget_min INTEGER,
  budget_max INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  distance DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    j.id,
    j.client_id,
    j.title,
    j.description,
    j.address,
    j.lat,
    j.lng,
    j.service_type,
    j.status,
    j.budget_min,
    j.budget_max,
    j.created_at,
    calculate_distance(trade_lat, trade_lng, j.lat, j.lng) AS distance
  FROM jobs j
  WHERE j.status = 'open'
    AND calculate_distance(trade_lat, trade_lng, j.lat, j.lng) <= max_distance
  ORDER BY distance ASC;
END;
$$ LANGUAGE plpgsql;
