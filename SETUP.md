# Event Management System - Setup Guide

This is a comprehensive event management system built with Next.js and Supabase, featuring badge printing, scanning, certificate management, and visitor registration.

## Features

- **Authentication System** - Secure login with Supabase Auth
- **Badge Printing** - Search and print attendee badges
- **Scanning Systems**:
  - Single Entry Scan (check-in once)
  - Multi Entry Scan (multiple entries allowed)
  - Attendance Scanning (session tracking)
  - Web-based QR Scanning
- **Certificate Management** - Print and track certificates
- **Visitor Registration** - Track visitor entry/exit
- **Manual Search** - Advanced attendee search
- **Self-Service** - Badge and certificate self-printing
- **Registration Management** - Add new attendees

## Getting Started

### 1. Environment Setup

Your `.env` file should already contain:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

The database schema has been automatically applied. The following tables are created:
- `events` - Event information
- `attendees` - Attendee registrations
- `scans` - Scan records (entry, attendance, etc.)
- `certificates` - Certificate records
- `visitors` - Visitor registration

### 3. Create Test User

In your Supabase dashboard, go to Authentication > Users and create a test user:
- Email: `admin@test.com`
- Password: `password123`

### 4. Add Sample Data (Optional)

Run the SQL script in `scripts/seed-sample-data.sql` in your Supabase SQL Editor to add sample attendees for testing.

### 5. Run the Application

```bash
npm run dev
```

Navigate to `http://localhost:3000`

## System Modules

### 1. Login
- Access: `/login`
- Default credentials: Use the user you created in Supabase Auth

### 2. Dashboard
- Access: `/dashboard`
- Central hub with navigation to all modules

### 3. Badge Printing - Search
- Access: `/badge-printing/search`
- Search attendees by registration number, name, or email
- Print badges and track printing status

### 4. Scanning Modules

**Single Entry Scan** (`/scan/single-entry`)
- One-time check-in for attendees
- Prevents duplicate check-ins
- Shows recent scan history

**Multi Entry Scan** (`/scan/multi-entry`)
- Allows multiple entry scans
- Useful for multi-day events
- Tracks all entry times

**Attendance Scanning** (`/attendance-scanning`)
- Track session attendance
- Record attendance for specific sessions
- View recent attendance records

### 5. Certificate Printing
- Access: `/certificate/search`
- Search and print certificates
- Automatically creates certificate records

### 6. Visitor Registration
- Access: `/visitor-registration`
- Register walk-in visitors
- Track entry and exit times
- Record purpose and host information

### 7. Self-Service Modules

**Self Badge Printing** (`/self-badge-printing`)
- Attendees can print their own badges
- Requires registration number

**Self Certificate Printing** (`/self-certificate-printing`)
- Attendees can print their own certificates
- Requires registration number

### 8. Manual Search
- Access: `/manual-search`
- Comprehensive search across all attendee fields
- View complete attendee profiles
- See status (checked in, badge printed, certificate printed)

### 9. Add Registration
- Access: `/add-registration`
- Add new attendee registrations
- Required fields: Registration number, name, email
- Optional: Phone, organization, designation, category

## Color Scheme

The system uses **#132D7D** as the primary color (deep blue), providing a professional and corporate appearance.

## Database Schema

### Events Table
- Stores event information
- Tracks event status (active, completed, cancelled)

### Attendees Table
- Complete attendee information
- Registration numbers (unique identifier)
- Status flags for badges, certificates, check-in

### Scans Table
- Records all scanning activities
- Types: single_entry, multi_entry, attendance
- Includes timestamp and scanner information

### Certificates Table
- Certificate issuance records
- Links to attendees and events
- Tracks printing status

### Visitors Table
- Non-registered visitor tracking
- Entry and exit times
- Purpose and host information

## Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for all operations
- User-based access control
- Secure session management

## Tips for Testing

1. **Create Sample Event**: Use the add-registration page to add attendees
2. **Test Scanning**: Use registration numbers like REG2025001-REG2025010 (if you ran the seed script)
3. **Badge Printing**: Search for attendees and mark badges as printed
4. **Check-in Flow**: Use single-entry scan to check attendees in
5. **Visitor Flow**: Register visitors and test check-out functionality

## Support

For issues or questions, refer to:
- Next.js documentation: https://nextjs.org/docs
- Supabase documentation: https://supabase.com/docs
- shadcn/ui components: https://ui.shadcn.com/
