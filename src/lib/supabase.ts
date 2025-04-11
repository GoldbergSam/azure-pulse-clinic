
import { createClient } from '@supabase/supabase-js';

// Use the provided Supabase credentials
const supabaseUrl = 'https://dszyctwluqbqdfdahxnc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzenljdHdsdXFicWRmZGFoeG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDA3MTQsImV4cCI6MjA1OTkxNjcxNH0.bMcdPbV10crENiuttOCgwboR0EU283qpFFNuWh8wmS0';

console.log('Connecting to Supabase:', supabaseUrl);

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to log schema information for manual table setup
const logSchemaInformation = () => {
  console.log('Tables need to be created manually in Supabase dashboard.');
  console.log('Schema for patients table:');
  console.log(`
    CREATE TABLE IF NOT EXISTS patients (
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
    CREATE TABLE IF NOT EXISTS vitals_data (
      id BIGSERIAL PRIMARY KEY,
      patient_id BIGINT REFERENCES patients(id),
      time TIMESTAMP WITH TIME ZONE,
      heart_rate INTEGER,
      blood_pressure_systolic INTEGER,
      blood_pressure_diastolic INTEGER,
      temperature FLOAT,
      spo2 INTEGER
    );
  `);
  
  console.log('After creating the tables, return to the app and click "Reset Sample Data".');
};

// Check if tables exist and log creation instructions if needed
const checkTablesExist = async () => {
  try {
    // Check if patients table exists
    const { data: patientsTable, error: patientsError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'patients')
      .single();
    
    // Check if vitals_data table exists
    const { data: vitalsTable, error: vitalsError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'vitals_data')
      .single();
    
    // If either table doesn't exist, log setup instructions
    if (patientsError || vitalsError || !patientsTable || !vitalsTable) {
      logSchemaInformation();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking if tables exist:', error);
    logSchemaInformation();
    return false;
  }
};

// Initialize by checking if tables exist
checkTablesExist();

export { supabase };
