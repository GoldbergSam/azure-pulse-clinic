
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Users, Clock, Activity, Heartbeat, Bell, CheckSquare, Smartphone } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import PatientCard from '@/components/dashboard/PatientCard';
import TriageAlert from '@/components/dashboard/TriageAlert';
import NotificationItem from '@/components/dashboard/NotificationItem';
import VitalsChart from '@/components/dashboard/VitalsChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data
const mockVitalsData = [
  { time: '08:00', heartRate: 72, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, temperature: 98.6, spO2: 98 },
  { time: '10:00', heartRate: 75, bloodPressureSystolic: 122, bloodPressureDiastolic: 82, temperature: 98.7, spO2: 97 },
  { time: '12:00', heartRate: 78, bloodPressureSystolic: 125, bloodPressureDiastolic: 85, temperature: 99.1, spO2: 96 },
  { time: '14:00', heartRate: 80, bloodPressureSystolic: 130, bloodPressureDiastolic: 88, temperature: 99.5, spO2: 95 },
  { time: '16:00', heartRate: 76, bloodPressureSystolic: 128, bloodPressureDiastolic: 84, temperature: 99.0, spO2: 97 },
  { time: '18:00', heartRate: 74, bloodPressureSystolic: 124, bloodPressureDiastolic: 82, temperature: 98.8, spO2: 98 },
];

