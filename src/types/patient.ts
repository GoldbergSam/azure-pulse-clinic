
export type Priority = 'urgent' | 'high' | 'normal' | 'low';

export interface Vitals {
  bp?: string;
  hr?: number;
  temp?: number;
  spo2?: number;
}

export interface VitalsDataPoint {
  time: string;
  heartRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  temperature?: number;
  spO2?: number;
}

export interface Patient {
  id: number;
  created_at?: string;
  name: string;
  age: number;
  gender: string;
  mrn: string;
  reason: string;
  priority: Priority;
  time: string;
  doctor?: string;
  vitals?: Vitals;
  vitalsData?: VitalsDataPoint[];
}
