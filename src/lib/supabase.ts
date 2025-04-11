
import { createClient } from '@supabase/supabase-js';

// Use the provided Supabase credentials
const supabaseUrl = 'https://dszyctwluqbqdfdahxnc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzenljdHdsdXFicWRmZGFoeG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDA3MTQsImV4cCI6MjA1OTkxNjcxNH0.bMcdPbV10crENiuttOCgwboR0EU283qpFFNuWh8wmS0';

console.log('Connecting to Supabase:', supabaseUrl);

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to actually create tables directly - will run SQL commands to create tables
const createTablesIfNotExist = async () => {
  try {
    console.log('Attempting to create tables directly...');
    
    // Create patients table
    const { error: patientsError } = await supabase.rpc('create_patients_table', {});
    if (patientsError) {
      console.error('Error creating patients table:', patientsError);
      
      // Try direct SQL execution as fallback
      const { error: sqlError } = await supabase.rpc('execute_sql', {
        sql_query: `
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
        `
      });
      
      if (sqlError) {
        console.error('Error executing SQL for patients table:', sqlError);
      } else {
        console.log('Created patients table via direct SQL');
      }
    } else {
      console.log('Created patients table successfully');
    }
    
    // Create vitals_data table
    const { error: vitalsError } = await supabase.rpc('create_vitals_table', {});
    if (vitalsError) {
      console.error('Error creating vitals_data table:', vitalsError);
      
      // Try direct SQL execution as fallback
      const { error: sqlError } = await supabase.rpc('execute_sql', {
        sql_query: `
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
        `
      });
      
      if (sqlError) {
        console.error('Error executing SQL for vitals_data table:', sqlError);
      } else {
        console.log('Created vitals_data table via direct SQL');
      }
    } else {
      console.log('Created vitals_data table successfully');
    }
    
    return true;
  } catch (error) {
    console.error('Error in createTablesIfNotExist:', error);
    return false;
  }
};

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

// Initialize the database tables
const initDatabase = async () => {
  try {
    // First, attempt to create tables programmatically
    const tablesCreated = await createTablesIfNotExist();
    
    if (!tablesCreated) {
      logSchemaInformation();
    }
    
    return tablesCreated;
  } catch (error) {
    console.error('Error initializing database:', error);
    logSchemaInformation();
    return false;
  }
};

// Initialize the database
initDatabase();

export { supabase };
