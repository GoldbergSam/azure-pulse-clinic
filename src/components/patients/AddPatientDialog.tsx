
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { usePatients } from '@/hooks/usePatients';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Priority } from '@/types/patient';

const patientSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.coerce.number().min(0).max(120, { message: "Age must be between 0 and 120" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  mrn: z.string().min(3, { message: "MRN must be at least 3 characters" }),
  reason: z.string().min(2, { message: "Reason is required" }),
  priority: z.enum(["urgent", "high", "normal", "low"]),
  time: z.string(),
  doctor: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPatientDialog = ({ open, onOpenChange }: AddPatientDialogProps) => {
  const { addPatient, isAdding } = usePatients();
  
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      age: 0,
      gender: '',
      mrn: '',
      reason: '',
      priority: 'normal' as Priority,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: '',
    },
  });

  const onSubmit = (data: PatientFormValues) => {
    addPatient({
      ...data,
      vitals: {
        bp: '120/80',
        hr: 72,
        temp: 98.6,
        spo2: 98
      },
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                {...form.register('name')}
                placeholder="John Doe" 
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mrn">MRN</Label>
              <Input 
                id="mrn" 
                {...form.register('mrn')}
                placeholder="MRN123456" 
              />
              {form.formState.errors.mrn && (
                <p className="text-sm text-destructive">{form.formState.errors.mrn.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                {...form.register('age')}
              />
              {form.formState.errors.age && (
                <p className="text-sm text-destructive">{form.formState.errors.age.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                onValueChange={(value) => form.setValue('gender', value)}
                defaultValue={form.getValues('gender')}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.gender && (
                <p className="text-sm text-destructive">{form.formState.errors.gender.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Input 
              id="reason" 
              {...form.register('reason')}
              placeholder="Checkup, pain, etc." 
            />
            {form.formState.errors.reason && (
              <p className="text-sm text-destructive">{form.formState.errors.reason.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                onValueChange={(value: Priority) => form.setValue('priority', value)}
                defaultValue={form.getValues('priority')}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.priority && (
                <p className="text-sm text-destructive">{form.formState.errors.priority.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor (Optional)</Label>
              <Input 
                id="doctor" 
                {...form.register('doctor')}
                placeholder="Doctor's name" 
              />
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? 'Adding...' : 'Add Patient'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
