
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Bell, 
  Stethoscope, 
  ClipboardList, 
  Settings, 
  LogOut
} from 'lucide-react';

const navItems = [
  { 
    name: 'Dashboard', 
    path: '/', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Patients', 
    path: '/patients', 
    icon: Users 
  },
  { 
    name: 'Appointments', 
    path: '/appointments', 
    icon: Calendar 
  },
  { 
    name: 'Notifications', 
    path: '/notifications', 
    icon: Bell 
  },
  { 
    name: 'Triage', 
    path: '/triage', 
    icon: Stethoscope 
  },
  { 
    name: 'Follow-ups', 
    path: '/followups', 
    icon: ClipboardList 
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-sidebar fixed left-0 top-0 border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h1 className="font-bold text-xl text-primary">Encode MR</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-secondary text-primary" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <ul className="space-y-2">
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
