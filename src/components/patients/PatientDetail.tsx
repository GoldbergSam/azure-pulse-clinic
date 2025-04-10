
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, FileText, Heart, User, Calendar } from 'lucide-react';
import VitalsChart from '@/components/dashboard/VitalsChart';

export interface PatientDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: {
    name: string;
    age: number;
    gender: string;
    mrn: string;
    reason: string;
    priority: 'urgent' | 'high' | 'normal' | 'low';
    time: string;
    doctor?: string;
    vitals?: {
      bp?: string;
      hr?: number;
      temp?: number;
      spo2?: number;
    };
  };
  vitalsData?: {
    time: string;
    heartRate?: number;
    bloodPressureSystolic?: number;
    bloodPressureDiastolic?: number;
    temperature?: number;
    spO2?: number;
  }[];
}

const PatientDetail = ({ open, onOpenChange, patient, vitalsData }: PatientDetailProps) => {
  // If no vitals data is provided, use default data
  const patientVitalsData = vitalsData || [
    { time: '08:00', heartRate: 72, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, temperature: 98.6, spO2: 98 },
    { time: '10:00', heartRate: 75, bloodPressureSystolic: 122, bloodPressureDiastolic: 82, temperature: 98.7, spO2: 97 },
    { time: '12:00', heartRate: 78, bloodPressureSystolic: 125, bloodPressureDiastolic: 85, temperature: 99.1, spO2: 96 },
    { time: '14:00', heartRate: 80, bloodPressureSystolic: 130, bloodPressureDiastolic: 88, temperature: 99.5, spO2: 95 },
    { time: '16:00', heartRate: 76, bloodPressureSystolic: 128, bloodPressureDiastolic: 84, temperature: 99.0, spO2: 97 },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{patient.name}</DialogTitle>
          <DialogDescription>
            {patient.age} yrs • {patient.gender} • MRN: {patient.mrn}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <User size={16} />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="vitals" className="flex items-center gap-1">
              <Activity size={16} />
              <span>Vitals</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <FileText size={16} />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Appointments</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">Patient Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span className="font-medium">{patient.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="font-medium">{patient.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MRN:</span>
                      <span className="font-medium">{patient.mrn}</span>
                    </div>
                    {patient.doctor && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Doctor:</span>
                        <span className="font-medium">Dr. {patient.doctor}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">Current Visit</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reason:</span>
                      <span className="font-medium">{patient.reason}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Priority:</span>
                      <span className="font-medium capitalize">{patient.priority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in:</span>
                      <span className="font-medium">{patient.time}</span>
                    </div>
                    {patient.vitals && (
                      <>
                        <div className="border-t my-2"></div>
                        <h4 className="font-medium text-xs text-muted-foreground">Latest Vitals</h4>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {patient.vitals.bp && (
                            <div className="bg-background rounded p-1 text-center">
                              <p className="text-xs text-muted-foreground">BP</p>
                              <p className="text-sm font-medium">{patient.vitals.bp}</p>
                            </div>
                          )}
                          {patient.vitals.hr && (
                            <div className="bg-background rounded p-1 text-center">
                              <p className="text-xs text-muted-foreground">HR</p>
                              <p className="text-sm font-medium">{patient.vitals.hr}</p>
                            </div>
                          )}
                          {patient.vitals.temp && (
                            <div className="bg-background rounded p-1 text-center">
                              <p className="text-xs text-muted-foreground">Temp</p>
                              <p className="text-sm font-medium">{patient.vitals.temp}°F</p>
                            </div>
                          )}
                          {patient.vitals.spo2 && (
                            <div className="bg-background rounded p-1 text-center">
                              <p className="text-xs text-muted-foreground">SpO2</p>
                              <p className="text-sm font-medium">{patient.vitals.spo2}%</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="pt-4">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-sm text-muted-foreground">No notes available for this visit yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4">
            <VitalsChart 
              title={`Patient: ${patient.name} - Vital Signs`}
              data={patientVitalsData}
            />
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="gap-2">
                <Heart size={16} />
                Request Vitals Update
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardContent className="pt-4">
                <h3 className="font-medium mb-2">Medical History</h3>
                <p className="text-sm text-muted-foreground">Patient history data will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardContent className="pt-4">
                <h3 className="font-medium mb-2">Upcoming Appointments</h3>
                <p className="text-sm text-muted-foreground">No upcoming appointments scheduled.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <h3 className="font-medium mb-2">Past Appointments</h3>
                <p className="text-sm text-muted-foreground">Previous appointment history will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetail;
