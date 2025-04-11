import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter } from 'lucide-react';
import PatientCard from '@/components/dashboard/PatientCard';
import { usePatients } from '@/hooks/usePatients';
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import AddPatientDialog from '@/components/patients/AddPatientDialog';
import SeedDataButton from '@/components/patients/SeedDataButton';

const PatientsPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const { patients, isLoading, error } = usePatients();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading patients",
        description: "There was a problem loading the patient data.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSkeletons = () => (
    <>
      {Array(5).fill(0).map((_, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton className="h-10 w-full" /></TableCell>
          <TableCell><Skeleton className="h-6 w-24" /></TableCell>
          <TableCell><Skeleton className="h-6 w-32" /></TableCell>
          <TableCell><Skeleton className="h-6 w-20" /></TableCell>
          <TableCell><Skeleton className="h-6 w-20" /></TableCell>
          <TableCell><Skeleton className="h-6 w-24" /></TableCell>
          <TableCell><Skeleton className="h-6 w-32" /></TableCell>
        </TableRow>
      ))}
    </>
  );

  const renderCardSkeletons = () => (
    <>
      {Array(6).fill(0).map((_, index) => (
        <div key={index} className="card-patient">
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="mt-3 flex justify-end">
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Patients</h1>
            <p className="text-muted-foreground">Manage your patient records</p>
          </div>
          <div className="flex gap-2">
            <SeedDataButton />
            <Button className="gap-2" onClick={() => setIsAddPatientOpen(true)}>
              <Plus size={16} />
              Add Patient
            </Button>
          </div>
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
                  {isLoading ? (
                    renderSkeletons()
                  ) : filteredPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        {searchQuery ? 'No patients match your search' : 'No patients found'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients.map((patient) => (
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
                        <TableCell>{patient.doctor ? `Dr. ${patient.doctor}` : '-'}</TableCell>
                        <TableCell>
                          {patient.vitals ? (
                            <div className="flex gap-2 items-center">
                              {patient.vitals.bp && <span className="text-xs">{patient.vitals.bp}</span>}
                              {patient.vitals.hr && <span className="text-xs">{patient.vitals.hr} BPM</span>}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">No data</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                renderCardSkeletons()
              ) : filteredPatients.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  {searchQuery ? 'No patients match your search' : 'No patients found'}
                </div>
              ) : (
                filteredPatients.map((patient) => (
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
                ))
              )}
            </div>
          )}
        </div>
      </div>
      
      <AddPatientDialog 
        open={isAddPatientOpen} 
        onOpenChange={setIsAddPatientOpen} 
      />
    </MainLayout>
  );
};

export default PatientsPage;
