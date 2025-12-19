import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Check, Pencil } from "lucide-react";

interface EnrollmentViewProps {
  onBack: () => void;
  onComplete: () => void;
}

export function EnrollmentView({ onBack, onComplete }: EnrollmentViewProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rut, setRut] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatRut = (value: string) => {
    const cleaned = value.replace(/[^\dkK]/g, '');
    if (cleaned.length <= 1) return cleaned;
    const body = cleaned.slice(0, -1);
    const verifier = cleaned.slice(-1);
    const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted}-${verifier}`;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    if (formatted.length <= 12) {
      setRut(formatted);
    }
  };

  // Canvas drawing setup
  useEffect(() => {
    if (step === 2 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0A2342';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [step]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleContinue = () => {
    if (step === 1 && rut) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleFinish = () => {
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-full max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
          style={{ color: 'var(--navy-deep)' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Login
        </Button>

        <Card className="border-2" style={{ borderColor: 'var(--gray-structure)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>
              {step === 1 && "Enrolamiento - Paso 1 de 2"}
              {step === 2 && "Enrolamiento - Paso 2 de 2"}
              {step === 3 && "¡Enrolamiento Exitoso!"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Ingresa tu RUT para comenzar el proceso"}
              {step === 2 && "Crea tu firma digital"}
              {step === 3 && "Tu cuenta ha sido creada exitosamente"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="enroll-rut">RUT</Label>
                  <Input
                    id="enroll-rut"
                    placeholder="12.345.678-9"
                    value={rut}
                    onChange={handleRutChange}
                    className="border-2"
                    style={{ borderColor: 'var(--gray-structure)' }}
                  />
                </div>
                <Button 
                  className="w-full text-white" 
                  style={{ backgroundColor: 'var(--orange-action)' }}
                  onClick={handleContinue}
                  disabled={!rut || rut.length < 11}
                >
                  Continuar
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Firma Digital</Label>
                  <p className="text-sm text-gray-600">Dibuja tu firma en el recuadro usando el mouse o tu dedo</p>
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={300}
                      className="border-2 rounded-lg w-full cursor-crosshair"
                      style={{ 
                        borderColor: 'var(--navy-deep)',
                        backgroundColor: 'white',
                        touchAction: 'none'
                      }}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearCanvas}
                        style={{ borderColor: 'var(--gray-structure)' }}
                      >
                        Limpiar
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Pencil className="w-4 h-4" />
                    <span>Utiliza el área completa para crear tu firma</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="flex-1 border-2"
                    style={{ borderColor: 'var(--gray-structure)' }}
                    onClick={() => setStep(1)}
                  >
                    Atrás
                  </Button>
                  <Button 
                    className="flex-1 text-white" 
                    style={{ backgroundColor: 'var(--orange-action)' }}
                    onClick={handleContinue}
                  >
                    Crear Firma
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8 space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full" style={{ backgroundColor: '#4CAF50' }}>
                  <Check className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: 'var(--navy-deep)' }}>Firma Digital Creada Exitosamente</h3>
                  <p className="text-gray-600">Tu cuenta ha sido configurada correctamente</p>
                </div>
                <Button 
                  className="text-white" 
                  style={{ backgroundColor: 'var(--navy-deep)' }}
                  onClick={handleFinish}
                >
                  Ir al Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
