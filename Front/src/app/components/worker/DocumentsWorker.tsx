import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, FileText, Eye, PenTool, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface DocumentsWorkerProps {
  onBack: () => void;
}

export function DocumentsWorker({ onBack }: DocumentsWorkerProps) {
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const documents = [
    {
      id: 1,
      title: 'Charla de Seguridad - Hormigonado Losa',
      type: 'Charla',
      date: '19/12/2025',
      area: 'Obra Gruesa'
    },
    {
      id: 2,
      title: 'Recepción de EPP - Diciembre',
      type: 'Recepción',
      date: '18/12/2025',
      area: 'General'
    }
  ];

  const handleSign = () => {
    setSelectedDoc(null);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 2500);
  };

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

        <Card className="mb-6 border-2" style={{ borderColor: 'var(--navy-deep)' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle style={{ color: 'var(--navy-deep)' }}>Documentos Pendientes</CardTitle>
                <CardDescription>Revisa y firma los documentos</CardDescription>
              </div>
              <Badge 
                className="text-white"
                style={{ backgroundColor: '#FF6B35' }}
              >
                {documents.length}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {documents.map((doc) => (
            <Card 
              key={doc.id}
              className="border-2"
              style={{ borderColor: 'var(--gray-structure)' }}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div 
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: 'var(--navy-deep)' + '15' }}
                    >
                      <FileText className="w-5 h-5" style={{ color: 'var(--navy-deep)' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2" style={{ color: 'var(--navy-deep)' }}>{doc.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">{doc.type}</Badge>
                        <Badge variant="outline">{doc.area}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Fecha: {doc.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedDoc(doc.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                    <Button 
                      className="flex-1 text-white"
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

        {/* Info */}
        <Card className="mt-6" style={{ backgroundColor: '#E3F2FD' }}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#1976D2' }} />
              <div>
                <h4 className="text-sm mb-1" style={{ color: '#1976D2' }}>
                  Sobre las Firmas
                </h4>
                <p className="text-xs text-gray-700">
                  Al firmar, confirmas que participaste en la actividad o recibiste el elemento.
                  Tu firma digital tiene validez legal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={selectedDoc !== null} onOpenChange={() => setSelectedDoc(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle style={{ color: 'var(--navy-deep)' }}>
                {documents.find(d => d.id === selectedDoc)?.title}
              </DialogTitle>
              <DialogDescription>
                Revisa el documento antes de firmarlo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div 
                className="border-2 rounded-lg p-6 min-h-[300px]"
                style={{ borderColor: 'var(--gray-structure)', backgroundColor: 'white' }}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg mb-2" style={{ color: 'var(--navy-deep)' }}>
                      {documents.find(d => d.id === selectedDoc)?.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Fecha: {documents.find(d => d.id === selectedDoc)?.date}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><strong>Área:</strong> {documents.find(d => d.id === selectedDoc)?.area}</p>
                    <p><strong>Responsable:</strong> Juan Martínez - Prevencionista</p>
                  </div>

                  <div className="p-4 rounded" style={{ backgroundColor: 'var(--gray-structure)' }}>
                    <h4 className="text-sm mb-2" style={{ color: 'var(--navy-deep)' }}>Contenido</h4>
                    <p className="text-xs text-gray-700">
                      Este documento certifica tu participación en la actividad de seguridad.
                      Al firmar, confirmas que comprendes los riesgos y medidas de control
                      correspondientes al proceso de trabajo del día.
                    </p>
                  </div>

                  <div className="p-3 border-2 rounded" style={{ borderColor: 'var(--navy-deep)' }}>
                    <p className="text-xs text-gray-600 mb-2">Tu firma digital:</p>
                    <div className="h-16 flex items-center justify-center" style={{ backgroundColor: 'white' }}>
                      <p className="text-gray-400 italic text-xs">Firma digital asignada</p>
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
                  onClick={handleSign}
                >
                  <PenTool className="w-4 h-4 mr-2" />
                  Firmar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-sm">
            <div className="text-center py-6">
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: '#4CAF50' }}
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-2" style={{ color: 'var(--navy-deep)' }}>
                ¡Documento Firmado!
              </h3>
              <p className="text-gray-600">Tu firma ha sido registrada correctamente</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
