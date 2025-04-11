
import { createClient } from '@supabase/supabase-js';

// Use the provided Supabase credentials
const supabaseUrl = 'https://dszyctwluqbqdfdahxnc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzenljdHdsdXFicWRmZGFoeG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDA3MTQsImV4cCI6MjA1OTkxNjcxNH0.bMcdPbV10crENiuttOCgwboR0EU283qpFFNuWh8wmS0';

console.log('Connecting to Supabase:', supabaseUrl);

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create tables if they don't exist
const createTablesIfNotExist = async () => {
  try {
    // Check if tables exist first
    const { data: patientTableExists } = await supabase
      .from('patients')
      .select('id')
      .limit(1);
    
    const { data: vitalsTableExists } = await supabase
      .from('vitals_data')
      .select('id')
      .limit(1);

    // For more complex operations like creating tables, we would typically use
    // Supabase migrations or the dashboard directly, as the JS client doesn't support
    // DDL operations.
    
    if (patientTableExists === null) {
      console.log('Tables need to be created manually in Supabase dashboard.');
      console.log('Schema for patients table:');
      console.log(`
        - id: int8 (primary key, auto increment)
        - created_at: timestamp with time zone (default: now())
        - name: text
        - age: int4
        - gender: text
        - mrn: text
        - reason: text
        - priority: text
        - time: text
        - doctor: text
        - vitals: jsonb (for bp, hr, temp, spo2)
      `);
      
      console.log('Schema for vitals_data table:');
      console.log(`
        - id: int8 (primary key, auto increment)
        - patient_id: int8 (foreign key to patients.id)
        - time: timestamp with time zone
        - heart_rate: int4
        - blood_pressure_systolic: int4
        - blood_pressure_diastolic: int4
        - temperature: float8
        - spo2: int4
      `);
    }
  } catch (error) {
    console.error('Error checking tables:', error);
  }
};

// Call the function to check tables
createTablesIfNotExist();

export { supabase };
