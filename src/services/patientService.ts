
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
