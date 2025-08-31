import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Eye, Download, Calendar, User, IdCard, Scan } from "lucide-react";

interface ScanData {
  id: string;
  patientName: string;
  patientId: string;
  scanType: string;
  region: string;
  imageUrl: string;
  uploadDate: string;
}

interface ScanViewerProps {
  scans: ScanData[];
  isLoading?: boolean;
}

export const ScanViewer = ({ scans, isLoading }: ScanViewerProps) => {
  const [selectedScan, setSelectedScan] = useState<ScanData | null>(null);
  const { toast } = useToast();

  const handleDownloadPDF = async (scan: ScanData) => {
    try {
      // Create a simple PDF using jsPDF (would need to be installed)
      const doc = new (await import('jspdf')).jsPDF();
      
      doc.setFontSize(20);
      doc.text('OralVis Healthcare - Scan Report', 20, 30);
      
      doc.setFontSize(12);
      doc.text(`Patient Name: ${scan.patientName}`, 20, 50);
      doc.text(`Patient ID: ${scan.patientId}`, 20, 60);
      doc.text(`Scan Type: ${scan.scanType}`, 20, 70);
      doc.text(`Region: ${scan.region}`, 20, 80);
      doc.text(`Upload Date: ${new Date(scan.uploadDate).toLocaleDateString()}`, 20, 90);
      
      // Note: In a real app, you'd add the image to the PDF here
      doc.text('Scan Image: [Image would be embedded here]', 20, 110);
      
      doc.save(`${scan.patientName}_${scan.patientId}_report.pdf`);
      
      toast({
        title: "PDF Downloaded",
        description: "Scan report has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating the PDF report",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Patient Scans</h2>
        <p className="text-muted-foreground">View and manage all uploaded dental scans</p>
      </div>

      {scans.length === 0 ? (
        <Card className="shadow-medium card-gradient text-center py-12">
          <CardContent>
            <Scan className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-xl mb-2">No Scans Available</CardTitle>
            <CardDescription>
              No dental scans have been uploaded yet. Check back later.
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scans.map((scan) => (
            <Card key={scan.id} className="shadow-medium card-gradient hover:shadow-strong transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      {scan.patientName}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <IdCard className="h-3 w-3 mr-1" />
                      ID: {scan.patientId}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{scan.scanType}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={scan.imageUrl}
                    alt={`Scan for ${scan.patientName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="font-medium">{scan.region}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Upload Date:</span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="font-medium">
                        {new Date(scan.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Full
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Full Scan View</DialogTitle>
                        <DialogDescription>
                          {scan.patientName} - {scan.region} ({scan.scanType})
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <img
                          src={scan.imageUrl}
                          alt={`Full scan for ${scan.patientName}`}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                    onClick={() => handleDownloadPDF(scan)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};