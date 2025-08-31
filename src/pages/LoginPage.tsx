import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

export const LoginPage = () => {
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      if (user.role === 'Technician') {
        navigate('/technician');
      } else if (user.role === 'Dentist') {
        navigate('/dentist');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  return <LoginForm onLogin={handleLogin} isLoading={isLoading} />;
};