import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, Shield, AlertTriangle, TrendingUp } from "lucide-react";

interface RiskModuleProps {
  onBack: () => void;
}

export function RiskModule({ onBack }: RiskModuleProps) {
  const mprDaily = {
    date: "19/12/2025",
    process: "Hormigonado Losa - Piso 12",
    responsible: "Juan Martínez - Jefe de Obra",
    status: "Activo"
  };

  const criticalRisks = [
    {
      id: 1,
      risk: "Caída de altura",
      level: "Crítico",
      controls: "Arnés, línea de vida, baranda perimetral",
      status: "Controlado"
    },
    {
      id: 2,
      risk: "Contacto eléctrico",
      level: "Alto",
      controls: "Desconexión energía, señalética, EPP dieléctrico",
      status: "Controlado"
    },
    {
      id: 3,
      risk: "Exposición a ruido",
      level: "Medio",
      controls: "Protección auditiva, rotación personal",
      status: "Controlado"
    },
    {
      id: 4,
      risk: "Atrapamiento por maquinaria",
      level: "Crítico",
      controls: "Señalero, zona demarcada, capacitación",
      status: "Controlado"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Crítico": return "#D32F2F";
      case "Alto": return "#FF6B35";
      case "Medio": return "#FFA726";
      case "Bajo": return "#FDD835";
      default: return "#9E9E9E";
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
          style={{ color: 'var(--navy-deep)' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>

        {/* MPR Diario */}
        <Card className="mb-6 border-2" style={{ borderColor: 'var(--navy-deep)' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--navy-deep)' + '15' }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: 'var(--navy-deep)' }} />
                </div>
                <div>
                  <CardTitle style={{ color: 'var(--navy-deep)' }}>MPR Diario</CardTitle>
                  <CardDescription>Método de Planificación y Revisión</CardDescription>
                </div>
              </div>
              <Badge 
                className="text-white"
                style={{ backgroundColor: '#4CAF50' }}
              >
                {mprDaily.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Fecha</p>
                <p style={{ color: 'var(--navy-deep)' }}>{mprDaily.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Proceso Actual</p>
                <p style={{ color: 'var(--navy-deep)' }}>{mprDaily.process}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Responsable</p>
                <p style={{ color: 'var(--navy-deep)' }}>{mprDaily.responsible}</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#E3F2FD' }}>
              <h4 className="mb-2" style={{ color: 'var(--navy-deep)' }}>Objetivos del Día</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Completar hormigonado losa piso 12 (65% completado)</li>
                <li>✓ Verificar resistencia hormigón piso 11</li>
                <li>✓ Instalación moldajes piso 13</li>
                <li>✓ Inspección equipos de altura</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Riesgos Críticos */}
        <Card className="border-2" style={{ borderColor: 'var(--gray-structure)' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#FF6B35' + '15' }}
              >
                <Shield className="w-6 h-6" style={{ color: '#FF6B35' }} />
              </div>
              <div>
                <CardTitle style={{ color: 'var(--navy-deep)' }}>Riesgos Críticos de Hoy</CardTitle>
                <CardDescription>Identificación y controles aplicados</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalRisks.map((risk) => (
                <div 
                  key={risk.id}
                  className="p-4 border-2 rounded-lg"
                  style={{ borderColor: 'var(--gray-structure)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle 
                        className="w-5 h-5 mt-1" 
                        style={{ color: getLevelColor(risk.level) }}
                      />
                      <div>
                        <h4 className="mb-1" style={{ color: 'var(--navy-deep)' }}>{risk.risk}</h4>
                        <p className="text-sm text-gray-600">{risk.controls}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge style={{ backgroundColor: getLevelColor(risk.level), color: 'white' }}>
                        {risk.level}
                      </Badge>
                      <Badge 
                        className="text-white"
                        style={{ backgroundColor: '#4CAF50' }}
                      >
                        {risk.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--gray-structure)' }}>
              <Button 
                className="w-full text-white"
                style={{ backgroundColor: 'var(--navy-deep)' }}
              >
                Ver Matriz Completa de Riesgos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Proceso Constructivo */}
        <Card className="mt-6 border-2" style={{ borderColor: 'var(--gray-structure)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Proceso Constructivo Actual</CardTitle>
            <CardDescription>Detalle del proceso en ejecución</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg mb-3" style={{ color: 'var(--navy-deep)' }}>Hormigonado Losa Piso 12</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gray-structure)' }}>
                    <p className="text-sm text-gray-600 mb-1">Inicio</p>
                    <p style={{ color: 'var(--navy-deep)' }}>08:00 hrs</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gray-structure)' }}>
                    <p className="text-sm text-gray-600 mb-1">Término Estimado</p>
                    <p style={{ color: 'var(--navy-deep)' }}>16:00 hrs</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gray-structure)' }}>
                    <p className="text-sm text-gray-600 mb-1">Cuadrilla</p>
                    <p style={{ color: 'var(--navy-deep)' }}>12 trabajadores</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gray-structure)' }}>
                    <p className="text-sm text-gray-600 mb-1">Avance</p>
                    <p style={{ color: 'var(--navy-deep)' }}>65%</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-2" style={{ color: 'var(--navy-deep)' }}>Equipos y Maquinaria</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Bomba de Hormigón</Badge>
                  <Badge variant="outline">Vibrador</Badge>
                  <Badge variant="outline">Andamio Certificado</Badge>
                  <Badge variant="outline">Escalera de Acceso</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
