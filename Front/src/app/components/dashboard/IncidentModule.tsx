import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { ArrowLeft, Camera, CheckCircle2, AlertTriangle } from "lucide-react";

interface IncidentModuleProps {
  onBack: () => void;
}

export function IncidentModule({ onBack }: IncidentModuleProps) {
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null);

  const incidents = [
    {
      id: 1,
      title: "Caída desde andamio - Piso 8",
      date: "2025-12-18",
      severity: "Alto",
      status: "Pendiente",
      worker: "Juan Pérez"
    },
    {
      id: 2,
      title: "Contacto con herramienta eléctrica",
      date: "2025-12-17",
      severity: "Medio",
      status: "Pendiente",
      worker: "Carlos Rojas"
    },
    {
      id: 3,
      title: "Tropiezo con material en piso",
      date: "2025-12-16",
      severity: "Bajo",
      status: "Pendiente",
      worker: "María González"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Alto": return "#D32F2F";
      case "Medio": return "#FF6B35";
      case "Bajo": return "#FFA726";
      default: return "#9E9E9E";
    }
  };

  if (selectedIncident !== null) {
    const incident = incidents.find(i => i.id === selectedIncident);
    
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="container mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedIncident(null)}
            className="mb-4"
            style={{ color: 'var(--navy-deep)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Lista
          </Button>

          <Card className="border-2" style={{ borderColor: 'var(--gray-structure)' }}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle style={{ color: 'var(--navy-deep)' }}>
                    Informe de Investigación de Accidente
                  </CardTitle>
                  <CardDescription>Incidente #{incident?.id} - {incident?.title}</CardDescription>
                </div>
                <Badge style={{ backgroundColor: getSeverityColor(incident?.severity || ''), color: 'white' }}>
                  {incident?.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Información General */}
              <div className="space-y-4">
                <h3 className="text-lg" style={{ color: 'var(--navy-deep)' }}>Información General</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Trabajador Afectado</Label>
                    <Input value={incident?.worker} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha del Incidente</Label>
                    <Input value={incident?.date} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Hora del Incidente</Label>
                    <Input placeholder="14:30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ubicación Exacta</Label>
                    <Input placeholder="Ej: Piso 8, Sector Norte" />
                  </div>
                </div>
              </div>

              {/* Descripción del Incidente */}
              <div className="space-y-4">
                <h3 className="text-lg" style={{ color: 'var(--navy-deep)' }}>Descripción del Incidente</h3>
                <div className="space-y-2">
                  <Label>Relato de lo Ocurrido</Label>
                  <Textarea 
                    placeholder="Describe detalladamente cómo ocurrió el incidente..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Lesión</Label>
                  <Input placeholder="Ej: Contusión, Fractura, etc." />
                </div>
                <div className="space-y-2">
                  <Label>Parte del Cuerpo Afectada</Label>
                  <Input placeholder="Ej: Mano derecha, Pierna izquierda" />
                </div>
              </div>

              {/* Causas */}
              <div className="space-y-4">
                <h3 className="text-lg" style={{ color: 'var(--navy-deep)' }}>Análisis de Causas</h3>
                <div className="space-y-2">
                  <Label>Causa Inmediata</Label>
                  <Textarea 
                    placeholder="¿Qué acción o condición causó directamente el incidente?"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Causa Raíz</Label>
                  <Textarea 
                    placeholder="¿Por qué existió esa condición o se realizó esa acción?"
                    rows={2}
                  />
                </div>
              </div>

              {/* Medidas Correctivas */}
              <div className="space-y-4">
                <h3 className="text-lg" style={{ color: 'var(--navy-deep)' }}>Medidas Correctivas</h3>
                <div className="space-y-2">
                  <Label>Acciones Inmediatas Tomadas</Label>
                  <Textarea 
                    placeholder="Describe las medidas inmediatas aplicadas en terreno..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Plan de Acción Preventivo</Label>
                  <Textarea 
                    placeholder="Medidas para evitar que se repita este tipo de incidente..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Evidencia Fotográfica */}
              <div className="space-y-4">
                <h3 className="text-lg" style={{ color: 'var(--navy-deep)' }}>Evidencia Fotográfica</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                      style={{ borderColor: 'var(--gray-structure)' }}
                    >
                      <Camera className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Adjuntar Foto {i}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--gray-structure)' }}>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedIncident(null)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 text-white"
                  style={{ backgroundColor: 'var(--orange-action)' }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Guardar Informe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

        <Card className="border-2" style={{ borderColor: 'var(--gray-structure)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Gestión de Incidentes</CardTitle>
            <CardDescription>Incidentes pendientes de revisión y documentación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incidents.map((incident) => (
                <div 
                  key={incident.id}
                  className="p-4 border-2 rounded-lg hover:shadow-md transition-all cursor-pointer"
                  style={{ borderColor: 'var(--gray-structure)' }}
                  onClick={() => setSelectedIncident(incident.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <AlertTriangle 
                        className="w-5 h-5 mt-1" 
                        style={{ color: getSeverityColor(incident.severity) }}
                      />
                      <div className="flex-1">
                        <h4 className="mb-1" style={{ color: 'var(--navy-deep)' }}>{incident.title}</h4>
                        <p className="text-sm text-gray-600">Trabajador: {incident.worker}</p>
                        <p className="text-sm text-gray-600">Fecha: {incident.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge style={{ backgroundColor: getSeverityColor(incident.severity), color: 'white' }}>
                        {incident.severity}
                      </Badge>
                      <Badge variant="outline">{incident.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
