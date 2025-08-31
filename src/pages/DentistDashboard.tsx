import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ScanViewer } from "@/components/ScanViewer";
import { useAuth } from "@/contexts/AuthContext";
import { ScanData } from "@/types";

export const DentistDashboard = () => {
  const { user, logout } = useAuth();
  const [scans, setScans] = useState<ScanData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load scans from localStorage (in a real app, this would be an API call)
    const loadScans = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedScans = JSON.parse(localStorage.getItem('oralvis-scans') || '[]');
      setScans(storedScans);
      setIsLoading(false);
    };

    loadScans();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={user?.role} onLogout={logout} />
      <main className="py-8">
        <ScanViewer scans={scans} isLoading={isLoading} />
      </main>
    </div>
  );
};