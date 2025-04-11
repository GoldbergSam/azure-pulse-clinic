
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
    // Try to create patients table using SQL
    const { error: patientsError } = await supabase.rpc('create_patients_table', {}, {
      head: true, // Only get the status
      count: 'exact'
    });
    
    // If function doesn't exist, we need to create it first
    if (patientsError && patientsError.message.includes('does not exist')) {
      console.log('RPC function not found. Will attempt to create tables from dashboard.');
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
      
      // Create temporary function to check if table exists
      const tableExists = async (tableName: string) => {
        const { data, error } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public')
          .eq('table_name', tableName);
          
        if (error) {
          console.error(`Error checking if ${tableName} exists:`, error);
          return false;
        }
        
        return data && data.length > 0;
      };
      
      // Check if we have the ability to create tables
      const patientsExists = await tableExists('patients');
      const vitalsExists = await tableExists('vitals_data');
      
      if (!patientsExists || !vitalsExists) {
        console.log('Please use the Supabase dashboard to create the tables with the schema above.');
        console.log('After creating the tables, return to the app and click "Reset Sample Data".');
      }
    }
  } catch (error) {
    console.error('Error checking tables:', error);
  }
};

// Call the function to check tables
createTablesIfNotExist();

export { supabase };
