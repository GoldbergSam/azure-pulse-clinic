
import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TriageAlertProps {
  patient: string;
  alert: string;
  time: string;
  severity: 'urgent' | 'warning' | 'info';
  onClose?: () => void;
  className?: string;
}

const TriageAlert = ({ 
  patient, 
  alert, 
  time, 
  severity = 'info',
  onClose,
  className 
}: TriageAlertProps) => {
  
  const severityClasses = {
    urgent: "bg-emr-urgent/10 border-emr-urgent/40 text-emr-urgent",
    warning: "bg-emr-warning/10 border-emr-warning/40 text-emr-warning",
    info: "bg-emr-accent/10 border-emr-accent/40 text-emr-accent"
  };
  
  return (
    <div className={cn(
      "relative rounded-lg border p-4",
      severityClasses[severity],
      className
    )}>
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 mt-0.5" />
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium">{patient}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={cn(
                "h-5 w-5 rounded-full p-0",
                "hover:bg-background/30"
              )}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <p className="text-sm mt-1">{alert}</p>
          <p className="text-xs mt-2">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default TriageAlert;
