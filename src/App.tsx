
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import PatientsPage from "./pages/PatientsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import NotificationsPage from "./pages/NotificationsPage";
import TriagePage from "./pages/TriagePage";
import FollowupsPage from "./pages/FollowupsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { seedPatientData } from "./services/patientService";
import { toast } from "./components/ui/use-toast";

const App = () => {
  // Create QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  // Auto-seed data on first load for demo purposes
  useEffect(() => {
    const seedData = async () => {
      try {
        await seedPatientData();
        console.log("Demo data seeded successfully");
        setIsLoading(false);
      } catch (error) {
        console.error("Error seeding demo data:", error);
        toast({
          title: "Demo Setup",
          description: "Prepared local mock environment for demo",
        });
        setIsLoading(false);
      }
    };

    seedData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Setting up demo environment...</h2>
          <p className="text-muted-foreground">This will only take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/triage" element={<TriagePage />} />
            <Route path="/followups" element={<FollowupsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
