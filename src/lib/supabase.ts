
import { createClient } from '@supabase/supabase-js';

// Use the provided Supabase credentials
const supabaseUrl = 'https://dszyctwluqbqdfdahxnc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzenljdHdsdXFicWRmZGFoeG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDA3MTQsImV4cCI6MjA1OTkxNjcxNH0.bMcdPbV10crENiuttOCgwboR0EU283qpFFNuWh8wmS0';

console.log('Connecting to Supabase:', supabaseUrl);

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to log schema information for manual table setup
const logSchemaInformation = () => {
  console.log('=====================================================');
  console.log('IMPORTANT: Tables need to be created manually in Supabase dashboard.');
  console.log('Steps:');
  console.log('1. Go to your Supabase dashboard');
  console.log('2. Navigate to "Table Editor"');
  console.log('3. Create these two tables (as PUBLIC tables):');
  console.log('=====================================================');
  
  console.log('Schema for patients table:');
  console.log(`
    CREATE TABLE public.patients (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      mrn TEXT,
      reason TEXT,
      priority TEXT,
      time TEXT,
      doctor TEXT,
      vitals JSONB
    );
  `);
  
  console.log('Schema for vitals_data table:');
  console.log(`
    CREATE TABLE public.vitals_data (
      id BIGSERIAL PRIMARY KEY,
      patient_id BIGINT REFERENCES public.patients(id),
      time TIMESTAMP WITH TIME ZONE,
      heart_rate INTEGER,
      blood_pressure_systolic INTEGER,
      blood_pressure_diastolic INTEGER,
      temperature FLOAT,
      spo2 INTEGER
    );
  `);
  
  console.log('=====================================================');
  console.log('4. Set up Row Level Security (RLS) policies:');
  console.log('   - In "Authentication > Policies", enable RLS for each table');
  console.log('   - Add policies to allow SELECT, INSERT, UPDATE, DELETE operations');
  console.log('5. After creating the tables, return to the app and click "Reset Sample Data".');
  console.log('=====================================================');
};

// Output the schema information for reference
logSchemaInformation();

export { supabase };
