
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Users, Clock, Activity, Bell, CheckSquare, Smartphone, AlertCircle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import PatientCard from '@/components/dashboard/PatientCard';
import TriageAlert from '@/components/dashboard/TriageAlert';
import NotificationItem from '@/components/dashboard/NotificationItem';
import VitalsView from '@/components/dashboard/VitalsView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePatients } from '@/hooks/usePatients';

const Dashboard = () => {
  const { patients } = usePatients();
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
            value={patients.length.toString()}
            icon={<Users size={18} />}
            change={`+${Math.floor(patients.length * 0.04)}% from last week`}
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
              {patients.slice(0, 6).map((patient) => (
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
          </TabsContent>
          
          <TabsContent value="vitals" className="space-y-4">
            <VitalsView title="Patient Vital Signs Monitor" />
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
                    {patients.filter(p => p.priority === 'high').slice(0, 2).map(patient => (
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
                      />
                    ))}
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
                    {patients.filter(p => p.priority === 'normal').slice(0, 2).map(patient => (
                      <PatientCard
                        key={patient.id}
                        name={patient.name}
                        age={patient.age}
                        gender={patient.gender}
                        mrn={patient.mrn}
                        reason={patient.reason}
                        priority={patient.priority}
                        time={`Tomorrow, ${patient.time}`}
                        doctor={patient.doctor}
                      />
                    ))}
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
                    message={`Patient ${patients.length > 0 ? patients[0].name : 'James Wilson'} has concerning vital signs. BP 150/95, HR 95.`}
                    time="10 minutes ago"
                  />
                  <NotificationItem
                    type="iot"
                    title="IoT Device Alert"
                    message={`Blood glucose monitor for patient ${patients.length > 1 ? patients[1].name : 'Robert Kim'} reports levels outside normal range.`}
                    time="25 minutes ago"
                  />
                  <NotificationItem
                    type="followup"
                    title="Follow-up Reminder"
                    message={`Scheduled follow-up with ${patients.length > 2 ? patients[2].name : 'Sarah Williams'} for medication review at 3:15 PM today.`}
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
                    message={`Remote patient monitoring device for ${patients.length > 3 ? patients[3].name : 'Maria Garcia'} is now online and transmitting data.`}
                    time="3 hours ago"
                    read={true}
                  />
                  <NotificationItem
                    type="followup"
                    title="Follow-up Completed"
                    message={`Dr. Davis has completed the follow-up for ${patients.length > 4 ? patients[4].name : 'Emily Rodriguez'}.`}
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
