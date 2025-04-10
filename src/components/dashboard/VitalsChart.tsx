
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VitalsDataPoint } from '@/types/patient';

interface VitalsChartProps {
  data: VitalsDataPoint[];
  title: string;
  subtitle?: string;
  showBloodPressure?: boolean;
  showHeartRate?: boolean;
  showTemperature?: boolean;
  showSpO2?: boolean;
  className?: string;
  patientId?: number;
  onPatientChange?: (patientId: number) => void;
  patients?: Array<{ id: number; name: string }>;
}

const VitalsChart = ({
  data,
  title,
  subtitle,
  showBloodPressure = true,
  showHeartRate = true,
  showTemperature = true,
  showSpO2 = true,
  className,
  patientId,
  onPatientChange,
  patients = []
}: VitalsChartProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-md font-medium">{title}</CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>
          
          {patients.length > 0 && onPatientChange && (
            <Select 
              value={patientId?.toString()} 
              onValueChange={(value) => onPatientChange(parseInt(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }} 
                stroke="hsl(var(--muted-foreground))" 
              />
              <YAxis 
                width={25} 
                tick={{ fontSize: 10 }} 
                stroke="hsl(var(--muted-foreground))" 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              {showHeartRate && (
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  name="Heart Rate" 
                  stroke="#E63946" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 4 }} 
                />
              )}
              {showBloodPressure && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="bloodPressureSystolic" 
                    name="Systolic BP" 
                    stroke="#F9A826" 
                    strokeWidth={2} 
                    dot={false} 
                    activeDot={{ r: 4 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bloodPressureDiastolic" 
                    name="Diastolic BP" 
                    stroke="#F9C74F" 
                    strokeWidth={2} 
                    dot={false} 
                    activeDot={{ r: 4 }} 
                  />
                </>
              )}
              {showTemperature && (
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  name="Temperature" 
                  stroke="#4DA9FF" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 4 }} 
                />
              )}
              {showSpO2 && (
                <Line 
                  type="monotone" 
                  dataKey="spO2" 
                  name="SpO2" 
                  stroke="#2DD36F" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 4 }} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalsChart;
