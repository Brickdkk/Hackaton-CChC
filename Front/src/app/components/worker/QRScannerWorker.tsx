import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Camera, CheckCircle2, QrCode } from "lucide-react";

interface QRScannerWorkerProps {
  onBack: () => void;
}

export function QRScannerWorker({ onBack }: QRScannerWorkerProps) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const startScanning = () => {
    setScanning(true);
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2000);
  };

  useEffect(() => {
    if (scanned) {
      const timer = setTimeout(() => {
        onBack();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanned, onBack]);

  if (scanned) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F5F5F5' }}>
        <Card className="max-w-md w-full border-2" style={{ borderColor: '#4CAF50' }}>
          <CardContent className="pt-12 pb-12 text-center">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ backgroundColor: '#4CAF50' }}
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl mb-3" style={{ color: 'var(--navy-deep)' }}>
              ¡Asistencia Registrada!
            </h2>
            <p className="text-gray-600 mb-4">
              Tu ingreso ha sido marcado correctamente
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Obra:</strong> Edificio Los Andes</p>
              <p><strong>Hora:</strong> {new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</p>
              <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-CL')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container mx-auto max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
          style={{ color: 'var(--navy-deep)' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <Card className="border-2" style={{ borderColor: 'var(--navy-deep)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Marcar Asistencia</CardTitle>
            <CardDescription>Escanea el código QR para registrar tu ingreso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!scanning ? (
              <div className="text-center py-8">
                <div 
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
                  style={{ backgroundColor: '#4CAF50' + '15' }}
                >
                  <QrCode className="w-12 h-12" style={{ color: '#4CAF50' }} />
                </div>
                <h3 className="text-xl mb-3" style={{ color: 'var(--navy-deep)' }}>
                  Activa la Cámara
                </h3>
                <p className="text-gray-600 mb-6">
                  Apunta tu cámara al código QR que el prevencionista tiene en pantalla
                </p>
                <Button 
                  className="text-white px-8"
                  style={{ backgroundColor: '#4CAF50' }}
                  onClick={startScanning}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Abrir Cámara
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  ref={videoRef}
                  className="aspect-square rounded-lg border-4 flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    borderColor: '#4CAF50',
                    backgroundColor: '#000'
                  }}
                >
                  {/* Scanner Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-4 border-white/50 rounded-lg relative">
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 bg-green-400 animate-pulse"
                        style={{
                          animation: 'scan 2s ease-in-out infinite'
                        }}
                      />
                      {/* Corner markers */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400" />
                    </div>
                  </div>
                  <p className="text-white text-sm absolute bottom-4">
                    Escaneando...
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Centra el código QR en el recuadro
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setScanning(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            {/* Instructions */}
            <Card style={{ backgroundColor: '#E3F2FD' }}>
              <CardContent className="pt-4">
                <h4 className="text-sm mb-2" style={{ color: '#1976D2' }}>
                  Instrucciones:
                </h4>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>1. Solicita al prevencionista que genere el código QR</li>
                  <li>2. Apunta tu cámara al código en pantalla</li>
                  <li>3. Espera la confirmación de registro</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <style>{`
          @keyframes scan {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(250px);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
