
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PriorityType = 'urgent' | 'high' | 'normal' | 'low';

interface PatientCardProps {
  name: string;
  age: number;
  gender: string;
  mrn: string;
  reason: string;
  priority: PriorityType;
  time: string;
  doctor?: string;
  vitals?: {
    bp?: string;
    hr?: number;
    temp?: number;
    spo2?: number;
  };
  className?: string;
}

const PatientCard = ({ 
  name, 
  age, 
  gender, 
  mrn, 
  reason, 
  priority, 
  time, 
  doctor, 
  vitals,
  className 
}: PatientCardProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <div className={cn("card-patient card-hover", className)}>
      {priority && (
        <div className={cn(
          "absolute top-2 right-2 badge-priority",
          `priority-${priority}`
        )}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-emr-accent/20 text-emr-accent">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">
            {age} yrs • {gender} • MRN: {mrn}
          </p>
        </div>
      </div>
      
      <div className="mt-1">
        <p className="text-sm font-medium">Reason: {reason}</p>
        <p className="text-xs text-muted-foreground">Check-in: {time}</p>
        {doctor && <p className="text-xs text-muted-foreground">Dr. {doctor}</p>}
      </div>
      
      {vitals && (
        <div className="grid grid-cols-4 gap-2 mt-2 text-xs">
          {vitals.bp && (
            <div className="bg-background rounded p-1 text-center">
              <p className="text-muted-foreground">BP</p>
              <p className="font-medium">{vitals.bp}</p>
            </div>
          )}
          {vitals.hr && (
            <div className="bg-background rounded p-1 text-center">
              <p className="text-muted-foreground">HR</p>
              <p className="font-medium">{vitals.hr}</p>
            </div>
          )}
          {vitals.temp && (
            <div className="bg-background rounded p-1 text-center">
              <p className="text-muted-foreground">Temp</p>
              <p className="font-medium">{vitals.temp}°F</p>
            </div>
          )}
          {vitals.spo2 && (
            <div className="bg-background rounded p-1 text-center">
              <p className="text-muted-foreground">SpO2</p>
              <p className="font-medium">{vitals.spo2}%</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-3 flex justify-end">
        <Button variant="outline" size="sm" className="text-xs gap-1">
          View Details
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
};

export default PatientCard;
