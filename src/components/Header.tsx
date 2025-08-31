import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userRole?: string;
  onLogout?: () => void;
}

export const Header = ({ userRole, onLogout }: HeaderProps) => {
  return (
    <header className="bg-gradient-primary shadow-medium border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <img 
                src="/lovable-uploads/69c62c9c-be0b-4f32-bd5b-36fc6088cd99.png" 
                alt="OralVis Healthcare Logo" 
                className="h-6 w-6"
              />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">OralVis Healthcare</h1>
              <p className="text-xs text-white/80">Professional Dental Imaging</p>
            </div>
          </div>
          
          {userRole && (
            <div className="flex items-center space-x-4">
              <div className="text-white text-right">
                <p className="text-sm font-medium">{userRole}</p>
                <p className="text-xs text-white/80">Logged in</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-white hover:bg-white/20 hover:text-white transition-smooth"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};