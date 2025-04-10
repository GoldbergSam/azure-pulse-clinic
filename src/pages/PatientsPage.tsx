
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter } from 'lucide-react';
import PatientCard from '@/components/dashboard/PatientCard';

// Mock data for patients
const mockPatientsData = [
  {
    id: 1,
    name: "James Wilson",
    age: 45,
    gender: "Male",
    mrn: "MRN123456",
    reason: "Chest pain",
    priority: "urgent" as const,
    time: "08:30 AM",
    doctor: "Carter",
    vitals: {
      bp: "150/95",
      hr: 95,
      temp: 99.1,
      spo2: 94
    },
    vitalsData: [
      { time: '08:30', heartRate: 95, bloodPressureSystolic: 150, bloodPressureDiastolic: 95, temperature: 99.1, spO2: 94 },
      { time: '09:30', heartRate: 92, bloodPressureSystolic: 145, bloodPressureDiastolic: 92, temperature: 99.0, spO2: 95 },
      { time: '10:30', heartRate: 90, bloodPressureSystolic: 140, bloodPressureDiastolic: 90, temperature: 98.8, spO2: 96 },
      { time: '11:30', heartRate: 88, bloodPressureSystolic: 138, bloodPressureDiastolic: 88, temperature: 98.6, spO2: 97 },
    ]
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    age: 32,
    gender: "Female",
    mrn: "MRN789012",
    reason: "Migraine",
    priority: "high" as const,
    time: "09:15 AM",
    doctor: "Davis",
    vitals: {
      bp: "125/82",
      hr: 78,
      temp: 98.6,
      spo2: 98
    },
    vitalsData: [
      { time: '09:15', heartRate: 78, bloodPressureSystolic: 125, bloodPressureDiastolic: 82, temperature: 98.6, spO2: 98 },
      { time: '10:15', heartRate: 76, bloodPressureSystolic: 124, bloodPressureDiastolic: 80, temperature: 98.5, spO2: 98 },
      { time: '11:15', heartRate: 75, bloodPressureSystolic: 123, bloodPressureDiastolic: 79, temperature: 98.5, spO2: 99 },
    ]
  },
  {
    id: 3,
    name: "Robert Kim",
    age: 65,
    gender: "Male",
    mrn: "MRN345678",
    reason: "Follow-up",
    priority: "normal" as const,
    time: "09:45 AM",
    doctor: "Jones",
    vitals: {
      bp: "140/85",
      hr: 72,
      temp: 98.2,
      spo2: 97
    },
    vitalsData: [
      { time: '09:45', heartRate: 72, bloodPressureSystolic: 140, bloodPressureDiastolic: 85, temperature: 98.2, spO2: 97 },
      { time: '10:45', heartRate: 70, bloodPressureSystolic: 138, bloodPressureDiastolic: 83, temperature: 98.0, spO2: 97 },
      { time: '11:45', heartRate: 71, bloodPressureSystolic: 139, bloodPressureDiastolic: 84, temperature: 98.1, spO2: 98 },
    ]
  },
  {
    id: 4,
    name: "Maria Garcia",
    age: 28,
    gender: "Female",
    mrn: "MRN901234",
    reason: "Pregnancy check",
    priority: "normal" as const,
    time: "10:30 AM",
    doctor: "Smith",
    vitals: {
      bp: "118/75",
      hr: 80,
      temp: 98.4,
      spo2: 99
    },
    vitalsData: [
      { time: '10:30', heartRate: 80, bloodPressureSystolic: 118, bloodPressureDiastolic: 75, temperature: 98.4, spO2: 99 },
      { time: '11:30', heartRate: 82, bloodPressureSystolic: 120, bloodPressureDiastolic: 78, temperature: 98.6, spO2: 99 },
      { time: '12:30', heartRate: 81, bloodPressureSystolic: 119, bloodPressureDiastolic: 76, temperature: 98.5, spO2: 99 },
    ]
  },
  {
    id: 5,
    name: "George Brown",
    age: 72,
    gender: "Male",
    mrn: "MRN567890",
    reason: "Diabetes check",
    priority: "low" as const,
    time: "11:00 AM",
    doctor: "Wilson",
    vitals: {
      bp: "135/82",
      hr: 68,
      temp: 97.9,
      spo2: 96
    },
    vitalsData: [
      { time: '11:00', heartRate: 68, bloodPressureSystolic: 135, bloodPressureDiastolic: 82, temperature: 97.9, spO2: 96 },
      { time: '12:00', heartRate: 67, bloodPressureSystolic: 134, bloodPressureDiastolic: 80, temperature: 97.8, spO2: 96 },
      { time: '13:00', heartRate: 69, bloodPressureSystolic: 136, bloodPressureDiastolic: 83, temperature: 98.0, spO2: 97 },
    ]
  },
];

const PatientsPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = mockPatientsData.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Patients</h1>
            <p className="text-muted-foreground">Manage your patient records</p>
          </div>
          <Button className="gap-2">
            <Plus size={16} />
            Add Patient
          </Button>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search patients by name or MRN..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter size={14} />
                Filters
              </Button>
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  List
                </Button>
                <Button 
                  variant={viewMode === 'card' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('card')}
                  className="rounded-none"
                >
                  Cards
                </Button>
              </div>
            </div>
          </div>
          
          {viewMode === 'list' ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>MRN</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Vitals</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.age} yrs • {patient.gender}</p>
                        </div>
                      </TableCell>
                      <TableCell>{patient.mrn}</TableCell>
                      <TableCell>{patient.reason}</TableCell>
                      <TableCell>
                        <div className={`badge-priority inline-block priority-${patient.priority}`}>
                          {patient.priority.charAt(0).toUpperCase() + patient.priority.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>{patient.time}</TableCell>
                      <TableCell>Dr. {patient.doctor}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <span className="text-xs">{patient.vitals.bp}</span>
                          <span className="text-xs">{patient.vitals.hr} BPM</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  name={patient.name}
                  age={patient.age}
                  gender={patient.gender}
                  mrn={patient.mrn}
                  reason={patient.reason}
                  priority={patient.priority}
                  time={patient.time}
                  doctor={patient.doctor}
                  vitals={patient.vitals}
                  vitalsData={patient.vitalsData}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientsPage;
