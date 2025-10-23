/*
  # Event Management System Schema

  ## Overview
  Complete schema for managing events, attendees, badge printing, scanning, certificates, and visitor registration.

  ## Tables Created

  1. **events**
     - `id` (uuid, primary key)
     - `name` (text) - Event name
     - `description` (text) - Event description
     - `start_date` (timestamptz) - Event start date
     - `end_date` (timestamptz) - Event end date
     - `location` (text) - Event location
     - `status` (text) - Event status (active, completed, cancelled)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  2. **attendees**
     - `id` (uuid, primary key)
     - `event_id` (uuid, foreign key)
     - `registration_number` (text, unique) - Unique registration ID
     - `name` (text) - Attendee full name
     - `email` (text) - Email address
     - `phone` (text) - Phone number
     - `organization` (text) - Organization/Institution
     - `designation` (text) - Job title/designation
     - `category` (text) - Attendee category (delegate, speaker, vip, etc)
     - `badge_printed` (boolean) - Badge print status
     - `certificate_printed` (boolean) - Certificate print status
     - `checked_in` (boolean) - Check-in status
     - `photo_url` (text) - Profile photo URL
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  3. **scans**
     - `id` (uuid, primary key)
     - `attendee_id` (uuid, foreign key)
     - `event_id` (uuid, foreign key)
     - `scan_type` (text) - Type of scan (entry, exit, session, meal, etc)
     - `scan_location` (text) - Location where scan occurred
     - `scanned_at` (timestamptz) - Timestamp of scan
     - `scanned_by` (uuid) - User who performed the scan

  4. **certificates**
     - `id` (uuid, primary key)
     - `attendee_id` (uuid, foreign key)
     - `event_id` (uuid, foreign key)
     - `certificate_type` (text) - Type of certificate
     - `issued_at` (timestamptz) - When certificate was issued
     - `certificate_url` (text) - URL to certificate file
     - `printed` (boolean) - Print status

  5. **visitors**
     - `id` (uuid, primary key)
     - `event_id` (uuid, foreign key)
     - `name` (text) - Visitor name
     - `organization` (text) - Visitor organization
     - `purpose` (text) - Purpose of visit
     - `host_name` (text) - Host/contact person
     - `entry_time` (timestamptz) - Entry timestamp
     - `exit_time` (timestamptz) - Exit timestamp
     - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Policies for authenticated users to manage data
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create attendees table
CREATE TABLE IF NOT EXISTS attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  registration_number text UNIQUE NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  organization text,
  designation text,
  category text DEFAULT 'delegate',
  badge_printed boolean DEFAULT false,
  certificate_printed boolean DEFAULT false,
  checked_in boolean DEFAULT false,
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create scans table
CREATE TABLE IF NOT EXISTS scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attendee_id uuid REFERENCES attendees(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  scan_type text NOT NULL,
  scan_location text,
  scanned_at timestamptz DEFAULT now(),
  scanned_by uuid REFERENCES auth.users(id)
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attendee_id uuid REFERENCES attendees(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  certificate_type text NOT NULL,
  issued_at timestamptz DEFAULT now(),
  certificate_url text,
  printed boolean DEFAULT false
);

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  organization text,
  purpose text,
  host_name text,
  entry_time timestamptz DEFAULT now(),
  exit_time timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_attendees_event_id ON attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_attendees_registration_number ON attendees(registration_number);
CREATE INDEX IF NOT EXISTS idx_scans_attendee_id ON scans(attendee_id);
CREATE INDEX IF NOT EXISTS idx_scans_event_id ON scans(event_id);
CREATE INDEX IF NOT EXISTS idx_certificates_attendee_id ON certificates(attendee_id);
CREATE INDEX IF NOT EXISTS idx_visitors_event_id ON visitors(event_id);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Authenticated users can view events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for attendees
CREATE POLICY "Authenticated users can view attendees"
  ON attendees FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert attendees"
  ON attendees FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update attendees"
  ON attendees FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete attendees"
  ON attendees FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for scans
CREATE POLICY "Authenticated users can view scans"
  ON scans FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert scans"
  ON scans FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update scans"
  ON scans FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete scans"
  ON scans FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for certificates
CREATE POLICY "Authenticated users can view certificates"
  ON certificates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert certificates"
  ON certificates FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update certificates"
  ON certificates FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete certificates"
  ON certificates FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for visitors
CREATE POLICY "Authenticated users can view visitors"
  ON visitors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert visitors"
  ON visitors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update visitors"
  ON visitors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete visitors"
  ON visitors FOR DELETE
  TO authenticated
  USING (true);