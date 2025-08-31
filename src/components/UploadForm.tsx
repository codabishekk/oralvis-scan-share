import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileImage, User, IdCard } from "lucide-react";

interface UploadFormProps {
  onUpload: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
}

export const UploadForm = ({ onUpload, isLoading }: UploadFormProps) => {
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [scanType, setScanType] = useState("");
  const [region, setRegion] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientName || !patientId || !scanType || !region || !imageFile) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields and select an image",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("patientName", patientName);
    formData.append("patientId", patientId);
    formData.append("scanType", scanType);
    formData.append("region", region);
    formData.append("image", imageFile);

    try {
      await onUpload(formData);
      // Reset form
      setPatientName("");
      setPatientId("");
      setScanType("");
      setRegion("");
      setImageFile(null);
      
      toast({
        title: "Upload Successful",
        description: "Patient scan has been uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading the scan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImageFile(file);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please select a JPG or PNG image file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-medium card-gradient">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Upload Patient Scan</CardTitle>
              <CardDescription>
                Upload new dental scans with patient information
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="patientName"
                    type="text"
                    placeholder="Enter patient name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="patientId"
                    type="text"
                    placeholder="Enter patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scanType">Scan Type</Label>
                <Select value={scanType} onValueChange={setScanType} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RGB">RGB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={region} onValueChange={setRegion} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontal">Frontal</SelectItem>
                    <SelectItem value="Upper Arch">Upper Arch</SelectItem>
                    <SelectItem value="Lower Arch">Lower Arch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Scan Image</Label>
              <div className="relative">
                <FileImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {imageFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
              disabled={isLoading || !imageFile}
            >
              {isLoading ? "Uploading..." : "Upload Scan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};