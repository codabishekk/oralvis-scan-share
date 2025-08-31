import { useState } from "react";
import { Header } from "@/components/Header";
import { UploadForm } from "@/components/UploadForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const TechnicianDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (formData: FormData) => {
    setIsUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would upload to your backend/cloud storage
      console.log('Upload data:', {
        patientName: formData.get('patientName'),
        patientId: formData.get('patientId'),
        scanType: formData.get('scanType'),
        region: formData.get('region'),
        image: formData.get('image')
      });
      
      // Store in localStorage for demo
      const existingScans = JSON.parse(localStorage.getItem('oralvis-scans') || '[]');
      const newScan = {
        id: Date.now().toString(),
        patientName: formData.get('patientName'),
        patientId: formData.get('patientId'),
        scanType: formData.get('scanType'),
        region: formData.get('region'),
        imageUrl: URL.createObjectURL(formData.get('image') as File), // Demo URL
        uploadDate: new Date().toISOString()
      };
      
      existingScans.push(newScan);
      localStorage.setItem('oralvis-scans', JSON.stringify(existingScans));
      
    } catch (error) {
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={user?.role} onLogout={logout} />
      <main className="py-8">
        <UploadForm onUpload={handleUpload} isLoading={isUploading} />
      </main>
    </div>
  );
};