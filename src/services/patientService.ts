import { supabase } from '@/lib/supabase';
import { Patient, Vitals, VitalsDataPoint } from '@/types/patient';

export const fetchPatients = async (): Promise<Patient[]> => {
  try {
    // Try to create the patients table if it doesn't exist first
    try {
      await supabase.rpc('execute_sql', {
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
    } catch (err) {
      console.log('Auto-create table attempt:', err);
    }
    
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchPatients:', error);
    throw error;
  }
};

export const fetchPatientById = async (id: number): Promise<Patient | null> => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching patient with id ${id}:`, error);
    throw error;
  }
  
  return data;
};

export const fetchVitalsData = async (patientId: number): Promise<VitalsDataPoint[]> => {
  const { data, error } = await supabase
    .from('vitals_data')
    .select('*')
    .eq('patient_id', patientId)
    .order('time', { ascending: true });

  if (error) {
    console.error(`Error fetching vitals data for patient ${patientId}:`, error);
    throw error;
  }
  
  // Transform the raw data to match the expected format
  return (data || []).map(raw => ({
    time: new Date(raw.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    heartRate: raw.heart_rate,
    bloodPressureSystolic: raw.blood_pressure_systolic,
    bloodPressureDiastolic: raw.blood_pressure_diastolic,
    temperature: raw.temperature,
    spO2: raw.spo2
  }));
};

export const addPatient = async (patient: Omit<Patient, 'id' | 'created_at'>): Promise<Patient> => {
  const { data, error } = await supabase
    .from('patients')
    .insert([patient])
    .select();

  if (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
  
  return data[0];
};

export const updatePatient = async (id: number, updates: Partial<Patient>): Promise<Patient> => {
  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error(`Error updating patient with id ${id}:`, error);
    throw error;
  }
  
  return data[0];
};

export const seedPatientData = async (): Promise<void> => {
  try {
    console.log('Starting to seed patient data...');
    
    // First, ensure tables exist
    try {
      await supabase.rpc('execute_sql', {
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
      console.log('Tables created/verified successfully');
    } catch (tableError) {
      console.log('Error in table creation, continuing anyway:', tableError);
    }
    
    // Then, clear existing data - use more robust approach
    await clearExistingData();
    
    // Then, add sample patients
    await addSamplePatients();
    
    console.log('Sample patient data has been seeded successfully!');
  } catch (error) {
    console.error('Error seeding patient data:', error);
    throw error;
  }
};

// Helper function to clear existing data with better error handling
const clearExistingData = async () => {
  try {
    console.log('Clearing existing data...');
    
    // Try to delete vitals_data records first (due to foreign key constraints)
    try {
      const { error: vitalsError } = await supabase
        .from('vitals_data')
        .delete()
        .neq('id', 0); // Delete all records
      
      if (vitalsError) {
        console.error('Error clearing vitals data:', vitalsError);
      } else {
        console.log('Cleared vitals_data table');
      }
    } catch (e) {
      console.log('Error clearing vitals_data, might not exist yet:', e);
    }
    
    // Then try to delete patients
    try {
      const { error: patientsError } = await supabase
        .from('patients')
        .delete()
        .neq('id', 0); // Delete all records
      
      if (patientsError) {
        console.error('Error clearing patients data:', patientsError);
      } else {
        console.log('Cleared patients table');
      }
    } catch (e) {
      console.log('Error clearing patients, might not exist yet:', e);
    }
    
  } catch (error) {
    console.error('Error in clearExistingData:', error);
    // Continue execution - don't throw here
  }
};

// Helper function to add sample patients and their vitals data
const addSamplePatients = async () => {
  const patients = [
    {
      name: 'Sarah Johnson',
      age: 42,
      gender: 'Female',
      mrn: 'MRN10042',
      reason: 'Persistent headaches',
      priority: 'high',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Williams',
      vitals: {
        bp: '128/85',
        hr: 72,
        temp: 98.6,
        spo2: 97
      }
    },
    {
      name: 'Michael Chen',
      age: 65,
      gender: 'Male',
      mrn: 'MRN10043',
      reason: 'Chest pain',
      priority: 'urgent',
      time: new Date(Date.now() - 15 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Garcia',
      vitals: {
        bp: '145/92',
        hr: 88,
        temp: 99.1,
        spo2: 94
      }
    },
    {
      name: 'Emma Rodriguez',
      age: 8,
      gender: 'Female',
      mrn: 'MRN10044',
      reason: 'Fever and rash',
      priority: 'normal',
      time: new Date(Date.now() - 45 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Thompson',
      vitals: {
        bp: '95/60',
        hr: 110,
        temp: 101.3,
        spo2: 98
      }
    },
    {
      name: 'Robert Wilson',
      age: 78,
      gender: 'Male',
      mrn: 'MRN10045',
      reason: 'Difficulty breathing',
      priority: 'high',
      time: new Date(Date.now() - 120 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Patel',
      vitals: {
        bp: '152/88',
        hr: 92,
        temp: 98.9,
        spo2: 91
      }
    },
    {
      name: 'David Nguyen',
      age: 35,
      gender: 'Male',
      mrn: 'MRN10046',
      reason: 'Back pain',
      priority: 'normal',
      time: new Date(Date.now() - 180 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Kim',
      vitals: {
        bp: '125/80',
        hr: 68,
        temp: 98.4,
        spo2: 99
      }
    }
  ];

  for (const patient of patients) {
    try {
      // Insert patient
      const { data, error } = await supabase
        .from('patients')
        .insert([patient])
        .select();

      if (error) {
        console.error('Error adding sample patient:', error);
        continue;
      }

      if (data && data[0]) {
        const patientId = data[0].id;
        
        // Generate vitals data for this patient
        await addVitalsDataForPatient(patientId);
      }
    } catch (error) {
      console.error('Error adding a patient:', error);
    }
  }
};

// Helper function to add vitals data for a patient
const addVitalsDataForPatient = async (patientId: number) => {
  const vitalsData = [];
  const now = new Date();
  
  // Create 6 vitals readings over the past 12 hours
  for (let i = 0; i < 6; i++) {
    const time = new Date(now);
    time.setHours(time.getHours() - (5 - i) * 2);
    
    vitalsData.push({
      patient_id: patientId,
      time: time.toISOString(),
      heart_rate: 70 + Math.floor(Math.random() * 15),
      blood_pressure_systolic: 115 + Math.floor(Math.random() * 20),
      blood_pressure_diastolic: 75 + Math.floor(Math.random() * 15),
      temperature: 98.4 + Math.random() * 1.2,
      spo2: 95 + Math.floor(Math.random() * 5),
    });
  }
  
  // Insert all vitals data for this patient
  const { error } = await supabase
    .from('vitals_data')
    .insert(vitalsData);

  if (error) {
    console.error(`Error adding vitals data for patient ${patientId}:`, error);
  }
};
