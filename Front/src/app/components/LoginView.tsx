import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { HardHat } from "lucide-react";

interface LoginViewProps {
  onLogin: (role: 'prevencionista' | 'trabajador') => void;
  onEnroll: () => void;
}

export function LoginView({ onLogin, onEnroll }: LoginViewProps) {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");

  const formatRut = (value: string) => {
    // Remove all non-digit characters except 'k' or 'K'
    const cleaned = value.replace(/[^\dkK]/g, '');
    
    if (cleaned.length <= 1) return cleaned;
    
    // Separate body and verifier
    const body = cleaned.slice(0, -1);
    const verifier = cleaned.slice(-1);
    
    // Add dots every 3 digits from right to left
    const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return `${formatted}-${verifier}`;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    if (formatted.length <= 12) {
      setRut(formatted);
    }
  };

  const handleLogin = () => {
    // Simple demo logic: if RUT starts with "11", they're prevencionista, otherwise trabajador
    if (rut.startsWith("11")) {
      onLogin("prevencionista");
    } else {
      onLogin("trabajador");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: 'var(--navy-deep)' }}>
            <HardHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl mb-2" style={{ color: 'var(--navy-deep)' }}>Safe Community</h1>
          <p className="text-gray-600">Sistema de Gestión de Seguridad en Obras</p>
        </div>

        <Card className="border-2" style={{ borderColor: 'var(--gray-structure)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rut">RUT</Label>
              <Input
                id="rut"
                placeholder="12.345.678-9"
                value={rut}
                onChange={handleRutChange}
                className="border-2"
                style={{ borderColor: 'var(--gray-structure)' }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2"
                style={{ borderColor: 'var(--gray-structure)' }}
              />
            </div>
            <Button 
              className="w-full text-white" 
              style={{ backgroundColor: 'var(--navy-deep)' }}
              onClick={handleLogin}
            >
              Ingresar
            </Button>
            <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--gray-structure)' }}>
              <p className="text-sm text-gray-600 mb-3">¿No tienes cuenta?</p>
              <Button 
                variant="outline" 
                className="w-full border-2"
                style={{ 
                  borderColor: 'var(--orange-action)',
                  color: 'var(--orange-action)'
                }}
                onClick={onEnroll}
              >
                Enrólate aquí
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Helper */}
        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#E3F2FD' }}>
          <p className="text-xs text-gray-600 text-center">
            <strong>Demo:</strong> RUT que empiece con "11" = Prevencionista | Otro RUT = Trabajador
          </p>
        </div>
      </div>
    </div>
  );
}
