
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const TriagePage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Triage</h1>
          <p className="text-muted-foreground">AI-assisted patient triage and prioritization</p>
        </div>
        
        <div className="flex items-center justify-center h-[400px] border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">Triage functionality coming soon</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default TriagePage;
