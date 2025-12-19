import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  AlertTriangle, 
  Shield, 
  BarChart3, 
  FolderOpen, 
  PenTool, 
  QrCode, 
  Upload,
  LogOut,
  FileText,
  Camera,
  CheckCircle2,
  HardHat,
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { IncidentModule } from "./dashboard/IncidentModule";
import { RiskModule } from "./dashboard/RiskModule";
import { AnalyticsModule } from "./dashboard/AnalyticsModule";
import { ProtocolsModule } from "./dashboard/ProtocolsModule";
import { SignatureModule } from "./dashboard/SignatureModule";
import { QRModule } from "./dashboard/QRModule";
import { UploadModule } from "./dashboard/UploadModule";

interface DashboardPrevencionistaProps {
  onLogout: () => void;
}

export function DashboardPrevencionista({ onLogout }: DashboardPrevencionistaProps) {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'incidents',
      title: 'Gestión de Incidentes',
      description: 'Revisar y documentar incidentes de terreno',
      icon: AlertTriangle,
      color: '#FF6B35',
      badge: '3',
      component: IncidentModule
    },
    {
      id: 'risks',
      title: 'Riesgos y MPR',
      description: 'Matriz de riesgos y procesos constructivos',
      icon: Shield,
      color: '#0A2342',
      component: RiskModule
    },
    {
      id: 'analytics',
      title: 'Analítica de Seguridad',
      description: 'Tasa de accidentabilidad y métricas',
      icon: BarChart3,
      color: '#1976D2',
      component: AnalyticsModule
    },
    {
      id: 'protocols',
      title: 'Protocolos MINSAL',
      description: '6 carpetas de protocolos regulatorios',
      icon: FolderOpen,
      color: '#388E3C',
      badge: '6',
      component: ProtocolsModule
    },
    {
      id: 'signature',
      title: 'Firma Digital',
      description: 'Documentos pendientes de firma',
      icon: PenTool,
      color: '#7B1FA2',
      badge: '5',
      component: SignatureModule
    },
    {
      id: 'qr',
      title: 'Control de Asistencia (QR)',
      description: 'Generar códigos QR para ingreso',
      icon: QrCode,
      color: '#00796B',
      component: QRModule
    },
    {
      id: 'upload',
      title: 'Carga de Documentos',
      description: 'Subir archivos para firma',
      icon: Upload,
      color: '#F57C00',
      component: UploadModule
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HardHat className="w-8 h-8" />
              <div>
                <h1 className="text-2xl">Safe Community</h1>
                <p className="text-sm opacity-90">Panel del Prevencionista</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm opacity-90">Obra Actual</p>
                <p>Edificio Los Andes - Piso 12</p>
              </div>
              <Button 
                variant="outline" 
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

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4" style={{ borderLeftColor: '#4CAF50' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Días sin Accidentes</p>
                  <p className="text-3xl mt-1" style={{ color: 'var(--navy-deep)' }}>47</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4" style={{ borderLeftColor: '#FF6B35' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Incidentes Pendientes</p>
                  <p className="text-3xl mt-1" style={{ color: 'var(--navy-deep)' }}>3</p>
                </div>
                <AlertCircle className="w-10 h-10" style={{ color: '#FF6B35' }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4" style={{ borderLeftColor: '#1976D2' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Trabajadores Hoy</p>
                  <p className="text-3xl mt-1" style={{ color: 'var(--navy-deep)' }}>84</p>
                </div>
                <HardHat className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4" style={{ borderLeftColor: '#7B1FA2' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Docs. por Firmar</p>
                  <p className="text-3xl mt-1" style={{ color: 'var(--navy-deep)' }}>5</p>
                </div>
                <FileText className="w-10 h-10 text-purple-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card 
                key={module.id}
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-opacity-100"
                style={{ borderColor: 'var(--gray-structure)' }}
                onClick={() => setActiveModule(module.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: module.color + '15' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: module.color }} />
                    </div>
                    {module.badge && (
                      <Badge 
                        className="text-white"
                        style={{ backgroundColor: module.color }}
                      >
                        {module.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4" style={{ color: 'var(--navy-deep)' }}>
                    {module.title}
                  </CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full text-white"
                    style={{ backgroundColor: module.color }}
                  >
                    Abrir Módulo
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Today's Process Info */}
        <Card className="mt-6 border-2" style={{ borderColor: 'var(--navy-deep)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>
              Proceso Constructivo Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--orange-action)' + '15' }}
              >
                <TrendingUp className="w-8 h-8" style={{ color: 'var(--orange-action)' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-1">Hormigonado Losa - Piso 12</h3>
                <p className="text-gray-600">Inicio: 08:00 hrs | Estimación de término: 16:00 hrs</p>
                <div className="flex gap-2 mt-2">
                  <Badge style={{ backgroundColor: '#4CAF50', color: 'white' }}>En Progreso</Badge>
                  <Badge variant="outline">Alta Prioridad</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Avance</p>
                <p className="text-2xl" style={{ color: 'var(--navy-deep)' }}>65%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
