
import React, { useState, useEffect } from 'react';
import VitalsChart from './VitalsChart';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Activity } from 'lucide-react';
import { usePatients } from '@/hooks/usePatients';
import { Patient, VitalsDataPoint } from '@/types/patient';
import { Skeleton } from '@/components/ui/skeleton';

interface VitalsViewProps {
  initialPatientId?: number;
  title?: string;
}

const VitalsView = ({ initialPatientId, title = "Patient Vitals" }: VitalsViewProps) => {
  const { patients, isLoading } = usePatients();
  const [selectedPatientId, setSelectedPatientId] = useState<number | undefined>(initialPatientId);
  const [vitalsData, setVitalsData] = useState<VitalsDataPoint[]>([]);
  
  // When patients load, set the first patient as selected if none is already selected
  useEffect(() => {
    if (patients.length > 0 && !selectedPatientId) {
      setSelectedPatientId(patients[0].id);
    }
  }, [patients, selectedPatientId]);
  
  // Get the selected patient
  const selectedPatient = patients.find(p => p.id === selectedPatientId);
  
  // Update vitals data when patient changes
  useEffect(() => {
    if (selectedPatient?.vitalsData) {
      setVitalsData(selectedPatient.vitalsData);
    } else if (selectedPatient) {
      // Generate mock vitals data if none exists for this patient
      const mockData: VitalsDataPoint[] = [];
      const now = new Date();
      
      for (let i = 0; i < 6; i++) {
        const time = new Date(now);
        time.setHours(time.getHours() - (5 - i) * 2);
        
        mockData.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          heartRate: 70 + Math.floor(Math.random() * 15),
          bloodPressureSystolic: 115 + Math.floor(Math.random() * 20),
          bloodPressureDiastolic: 75 + Math.floor(Math.random() * 15),
          temperature: 98.4 + Math.random() * 1.2,
          spO2: 95 + Math.floor(Math.random() * 5),
        });
      }
      
      setVitalsData(mockData);
    } else {
      setVitalsData([]);
    }
  }, [selectedPatient]);
  
  const handlePatientChange = (patientId: number) => {
    setSelectedPatientId(patientId);
  };
  
  const patientOptions = patients.map(patient => ({
    id: patient.id,
    name: patient.name
  }));
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-[240px] w-full" />
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <VitalsChart 
        title={title}
        subtitle={selectedPatient ? `Patient: ${selectedPatient.name}` : "Select a patient"}
        data={vitalsData}
        patientId={selectedPatientId}
        onPatientChange={handlePatientChange}
        patients={patientOptions}
        className="lg:col-span-2"
      />
      
      {selectedPatient && (
        <Card>
          <CardContent className="pt-4 space-y-4">
            <h3 className="font-medium mb-2">IoT Device Readings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 bg-background p-3 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Heart Rate</span>
                  <Heart size={16} className="text-emr-accent" />
                </div>
                <span className="text-2xl font-bold">
                  {selectedPatient.vitals?.hr || '72'} BPM
                </span>
                <span className="text-xs text-muted-foreground">Updated 2 mins ago</span>
              </div>
              <div className="flex flex-col gap-1 bg-background p-3 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Blood Pressure</span>
                  <Activity size={16} className="text-emr-warning" />
                </div>
                <span className="text-2xl font-bold">
                  {selectedPatient.vitals?.bp || '120/80'}
                </span>
                <span className="text-xs text-muted-foreground">Updated 5 mins ago</span>
              </div>
              <div className="flex flex-col gap-1 bg-background p-3 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Temperature</span>
                  <Activity size={16} className="text-emr-success" />
                </div>
                <span className="text-2xl font-bold">
                  {selectedPatient.vitals?.temp || '98.6'}°F
                </span>
                <span className="text-xs text-muted-foreground">Updated 15 mins ago</span>
              </div>
              <div className="flex flex-col gap-1 bg-background p-3 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">SpO2</span>
                  <Activity size={16} className="text-emr-urgent" />
                </div>
                <span className="text-2xl font-bold">
                  {selectedPatient.vitals?.spo2 || '98'}%
                </span>
                <span className="text-xs text-muted-foreground">Updated 10 mins ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VitalsView;
