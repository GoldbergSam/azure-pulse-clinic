
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPatients, fetchPatientById, addPatient, updatePatient, fetchVitalsData } from '@/services/patientService';
import { Patient } from '@/types/patient';
import { toast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

export const usePatients = () => {
  const queryClient = useQueryClient();
  
  const { data: patients, isLoading, error } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    retry: 1,
  });

  // Use useEffect to show toast when an error occurs
  useEffect(() => {
    if (error) {
      let errorMessage = (error as Error)?.message || 'Unknown error';
      if (errorMessage.includes('relation') && errorMessage.includes('does not exist')) {
        toast({
          title: 'Database Setup Required',
          description: 'Please create the "patients" and "vitals_data" tables in your Supabase dashboard, then try again.',
          variant: 'destructive',
          duration: 10000,
        });
      }
    }
  }, [error]); // Only run when error changes

  const addPatientMutation = useMutation({
    mutationFn: addPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({
        title: 'Patient added',
        description: 'The patient has been successfully added.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to add patient: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const updatePatientMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Patient> }) => updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({
        title: 'Patient updated',
        description: 'The patient information has been updated.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to update patient: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  return {
    patients: patients || [],
    isLoading,
    error,
    addPatient: addPatientMutation.mutate,
    updatePatient: updatePatientMutation.mutate,
    isAdding: addPatientMutation.isPending,
    isUpdating: updatePatientMutation.isPending,
  };
};

export const usePatient = (id: number) => {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => fetchPatientById(id),
    enabled: !!id,
  });
};

export const usePatientVitals = (patientId: number) => {
  return useQuery({
    queryKey: ['vitals', patientId],
    queryFn: () => fetchVitalsData(patientId),
    enabled: !!patientId,
  });
};
