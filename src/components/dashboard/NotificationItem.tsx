
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AlertCircle, Bell, Heart, Smartphone, CheckCircle } from 'lucide-react';

type NotificationType = 'iot' | 'triage' | 'followup' | 'system';

interface NotificationItemProps {
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read?: boolean;
  className?: string;
}

const NotificationItem = ({ 
  type, 
  title, 
  message, 
  time, 
  read = false,
  className 
}: NotificationItemProps) => {
  
  const getIcon = () => {
    switch (type) {
      case 'iot':
        return <Smartphone className="h-4 w-4" />;
      case 'triage':
        return <AlertCircle className="h-4 w-4" />;
      case 'followup':
        return <CheckCircle className="h-4 w-4" />;
      case 'system':
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  const getColor = () => {
    switch (type) {
      case 'iot':
        return "bg-blue-500/20 text-blue-500";
      case 'triage':
        return "bg-emr-urgent/20 text-emr-urgent";
      case 'followup':
        return "bg-emr-success/20 text-emr-success";
      case 'system':
        return "bg-gray-500/20 text-gray-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };
  
  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg transition-colors",
      read ? "bg-transparent" : "bg-emr-accent/5 border-l-2 border-emr-accent",
      "hover:bg-secondary/50",
      className
    )}>
      <div className={cn(
        "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
        getColor()
      )}>
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm">{title}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{time}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{message}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
