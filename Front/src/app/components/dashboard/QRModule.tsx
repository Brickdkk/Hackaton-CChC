import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, QrCode, Download, RefreshCw, Users } from "lucide-react";

interface QRModuleProps {
  onBack: () => void;
}

export function QRModule({ onBack }: QRModuleProps) {
  const [qrGenerated, setQrGenerated] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrGenerated && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [qrGenerated, countdown]);

  const generateQR = () => {
    setQrGenerated(true);
    setCountdown(300);
    
    // Simple QR code simulation using canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 300, 300);

    // Draw simple QR-like pattern
    ctx.fillStyle = '#0A2342';
    const blockSize = 10;
    
    // Generate random pattern that looks like a QR code
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
        }
      }
    }

    // Draw corner markers
    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = '#0A2342';
      ctx.fillRect(x, y, 70, 70);
      ctx.fillStyle = 'white';
      ctx.fillRect(x + 10, y + 10, 50, 50);
      ctx.fillStyle = '#0A2342';
      ctx.fillRect(x + 20, y + 20, 30, 30);
    };

    drawCorner(0, 0);
    drawCorner(230, 0);
    drawCorner(0, 230);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const todayAttendance = [
    { name: 'Juan Pérez', rut: '12.345.678-9', time: '07:45', status: 'Presente' },
    { name: 'María González', rut: '11.234.567-8', time: '07:52', status: 'Presente' },
    { name: 'Carlos Rojas', rut: '13.456.789-0', time: '08:01', status: 'Presente' },
    { name: 'Ana Martínez', rut: '14.567.890-1', time: '08:05', status: 'Presente' },
    { name: 'Pedro Silva', rut: '15.678.901-2', time: '08:12', status: 'Presente' }
  ];

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container mx-auto max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
          style={{ color: 'var(--navy-deep)' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Generator */}
          <Card className="border-2" style={{ borderColor: 'var(--navy-deep)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ color: 'var(--navy-deep)' }}>Generador de QR</CardTitle>
                  <CardDescription>Código QR para registro de asistencia</CardDescription>
                </div>
                {qrGenerated && (
                  <Badge 
                    className="text-white"
                    style={{ backgroundColor: countdown > 60 ? '#4CAF50' : '#FF6B35' }}
                  >
                    {formatTime(countdown)}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {!qrGenerated ? (
                  <div className="text-center py-12">
                    <div 
                      className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4"
                      style={{ backgroundColor: 'var(--navy-deep)' + '15' }}
                    >
                      <QrCode className="w-12 h-12" style={{ color: 'var(--navy-deep)' }} />
                    </div>
                    <h3 className="text-xl mb-2" style={{ color: 'var(--navy-deep)' }}>
                      Genera un Código QR
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Los trabajadores podrán escanear este código para marcar su asistencia
                    </p>
                    <Button 
                      className="text-white px-8"
                      style={{ backgroundColor: 'var(--orange-action)' }}
                      onClick={generateQR}
                    >
                      <QrCode className="w-5 h-5 mr-2" />
                      Generar QR de Ingreso
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="p-6 bg-white rounded-lg shadow-lg">
                        <canvas
                          ref={canvasRef}
                          width={300}
                          height={300}
                          className="border-4"
                          style={{ borderColor: 'var(--navy-deep)' }}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="mb-2" style={{ color: 'var(--navy-deep)' }}>
                        Código Activo - Obra Edificio Los Andes
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Fecha: 19/12/2025 | Turno: Mañana
                      </p>
                      <p className="text-sm" style={{ color: countdown > 60 ? '#4CAF50' : '#FF6B35' }}>
                        Expira en: {formatTime(countdown)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline"
                        onClick={generateQR}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerar
                      </Button>
                      <Button 
                        className="text-white"
                        style={{ backgroundColor: 'var(--navy-deep)' }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>

                    {countdown === 0 && (
                      <div className="p-3 rounded-lg text-center" style={{ backgroundColor: '#FFEBEE' }}>
                        <p className="text-sm" style={{ color: '#D32F2F' }}>
                          El código ha expirado. Genera uno nuevo para continuar.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Attendance List */}
          <Card className="border-2" style={{ borderColor: 'var(--gray-structure)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ color: 'var(--navy-deep)' }}>Asistencia de Hoy</CardTitle>
                  <CardDescription>Registros del turno actual</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" style={{ color: 'var(--navy-deep)' }} />
                  <span className="text-2xl" style={{ color: 'var(--navy-deep)' }}>
                    {todayAttendance.length}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {todayAttendance.map((worker, index) => (
                  <div 
                    key={index}
                    className="p-3 border-2 rounded-lg"
                    style={{ borderColor: 'var(--gray-structure)' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="mb-1" style={{ color: 'var(--navy-deep)' }}>
                          {worker.name}
                        </h4>
                        <p className="text-sm text-gray-600">RUT: {worker.rut}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm mb-1" style={{ color: 'var(--navy-deep)' }}>
                          {worker.time}
                        </p>
                        <Badge 
                          className="text-white"
                          style={{ backgroundColor: '#4CAF50' }}
                        >
                          {worker.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--gray-structure)' }}>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: 'var(--navy-deep)' }}
                >
                  Ver Registro Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="border-l-4" style={{ borderLeftColor: '#4CAF50' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Presente</p>
                  <p className="text-3xl mt-1" style={{ color: 'var(--navy-deep)' }}>84</p>
                </div>
                <Users className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4" style={{ borderLeftColor: '#FF6B35' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ausentes</p>
                  <p className="text-3xl mt-1" style={{ color: 'var(--navy-deep)' }}>3</p>
                </div>
                <Users className="w-10 h-10" style={{ color: '#FF6B35' }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4" style={{ borderLeftColor: '#FFA726' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tarde</p>
                  <p className="text-3xl mt-1" style={{ color: 'var(--navy-deep)' }}>2</p>
                </div>
                <Users className="w-10 h-10 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <Card className="mt-6 border-2" style={{ borderColor: '#1976D2' }}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#1976D2' + '15' }}
              >
                <QrCode className="w-5 h-5" style={{ color: '#1976D2' }} />
              </div>
              <div>
                <h4 className="mb-1" style={{ color: 'var(--navy-deep)' }}>Instrucciones de Uso</h4>
                <p className="text-sm text-gray-600">
                  Genera un nuevo código QR al inicio de cada turno. Los trabajadores deben escanearlo
                  con la app móvil para registrar su ingreso. El código expira automáticamente después
                  de 5 minutos por seguridad.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
