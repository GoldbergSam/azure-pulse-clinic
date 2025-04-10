
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from the environment
// When connected through the Lovable integration, these values are automatically provided
const supabaseUrl = 'https://your-supabase-project.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
