
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedPatientData } from '@/services/patientService';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Database } from 'lucide-react';

const SeedDataButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const queryClient = useQueryClient();

  const handleSeedData = async () => {
    try {
      setIsSeeding(true);
      await seedPatientData();
      // Invalidate patients query to refetch data
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({
        title: 'Success',
        description: 'Sample patient data has been added to the database.',
        duration: 5000,
      });
    } catch (error) {
      console.error('Error seeding data:', error);
      toast({
        title: 'Error',
        description: 'Failed to seed patient data. Check console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      className="gap-2"
      onClick={handleSeedData}
      disabled={isSeeding}
    >
      <Database size={16} />
      {isSeeding ? 'Adding Samples...' : 'Seed Sample Data'}
    </Button>
  );
};

export default SeedDataButton;
