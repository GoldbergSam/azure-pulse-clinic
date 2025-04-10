
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const PatientsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-muted-foreground">Manage your patient records</p>
        </div>
        
        <div className="flex items-center justify-center h-[400px] border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">Patient management functionality coming soon</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientsPage;
