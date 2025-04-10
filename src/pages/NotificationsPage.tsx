
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const NotificationsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">View and manage all system notifications</p>
        </div>
        
        <div className="flex items-center justify-center h-[400px] border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">Notifications management functionality coming soon</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
