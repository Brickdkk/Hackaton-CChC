import { useState } from "react";
import { LoginView } from "./components/LoginView";
import { EnrollmentView } from "./components/EnrollmentView";
import { DashboardPrevencionista } from "./components/DashboardPrevencionista";
import { AppTrabajador } from "./components/AppTrabajador";

type View = 'login' | 'enrollment' | 'prevencionista' | 'trabajador';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');

  const handleLogin = (role: 'prevencionista' | 'trabajador') => {
    if (role === 'prevencionista') {
      setCurrentView('prevencionista');
    } else {
      setCurrentView('trabajador');
    }
  };

  const handleEnroll = () => {
    setCurrentView('enrollment');
  };

  const handleEnrollmentComplete = () => {
    setCurrentView('login');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'login' && (
        <LoginView 
          onLogin={handleLogin}
          onEnroll={handleEnroll}
        />
      )}

      {currentView === 'enrollment' && (
        <EnrollmentView 
          onBack={handleBackToLogin}
          onComplete={handleEnrollmentComplete}
        />
      )}

      {currentView === 'prevencionista' && (
        <DashboardPrevencionista 
          onLogout={handleLogout}
        />
      )}

      {currentView === 'trabajador' && (
        <AppTrabajador 
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
