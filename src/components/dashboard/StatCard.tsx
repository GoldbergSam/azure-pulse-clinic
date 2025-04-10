
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const StatCard = ({ title, value, icon, change, trend, className }: StatCardProps) => {
  return (
    <div className={cn("card-stats card-hover", className)}>
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="text-muted-foreground/70">{icon}</div>
      </div>
      <div className="mt-1">
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      {change && (
        <div className="flex items-center mt-1">
          <span 
            className={cn(
              "text-xs font-medium",
              trend === 'up' && "text-emr-success",
              trend === 'down' && "text-emr-urgent",
              trend === 'neutral' && "text-muted-foreground"
            )}
          >
            {change}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
