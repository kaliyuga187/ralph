-- Create enum for job status
CREATE TYPE job_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');

-- Create enum for service types
CREATE TYPE service_type AS ENUM (
  'roofing',
  'solar',
  'landscaping',
  'general',
  'hvac',
  'plumbing',
  'electrical',
  'painting',
  'deck_building',
  'fencing',
  'concrete',
  'siding'
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  service_type service_type NOT NULL,
  status job_status DEFAULT 'open' NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_images table
CREATE TABLE IF NOT EXISTS job_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  is_aerial BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for jobs table
-- Clients can view their own jobs
CREATE POLICY "Clients can view own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = client_id);

-- Clients can create their own jobs
CREATE POLICY "Clients can create jobs"
  ON jobs FOR INSERT
  WITH CHECK (
    auth.uid() = client_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'client'
    )
  );

-- Clients can update their own jobs
CREATE POLICY "Clients can update own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = client_id);

-- Trades can view open jobs in their service area
CREATE POLICY "Trades can view jobs in service area"
  ON jobs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      JOIN trade_profiles ON profiles.id = trade_profiles.user_id
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'trade'
      -- Geo-matching will be added in US-012
    )
  );

-- RLS Policies for job_images table
-- Same access as jobs table
CREATE POLICY "Users can view images for accessible jobs"
  ON job_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = job_images.job_id
      AND (
        jobs.client_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
          AND profiles.role = 'trade'
        )
      )
    )
  );

CREATE POLICY "Clients can upload images to own jobs"
  ON job_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = job_images.job_id
      AND jobs.client_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_client_id ON jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_service_type ON jobs(service_type);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(lat, lng);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_images_job_id ON job_images(job_id);

-- Add updated_at trigger for jobs
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
