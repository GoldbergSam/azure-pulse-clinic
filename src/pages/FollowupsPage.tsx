
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const FollowupsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Follow-ups</h1>
          <p className="text-muted-foreground">Manage patient follow-up appointments and tasks</p>
        </div>
        
        <div className="flex items-center justify-center h-[400px] border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">Follow-up management functionality coming soon</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default FollowupsPage;
