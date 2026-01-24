-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('client', 'trade');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trade_profiles table for contractor-specific data
CREATE TABLE IF NOT EXISTS trade_profiles (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  business_name TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  service_radius_miles INTEGER NOT NULL DEFAULT 25,
  zip_code TEXT NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 0.00,
  total_jobs INTEGER DEFAULT 0,
  phone TEXT,
  profile_photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trade_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
-- Users can see only their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (during signup)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for trade_profiles table
-- Trades can view their own trade profile
CREATE POLICY "Trades can view own trade profile"
  ON trade_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Trades can update their own trade profile
CREATE POLICY "Trades can update own trade profile"
  ON trade_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Trades can insert their own trade profile
CREATE POLICY "Trades can insert own trade profile"
  ON trade_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Clients can view trade profiles (for browsing contractors)
CREATE POLICY "Clients can view all trade profiles"
  ON trade_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'client'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_trade_profiles_zip ON trade_profiles(zip_code);
CREATE INDEX IF NOT EXISTS idx_trade_profiles_rating ON trade_profiles(rating DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trade_profiles_updated_at
  BEFORE UPDATE ON trade_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
