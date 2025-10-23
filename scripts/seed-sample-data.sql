-- Sample data for testing the Event Management System
-- Run this in your Supabase SQL editor to populate test data

-- Insert a sample event
INSERT INTO events (name, description, start_date, end_date, location, status)
VALUES (
  'Tech Conference 2025',
  'Annual technology conference with industry leaders',
  '2025-11-01 09:00:00+00',
  '2025-11-03 18:00:00+00',
  'Convention Center, Tech City',
  'active'
)
ON CONFLICT DO NOTHING;

-- Get the event ID (you may need to adjust this based on your actual event ID)
DO $$
DECLARE
  v_event_id uuid;
BEGIN
  SELECT id INTO v_event_id FROM events WHERE name = 'Tech Conference 2025' LIMIT 1;

  -- Insert sample attendees
  INSERT INTO attendees (event_id, registration_number, name, email, phone, organization, designation, category)
  VALUES
    (v_event_id, 'REG2025001', 'John Smith', 'john.smith@example.com', '+1-555-0101', 'Tech Corp', 'CEO', 'vip'),
    (v_event_id, 'REG2025002', 'Sarah Johnson', 'sarah.j@example.com', '+1-555-0102', 'Innovation Labs', 'CTO', 'speaker'),
    (v_event_id, 'REG2025003', 'Michael Chen', 'mchen@example.com', '+1-555-0103', 'StartUp Inc', 'Developer', 'delegate'),
    (v_event_id, 'REG2025004', 'Emily Davis', 'emily.d@example.com', '+1-555-0104', 'Digital Solutions', 'Product Manager', 'delegate'),
    (v_event_id, 'REG2025005', 'Robert Wilson', 'rwilson@example.com', '+1-555-0105', 'Cloud Systems', 'Architect', 'delegate'),
    (v_event_id, 'REG2025006', 'Maria Garcia', 'mgarcia@example.com', '+1-555-0106', 'AI Research', 'Scientist', 'speaker'),
    (v_event_id, 'REG2025007', 'David Brown', 'dbrown@example.com', '+1-555-0107', 'Cyber Security Co', 'Security Lead', 'delegate'),
    (v_event_id, 'REG2025008', 'Lisa Anderson', 'landerson@example.com', '+1-555-0108', 'Data Analytics', 'Analyst', 'delegate'),
    (v_event_id, 'REG2025009', 'James Taylor', 'jtaylor@example.com', '+1-555-0109', 'Mobile Apps', 'Designer', 'delegate'),
    (v_event_id, 'REG2025010', 'Jennifer Martinez', 'jmartinez@example.com', '+1-555-0110', 'Tech Media', 'Journalist', 'media')
  ON CONFLICT (registration_number) DO NOTHING;
END $$;
