import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Upload, FileText, CheckCircle2, X } from "lucide-react";

interface UploadModuleProps {
  onBack: () => void;
}

interface UploadedFile {
  id: number;
  name: string;
  type: string;
  category: string;
  date: string;
  size: string;
}

export function UploadModule({ onBack }: UploadModuleProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: 1,
      name: 'Procedimiento_Trabajo_Altura.pdf',
      type: 'Procedimiento',
      category: 'Seguridad',
      date: '18/12/2025',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Charla_Seguridad_Diaria.pdf',
      type: 'Charla',
      category: 'Capacitación',
      date: '17/12/2025',
      size: '1.1 MB'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const handleFileUpload = () => {
    // Simulate file upload
    const newFile: UploadedFile = {
      id: uploadedFiles.length + 1,
      name: 'Nuevo_Documento.pdf',
      type: selectedType || 'Documento',
      category: selectedCategory || 'General',
      date: new Date().toLocaleDateString('es-CL'),
      size: '1.5 MB'
    };
    setUploadedFiles([newFile, ...uploadedFiles]);
    setSelectedCategory("");
    setSelectedType("");
  };

  const handleRemove = (id: number) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  const categories = [
    'Seguridad',
    'Capacitación',
    'Protocolos MINSAL',
    'Inspecciones',
    'Procedimientos',
    'General'
  ];

  const documentTypes = [
    'Procedimiento',
    'Charla',
    'Inspección',
    'Protocolo',
    'ATS',
    'Observación',
    'Reporte',
    'Otro'
  ];

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
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Carga de Documentos</CardTitle>
            <CardDescription>
              Sube archivos que requieren firma digital de trabajadores o equipo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Upload Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoría del Documento</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Documento</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Drop Zone */}
              <div 
                className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ borderColor: 'var(--navy-deep)' }}
              >
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ backgroundColor: 'var(--navy-deep)' + '15' }}
                >
                  <Upload className="w-8 h-8" style={{ color: 'var(--navy-deep)' }} />
                </div>
                <h3 className="text-lg mb-2" style={{ color: 'var(--navy-deep)' }}>
                  Arrastra archivos aquí o haz clic para seleccionar
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Formatos aceptados: PDF, DOC, DOCX, XLS, XLSX (Máx. 10 MB)
                </p>
                <Button 
                  className="text-white"
                  style={{ backgroundColor: 'var(--orange-action)' }}
                  onClick={handleFileUpload}
                  disabled={!selectedCategory || !selectedType}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Seleccionar Archivo
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border-2" style={{ borderColor: 'var(--gray-structure)' }}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded"
                      style={{ backgroundColor: '#1976D2' + '15' }}
                    >
                      <FileText className="w-5 h-5" style={{ color: '#1976D2' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Documentos</p>
                      <p className="text-xl" style={{ color: 'var(--navy-deep)' }}>
                        {uploadedFiles.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-2" style={{ borderColor: 'var(--gray-structure)' }}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded"
                      style={{ backgroundColor: '#4CAF50' + '15' }}
                    >
                      <CheckCircle2 className="w-5 h-5" style={{ color: '#4CAF50' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Firmados</p>
                      <p className="text-xl" style={{ color: 'var(--navy-deep)' }}>24</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-2" style={{ borderColor: 'var(--gray-structure)' }}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded"
                      style={{ backgroundColor: '#FF6B35' + '15' }}
                    >
                      <Upload className="w-5 h-5" style={{ color: '#FF6B35' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pendientes</p>
                      <p className="text-xl" style={{ color: 'var(--navy-deep)' }}>5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files List */}
        <Card className="border-2" style={{ borderColor: 'var(--gray-structure)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Documentos Recientes</CardTitle>
            <CardDescription>Archivos subidos recientemente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay documentos cargados aún</p>
                </div>
              ) : (
                uploadedFiles.map((file) => (
                  <div 
                    key={file.id}
                    className="p-4 border-2 rounded-lg hover:shadow-md transition-all"
                    style={{ borderColor: 'var(--gray-structure)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div 
                          className="p-2 rounded"
                          style={{ backgroundColor: 'var(--navy-deep)' + '15' }}
                        >
                          <FileText className="w-5 h-5" style={{ color: 'var(--navy-deep)' }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-2" style={{ color: 'var(--navy-deep)' }}>
                            {file.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline">{file.type}</Badge>
                            <Badge variant="outline">{file.category}</Badge>
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>Fecha: {file.date}</span>
                            <span>Tamaño: {file.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="text-white"
                          style={{ backgroundColor: 'var(--navy-deep)' }}
                        >
                          Ver
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemove(file.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="mt-6 border-2" style={{ borderColor: '#1976D2' }}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#1976D2' + '15' }}
              >
                <Upload className="w-5 h-5" style={{ color: '#1976D2' }} />
              </div>
              <div>
                <h4 className="mb-1" style={{ color: 'var(--navy-deep)' }}>
                  Gestión de Documentos
                </h4>
                <p className="text-sm text-gray-600">
                  Los documentos subidos aquí estarán disponibles para firma digital.
                  Una vez cargados, aparecerán en el módulo de "Firma Digital" para que
                  los trabajadores y prevencionistas puedan revisarlos y firmarlos digitalmente.
                  Todos los archivos quedan registrados con fecha, hora y usuario que los cargó.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}