const Dashboard = () => {
  const [triageAlerts, setTriageAlerts] = useState([
    { id: 1, patient: 'Sarah Johnson, 68', alert: 'Critical vital signs detected. BP 180/95, HR 120.', time: '10 mins ago', severity: 'urgent' as const },
    { id: 2, patient: 'Michael Chen, 45', alert: 'Elevated temperature of 101.3°F detected.', time: '25 mins ago', severity: 'warning' as const },
  ]);

  const removeAlert = (id: number) => {
    setTriageAlerts(triageAlerts.filter(alert => alert.id !== id));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. John Doe</p>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Patients"
            value="127"
            icon={<Users size={18} />}
            change="+4% from last week"
            trend="up"
          />
          <StatCard
            title="Today's Appointments"
            value="24"
            icon={<Clock size={18} />}
            change="8 remaining"
            trend="neutral"
          />
          <StatCard
            title="Active Triage Alerts"
            value={triageAlerts.length}
            icon={<Stethoscope size={18} />}
            change="2 urgent"
            trend="down"
          />
          <StatCard
            title="IoT Notifications"
            value="5"
            icon={<Smartphone size={18} />}
            change="+2 new"
            trend="up"
          />
        </div>
        
        {/* Triage Alerts */}
        {triageAlerts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <AlertCircle size={18} className="text-emr-urgent" />
              Triage AI Alerts
            </h2>
            <div className="space-y-3">
              {triageAlerts.map((alert) => (
                <TriageAlert
                  key={alert.id}
                  patient={alert.patient}
                  alert={alert.alert}
                  time={alert.time}
                  severity={alert.severity}
                  onClose={() => removeAlert(alert.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <Tabs defaultValue="patients">
          <TabsList className="mb-4">
            <TabsTrigger value="patients" className="flex items-center gap-1">
              <Users size={16} />
              <span>Patients</span>
            </TabsTrigger>
            <TabsTrigger value="vitals" className="flex items-center gap-1">
              <Activity size={16} />
              <span>Vitals</span>
            </TabsTrigger>
            <TabsTrigger value="followups" className="flex items-center gap-1">
              <CheckSquare size={16} />
              <span>Follow-ups</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell size={16} />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="patients" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <PatientCard
                name="James Wilson"
                age={45}
                gender="Male"
                mrn="MRN123456"
                reason="Chest pain"
                priority="urgent"
                time="08:30 AM"
                doctor="Carter"
                vitals={{
                  bp: "150/95",
                  hr: 95,
                  temp: 99.1,
                  spo2: 94
                }}
              />
              <PatientCard
                name="Emily Rodriguez"
                age={32}
                gender="Female"
                mrn="MRN789012"
                reason="Migraine"
                priority="high"
                time="09:15 AM"
                doctor="Davis"
                vitals={{
                  bp: "125/82",
                  hr: 78,
                  temp: 98.6,
                  spo2: 98
                }}
              />
              <PatientCard
                name="Robert Kim"
                age={65}
                gender="Male"
                mrn="MRN345678"
                reason="Follow-up"
                priority="normal"
                time="09:45 AM"
                doctor="Jones"
                vitals={{
                  bp: "140/85",
                  hr: 72,
                  temp: 98.2,
                  spo2: 97
                }}
              />
              <PatientCard
                name="Maria Garcia"
                age={28}
                gender="Female"
                mrn="MRN901234"
                reason="Pregnancy check"
                priority="normal"
                time="10:30 AM"
                doctor="Smith"
                vitals={{
                  bp: "118/75",
                  hr: 80,
                  temp: 98.4,
                  spo2: 99
                }}
              />
              <PatientCard
                name="George Brown"
                age={72}
                gender="Male"
                mrn="MRN567890"
                reason="Diabetes check"
                priority="low"
                time="11:00 AM"
                doctor="Wilson"
                vitals={{
                  bp: "135/82",
                  hr: 68,
                  temp: 97.9,
                  spo2: 96
                }}
              />
              <PatientCard
                name="Lisa Johnson"
                age={41}
                gender="Female"
                mrn="MRN234567"
                reason="Annual exam"
                priority="low"
                time="11:45 AM"
                doctor="Lee"
                vitals={{
                  bp: "120/80",
                  hr: 65,
                  temp: 98.0,
                  spo2: 99
                }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="vitals" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <VitalsChart 
                title="Patient: James Wilson (Urgent Care)"
                data={mockVitalsData}
              />
              <Card>
                <CardHeader>
                  <CardTitle className="text-md font-medium">IoT Device Readings</CardTitle>
                  <CardDescription>Latest data from connected devices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1 bg-background p-3 rounded-lg border border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Heart Rate Monitor</span>
                        <Heartbeat size={16} className="text-emr-urgent" />
                      </div>
                      <span className="text-2xl font-bold">72 BPM</span>
                      <span className="text-xs text-muted-foreground">Updated 2 mins ago</span>
                    </div>
                    <div className="flex flex-col gap-1 bg-background p-3 rounded-lg border border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Blood Pressure</span>
                        <Activity size={16} className="text-emr-warning" />
                      </div>
                      <span className="text-2xl font-bold">120/80</span>
                      <span className="text-xs text-muted-foreground">Updated 5 mins ago</span>
                    </div>
                    <div className="flex flex-col gap-1 bg-background p-3 rounded-lg border border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Blood Glucose</span>
                        <Activity size={16} className="text-emr-accent" />
                      </div>
                      <span className="text-2xl font-bold">110 mg/dL</span>
                      <span className="text-xs text-muted-foreground">Updated 10 mins ago</span>
                    </div>
                    <div className="flex flex-col gap-1 bg-background p-3 rounded-lg border border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Temperature</span>
                        <Activity size={16} className="text-emr-success" />
                      </div>
                      <span className="text-2xl font-bold">98.6 °F</span>
                      <span className="text-xs text-muted-foreground">Updated 15 mins ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="followups" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Follow-ups</CardTitle>
                  <CardDescription>Patients requiring follow-up today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <PatientCard
                      name="David Lee"
                      age={58}
                      gender="Male"
                      mrn="MRN112233"
                      reason="Post-surgery check"
                      priority="high"
                      time="2:30 PM"
                    />
                    <PatientCard
                      name="Sarah Williams"
                      age={35}
                      gender="Female"
                      mrn="MRN445566"
                      reason="Medication review"
                      priority="normal"
                      time="3:15 PM"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Follow-ups</CardTitle>
                  <CardDescription>Scheduled for the next 3 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <PatientCard
                      name="Thomas Anderson"
                      age={42}
                      gender="Male"
                      mrn="MRN778899"
                      reason="Test results review"
                      priority="normal"
                      time="Tomorrow, 10:00 AM"
                    />
                    <PatientCard
                      name="Jennifer Lopez"
                      age={29}
                      gender="Female"
                      mrn="MRN001122"
                      reason="Pregnancy follow-up"
                      priority="normal"
                      time="2 days, 09:30 AM"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>System alerts and messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  <NotificationItem
                    type="triage"
                    title="Urgent Triage Alert"
                    message="Patient James Wilson (MRN123456) has concerning vital signs. BP 150/95, HR 95."
                    time="10 minutes ago"
                  />
                  <NotificationItem
                    type="iot"
                    title="IoT Device Alert"
                    message="Blood glucose monitor for patient Robert Kim (MRN345678) reports levels outside normal range."
                    time="25 minutes ago"
                  />
                  <NotificationItem
                    type="followup"
                    title="Follow-up Reminder"
                    message="Scheduled follow-up with Sarah Williams (MRN445566) for medication review at 3:15 PM today."
                    time="1 hour ago"
                    read={true}
                  />
                  <NotificationItem
                    type="system"
                    title="System Update"
                    message="EMR system will undergo maintenance tonight at 2:00 AM. Estimated downtime: 30 minutes."
                    time="2 hours ago"
                    read={true}
                  />
                  <NotificationItem
                    type="iot"
                    title="IoT Connection Status"
                    message="Remote patient monitoring device for Maria Garcia (MRN901234) is now online and transmitting data."
                    time="3 hours ago"
                    read={true}
                  />
                  <NotificationItem
                    type="followup"
                    title="Follow-up Completed"
                    message="Dr. Davis has completed the follow-up for Emily Rodriguez (MRN789012)."
                    time="4 hours ago"
                    read={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
