
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedPatientData } from '@/services/patientService';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Database, Loader2 } from 'lucide-react';

const SeedDataButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const queryClient = useQueryClient();

  const handleSeedData = async () => {
    try {
      setIsSeeding(true);
      toast({
        title: 'Processing',
        description: 'Attempting to add sample patient data...',
        duration: 5000,
      });
      
      await seedPatientData();
      
      // Invalidate patients query to refetch data
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({
        title: 'Success',
        description: 'Sample patient data has been added to the database.',
        duration: 5000,
      });
    } catch (error: any) {
      console.error('Error seeding data:', error);
      
      let errorMessage = error?.message || 'Unknown error';
      if (errorMessage.includes('relation') && errorMessage.includes('does not exist')) {
        errorMessage = 'Tables not found. Please verify that you have created the "patients" and "vitals_data" tables in Supabase.';
      }
      
      toast({
        title: 'Error',
        description: `Failed to seed patient data: ${errorMessage}`,
        variant: 'destructive',
        duration: 10000,
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button 
      variant="secondary" 
      size="sm"
      className="gap-2"
      onClick={handleSeedData}
      disabled={isSeeding}
    >
      {isSeeding ? <Loader2 size={16} className="animate-spin" /> : <Database size={16} />}
      {isSeeding ? 'Adding Samples...' : 'Reset Sample Data'}
    </Button>
  );
};

export default SeedDataButton;
