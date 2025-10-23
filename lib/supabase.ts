import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          start_date: string;
          end_date: string;
          location: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      attendees: {
        Row: {
          id: string;
          event_id: string;
          registration_number: string;
          name: string;
          email: string | null;
          phone: string | null;
          organization: string | null;
          designation: string | null;
          category: string;
          badge_printed: boolean;
          certificate_printed: boolean;
          checked_in: boolean;
          photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['attendees']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['attendees']['Insert']>;
      };
      scans: {
        Row: {
          id: string;
          attendee_id: string;
          event_id: string;
          scan_type: string;
          scan_location: string | null;
          scanned_at: string;
          scanned_by: string | null;
        };
        Insert: Omit<Database['public']['Tables']['scans']['Row'], 'id' | 'scanned_at'>;
        Update: Partial<Database['public']['Tables']['scans']['Insert']>;
      };
    };
  };
};
