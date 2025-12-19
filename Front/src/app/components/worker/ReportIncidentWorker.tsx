import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, AlertCircle, CheckCircle2, Camera } from "lucide-react";

interface ReportIncidentWorkerProps {
  onBack: () => void;
}

export function ReportIncidentWorker({ onBack }: ReportIncidentWorkerProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedObra, setSelectedObra] = useState("");
  const [selectedSeccion, setSelectedSeccion] = useState("");
  const [description, setDescription] = useState("");

  const obras = [
    "Edificio Los Andes",
    "Edificio Los Robles",
    "Proyecto Vista Mar",
    "Complejo Industrial Norte"
  ];

  const secciones = [
    "Piso 12 - Sector Norte",
    "Piso 12 - Sector Sur",
    "Piso 11 - Obra Gruesa",
    "Piso 10 - Terminaciones",
    "Bodega Principal",
    "Área de Acopio",
    "Subterráneo - Estacionamiento"
  ];

  const handleSubmit = () => {
    setStep(3);
    setTimeout(() => {
      onBack();
    }, 3000);
  };

  if (step === 3) {
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
              ¡Reporte Enviado!
            </h2>
            <p className="text-gray-600 mb-4">
              Tu reporte ha sido recibido y será revisado por el equipo de prevención
            </p>
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#E3F2FD' }}>
              <p className="text-sm text-gray-700">
                Número de reporte: <strong>INC-{Math.floor(Math.random() * 1000)}</strong>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                Fecha: {new Date().toLocaleDateString('es-CL')}
              </p>
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

        <Card className="border-2" style={{ borderColor: '#FF6B35' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#FF6B35' + '15' }}
              >
                <AlertCircle className="w-6 h-6" style={{ color: '#FF6B35' }} />
              </div>
              <div>
                <CardTitle style={{ color: 'var(--navy-deep)' }}>Reportar Incidente</CardTitle>
                <CardDescription>
                  {step === 1 ? "Paso 1 de 2: Ubicación" : "Paso 2 de 2: Descripción"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Obra</Label>
                  <Select value={selectedObra} onValueChange={setSelectedObra}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la obra" />
                    </SelectTrigger>
                    <SelectContent>
                      {obras.map((obra) => (
                        <SelectItem key={obra} value={obra}>
                          {obra}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sección / Lugar</Label>
                  <Select value={selectedSeccion} onValueChange={setSelectedSeccion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la sección" />
                    </SelectTrigger>
                    <SelectContent>
                      {secciones.map((seccion) => (
                        <SelectItem key={seccion} value={seccion}>
                          {seccion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: '#FF6B35' }}
                  onClick={() => setStep(2)}
                  disabled={!selectedObra || !selectedSeccion}
                >
                  Continuar
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#E8E8E8' }}>
                  <p className="text-sm text-gray-600 mb-1">Ubicación seleccionada:</p>
                  <p className="text-sm" style={{ color: 'var(--navy-deep)' }}>
                    {selectedObra} - {selectedSeccion}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Reporte</Label>
                  <Select defaultValue="condicion-insegura">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="condicion-insegura">Condición Insegura</SelectItem>
                      <SelectItem value="acto-inseguro">Acto Inseguro</SelectItem>
                      <SelectItem value="casi-accidente">Casi Accidente</SelectItem>
                      <SelectItem value="accidente">Accidente</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Descripción del Incidente</Label>
                  <Textarea 
                    placeholder="Describe lo que observaste o sucedió..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Sé lo más específico posible sobre lo que observaste
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Agregar Foto (Opcional)</Label>
                  <div 
                    className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
                    style={{ borderColor: 'var(--gray-structure)' }}
                  >
                    <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Toca para tomar una foto</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gravedad Estimada</Label>
                  <Select defaultValue="media">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja - Sin peligro inmediato</SelectItem>
                      <SelectItem value="media">Media - Requiere atención</SelectItem>
                      <SelectItem value="alta">Alta - Peligro inminente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Atrás
                  </Button>
                  <Button 
                    className="flex-1 text-white"
                    style={{ backgroundColor: '#FF6B35' }}
                    onClick={handleSubmit}
                    disabled={!description.trim()}
                  >
                    Enviar Reporte
                  </Button>
                </div>
              </div>
            )}

            {/* Info Box */}
            <Card style={{ backgroundColor: '#FFF3E0' }}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF6B35' }} />
                  <div>
                    <h4 className="text-sm mb-1" style={{ color: '#FF6B35' }}>
                      Importante
                    </h4>
                    <p className="text-xs text-gray-700">
                      {step === 1 
                        ? "Si el incidente requiere atención inmediata, contacta directamente al prevencionista o supervisor."
                        : "Tu reporte es anónimo y ayuda a mejorar la seguridad de todos en la obra."
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
