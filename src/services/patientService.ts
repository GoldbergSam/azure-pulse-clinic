import { supabase } from '@/lib/supabase';
import { Patient, Vitals, VitalsDataPoint } from '@/types/patient';

export const fetchPatients = async (): Promise<Patient[]> => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
  
  return data || [];
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
  
  return data || [];
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
  const generateVitalsData = (patientId: number): any[] => {
    const vitalsData = [];
    const now = new Date();
    
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
    
    return vitalsData;
  };

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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Kim',
      vitals: {
        bp: '125/80',
        hr: 68,
        temp: 98.4,
        spo2: 99
      }
    },
    {
      name: 'Maria Garcia',
      age: 55,
      gender: 'Female',
      mrn: 'MRN10047',
      reason: 'Diabetic check',
      priority: 'low',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Johnson',
      vitals: {
        bp: '138/85',
        hr: 75,
        temp: 98.2,
        spo2: 97
      }
    },
    {
      name: 'James Smith',
      age: 28,
      gender: 'Male',
      mrn: 'MRN10048',
      reason: 'Sprained ankle',
      priority: 'normal',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Davis',
      vitals: {
        bp: '120/78',
        hr: 74,
        temp: 98.6,
        spo2: 98
      }
    },
    {
      name: 'Ava Thomas',
      age: 4,
      gender: 'Female',
      mrn: 'MRN10049',
      reason: 'Ear infection',
      priority: 'high',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Wilson',
      vitals: {
        bp: '90/55',
        hr: 115,
        temp: 100.2,
        spo2: 97
      }
    },
    {
      name: 'William Baker',
      age: 62,
      gender: 'Male',
      mrn: 'MRN10050',
      reason: 'Medication review',
      priority: 'low',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Brown',
      vitals: {
        bp: '135/82',
        hr: 70,
        temp: 98.0,
        spo2: 96
      }
    },
    {
      name: 'Sophia Lee',
      age: 31,
      gender: 'Female',
      mrn: 'MRN10051',
      reason: 'Pregnancy check',
      priority: 'normal',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: 'Martinez',
      vitals: {
        bp: '118/75',
        hr: 80,
        temp: 98.8,
        spo2: 99
      }
    }
  ];

  try {
    const { count } = await supabase
      .from('patients')
      .select('*', { count: 'exact', head: true });
    
    if (count && count > 0) {
      console.log('Database already has patients, skipping seed.');
      return;
    }

    for (const patient of patients) {
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
        const vitalsData = generateVitalsData(patientId);

        const { error: vitalsError } = await supabase
          .from('vitals_data')
          .insert(vitalsData);

        if (vitalsError) {
          console.error(`Error adding vitals data for patient ${patientId}:`, vitalsError);
        }
      }
    }

    console.log('Sample patient data has been seeded successfully!');
  } catch (error) {
    console.error('Error seeding patient data:', error);
    throw error;
  }
};
