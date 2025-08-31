export interface User {
  id: string;
  email: string;
  role: 'Technician' | 'Dentist';
}

export interface ScanData {
  id: string;
  patientName: string;
  patientId: string;
  scanType: string;
  region: string;
  imageUrl: string;
  uploadDate: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}