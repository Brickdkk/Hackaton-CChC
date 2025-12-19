import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, FileText, Eye, PenTool, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface SignatureModuleProps {
  onBack: () => void;
}

export function SignatureModule({ onBack }: SignatureModuleProps) {
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const documents = [
    {
      id: 1,
      title: 'Protocolo de Trabajo en Altura - Piso 12',
      type: 'Procedimiento',
      date: '19/12/2025',
      priority: 'Alta',
      area: 'Obra Gruesa'
    },
    {
      id: 2,
      title: 'Charla de Seguridad Diaria - Hormigonado',
      type: 'Charla',
      date: '19/12/2025',
      priority: 'Alta',
      area: 'Obra Gruesa'
    },
    {
      id: 3,
      title: 'Inspección de Equipos de Protección Personal',
      type: 'Inspección',
      date: '18/12/2025',
      priority: 'Media',
      area: 'General'
    },
    {
      id: 4,
      title: 'Análisis de Trabajo Seguro (ATS) - Instalación Eléctrica',
      type: 'ATS',
      date: '18/12/2025',
      priority: 'Alta',
      area: 'Instalaciones'
    },
    {
      id: 5,
      title: 'Reporte de Observación de Seguridad #142',
      type: 'Observación',
      date: '17/12/2025',
      priority: 'Media',
      area: 'Terminaciones'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return '#FF6B35';
      case 'Media': return '#FFA726';
      case 'Baja': return '#66BB6A';
      default: return '#9E9E9E';
    }
  };

  const handleSign = (docId: number) => {
    setSelectedDoc(null);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container mx-auto max-w-5xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
          style={{ color: 'var(--navy-deep)' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>

        <Card className="mb-6 border-2" style={{ borderColor: 'var(--navy-deep)' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle style={{ color: 'var(--navy-deep)' }}>Firma Digital de Documentos</CardTitle>
                <CardDescription>Documentos pendientes de tu firma digital</CardDescription>
              </div>
              <Badge 
                className="text-white text-lg px-4 py-2"
                style={{ backgroundColor: '#FF6B35' }}
              >
                {documents.length} pendientes
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {documents.map((doc) => (
            <Card 
              key={doc.id}
              className="border-2 hover:shadow-md transition-all"
              style={{ borderColor: 'var(--gray-structure)' }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: 'var(--navy-deep)' + '15' }}
                    >
                      <FileText className="w-6 h-6" style={{ color: 'var(--navy-deep)' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2" style={{ color: 'var(--navy-deep)' }}>{doc.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{doc.type}</Badge>
                        <Badge variant="outline">{doc.area}</Badge>
                        <Badge 
                          className="text-white"
                          style={{ backgroundColor: getPriorityColor(doc.priority) }}
                        >
                          {doc.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Fecha: {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedDoc(doc.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                    <Button 
                      className="text-white"
                      style={{ backgroundColor: 'var(--orange-action)' }}
                      onClick={() => setSelectedDoc(doc.id)}
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      Firmar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preview Dialog */}
        <Dialog open={selectedDoc !== null} onOpenChange={() => setSelectedDoc(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle style={{ color: 'var(--navy-deep)' }}>
                {documents.find(d => d.id === selectedDoc)?.title}
              </DialogTitle>
              <DialogDescription>
                Revisa el documento antes de firmarlo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Document Preview Simulation */}
              <div 
                className="border-2 rounded-lg p-8 min-h-[400px]"
                style={{ borderColor: 'var(--gray-structure)', backgroundColor: 'white' }}
              >
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-xl mb-2" style={{ color: 'var(--navy-deep)' }}>
                      {documents.find(d => d.id === selectedDoc)?.title}
                    </h2>
                    <p className="text-gray-600">
                      Fecha: {documents.find(d => d.id === selectedDoc)?.date}
                    </p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <p><strong>Área:</strong> {documents.find(d => d.id === selectedDoc)?.area}</p>
                    <p><strong>Responsable:</strong> Juan Martínez - Prevencionista de Riesgos</p>
                    <p><strong>Trabajadores participantes:</strong> 12 personas</p>
                  </div>

                  <div className="mt-6 p-4 rounded" style={{ backgroundColor: 'var(--gray-structure)' }}>
                    <h3 className="mb-2" style={{ color: 'var(--navy-deep)' }}>Contenido del Documento</h3>
                    <p className="text-sm text-gray-700">
                      Este es un documento de ejemplo que requiere tu firma digital para validar
                      que has revisado y aprobado el contenido según los procedimientos de seguridad
                      establecidos en la obra.
                    </p>
                  </div>

                  <div className="mt-6 p-4 border-2 rounded" style={{ borderColor: 'var(--navy-deep)' }}>
                    <p className="text-sm text-gray-600 mb-2">Firma Digital Asignada:</p>
                    <div className="h-24 flex items-center justify-center" style={{ backgroundColor: 'white' }}>
                      <p className="text-gray-400 italic">Tu firma digital aparecerá aquí</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedDoc(null)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 text-white"
                  style={{ backgroundColor: 'var(--orange-action)' }}
                  onClick={() => selectedDoc && handleSign(selectedDoc)}
                >
                  <PenTool className="w-4 h-4 mr-2" />
                  Confirmar Firma
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent>
            <div className="text-center py-8">
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: '#4CAF50' }}
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-2" style={{ color: 'var(--navy-deep)' }}>Documento Firmado</h3>
              <p className="text-gray-600">Tu firma digital ha sido aplicada correctamente</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Info */}
        <Card className="mt-6 border-2" style={{ borderColor: '#1976D2' }}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#1976D2' + '15' }}
              >
                <PenTool className="w-5 h-5" style={{ color: '#1976D2' }} />
              </div>
              <div>
                <h4 className="mb-1" style={{ color: 'var(--navy-deep)' }}>Sobre la Firma Digital</h4>
                <p className="text-sm text-gray-600">
                  Tu firma digital fue creada durante el proceso de enrolamiento y tiene validez legal
                  según la normativa vigente. Todos los documentos firmados quedan registrados en el sistema.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
