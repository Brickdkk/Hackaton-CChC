import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { QrCode, AlertCircle, FileText, LogOut, HardHat, Bell } from "lucide-react";
import { QRScannerWorker } from "./worker/QRScannerWorker";
import { ReportIncidentWorker } from "./worker/ReportIncidentWorker";
import { DocumentsWorker } from "./worker/DocumentsWorker";

interface AppTrabajadorProps {
  onLogout: () => void;
}

export function AppTrabajador({ onLogout }: AppTrabajadorProps) {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [workerName] = useState("Juan Pérez");

  const modules = [
    {
      id: 'qr',
      title: 'Marcar Asistencia',
      description: 'Escanear código QR',
      icon: QrCode,
      color: '#4CAF50',
      component: QRScannerWorker
    },
    {
      id: 'incident',
      title: 'Reportar Incidente',
      description: 'Informar situación de riesgo',
      icon: AlertCircle,
      color: '#FF6B35',
      component: ReportIncidentWorker
    },
    {
      id: 'documents',
      title: 'Documentos a Firmar',
      description: 'Revisar y firmar documentos',
      icon: FileText,
      color: '#0A2342',
      badge: '2',
      component: DocumentsWorker
    }
  ];

  if (activeModule) {
    const module = modules.find(m => m.id === activeModule);
    if (module && module.component) {
      const ModuleComponent = module.component;
      return <ModuleComponent onBack={() => setActiveModule(null)} />;
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <header className="text-white shadow-lg" style={{ backgroundColor: 'var(--navy-deep)' }}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl">Hola, {workerName}</h1>
                <p className="text-sm opacity-90">Edificio Los Andes - Piso 12</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="text-white border-white/30 hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Status Card */}
        <Card className="mb-6 border-2" style={{ borderColor: '#4CAF50' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Estado de Hoy</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: '#4CAF50' }}
                  />
                  <span style={{ color: 'var(--navy-deep)' }}>Asistencia Registrada</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Hora de ingreso: 07:45 hrs</p>
              </div>
              <Badge 
                className="text-white"
                style={{ backgroundColor: '#4CAF50' }}
              >
                Activo
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-gray-600 mb-1">Días Trabajados</p>
              <p className="text-3xl" style={{ color: 'var(--navy-deep)' }}>47</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-gray-600 mb-1">Sin Incidentes</p>
              <p className="text-3xl text-green-500">47</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <h2 className="text-lg mb-4" style={{ color: 'var(--navy-deep)' }}>Acciones Rápidas</h2>
          
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card 
                key={module.id}
                className="border-2 hover:shadow-lg transition-all cursor-pointer"
                style={{ borderColor: 'var(--gray-structure)' }}
                onClick={() => setActiveModule(module.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-4 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: module.color + '15' }}
                    >
                      <Icon className="w-8 h-8" style={{ color: module.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="mb-1" style={{ color: 'var(--navy-deep)' }}>
                            {module.title}
                          </h3>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                        {module.badge && (
                          <Badge 
                            className="text-white ml-2"
                            style={{ backgroundColor: module.color }}
                          >
                            {module.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Safety Tips */}
        <Card className="mt-6 border-2" style={{ borderColor: '#FF6B35' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Recordatorio de Seguridad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div 
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: '#FF6B35' }}
                />
                <p>Usa siempre tu arnés y línea de vida en altura</p>
              </div>
              <div className="flex items-start gap-2">
                <div 
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: '#FF6B35' }}
                />
                <p>Verifica que tus EPP estén en buen estado</p>
              </div>
              <div className="flex items-start gap-2">
                <div 
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: '#FF6B35' }}
                />
                <p>Reporta cualquier condición insegura inmediatamente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Process Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Proceso de Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Actividad Principal</p>
                <p style={{ color: 'var(--navy-deep)' }}>Hormigonado Losa - Piso 12</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Riesgos Principales</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Caída de altura</Badge>
                  <Badge variant="outline">Contacto eléctrico</Badge>
                  <Badge variant="outline">Exposición a ruido</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">EPP Requerido</p>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    className="text-white"
                    style={{ backgroundColor: 'var(--navy-deep)' }}
                  >
                    Casco
                  </Badge>
                  <Badge 
                    className="text-white"
                    style={{ backgroundColor: 'var(--navy-deep)' }}
                  >
                    Arnés
                  </Badge>
                  <Badge 
                    className="text-white"
                    style={{ backgroundColor: 'var(--navy-deep)' }}
                  >
                    Zapatos de seguridad
                  </Badge>
                  <Badge 
                    className="text-white"
                    style={{ backgroundColor: 'var(--navy-deep)' }}
                  >
                    Guantes
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
