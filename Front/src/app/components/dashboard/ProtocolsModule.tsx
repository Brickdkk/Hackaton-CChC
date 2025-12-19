import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, FolderOpen, FileText, Download } from "lucide-react";

interface ProtocolsModuleProps {
  onBack: () => void;
}

export function ProtocolsModule({ onBack }: ProtocolsModuleProps) {
  const protocols = [
    {
      id: 'planesi',
      name: 'PLANESI',
      fullName: 'Plan Específico de Seguridad e Higiene',
      description: 'Documento maestro de seguridad de la obra',
      documents: 12,
      lastUpdate: '15/12/2025',
      color: '#0A2342'
    },
    {
      id: 'prexor',
      name: 'PREXOR',
      fullName: 'Programa de Exámenes Ocupacionales',
      description: 'Control de exámenes médicos de trabajadores',
      documents: 8,
      lastUpdate: '18/12/2025',
      color: '#1976D2'
    },
    {
      id: 'uv',
      name: 'Radiación UV',
      fullName: 'Protocolo de Radiación Ultravioleta',
      description: 'Medidas de protección solar',
      documents: 5,
      lastUpdate: '10/12/2025',
      color: '#FF6B35'
    },
    {
      id: 'tmert',
      name: 'TMERT',
      fullName: 'Trastornos Musculoesqueléticos',
      description: 'Prevención de lesiones ergonómicas',
      documents: 6,
      lastUpdate: '12/12/2025',
      color: '#388E3C'
    },
    {
      id: 'psicosocial',
      name: 'Riesgo Psicosocial',
      fullName: 'Protocolo de Vigilancia de Riesgos Psicosociales',
      description: 'Evaluación y control de factores psicosociales',
      documents: 7,
      lastUpdate: '08/12/2025',
      color: '#7B1FA2'
    },
    {
      id: 'covid',
      name: 'COVID-19 / Otros',
      fullName: 'Protocolos Sanitarios y Otros',
      description: 'Medidas sanitarias y protocolos adicionales',
      documents: 9,
      lastUpdate: '19/12/2025',
      color: '#F57C00'
    }
  ];

  const sampleDocuments = [
    'Procedimiento de trabajo seguro - Altura',
    'Matriz de identificación de peligros',
    'Listado de EPP por área',
    'Registro de charlas de seguridad',
    'Certificados de equipos'
  ];

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

        <Card className="mb-6 border-2" style={{ borderColor: 'var(--navy-deep)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Protocolos MINSAL</CardTitle>
            <CardDescription>
              Gestión documental de los 6 protocolos obligatorios del Ministerio de Salud
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protocols.map((protocol) => (
            <Card 
              key={protocol.id}
              className="border-2 hover:shadow-lg transition-all"
              style={{ borderColor: 'var(--gray-structure)' }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: protocol.color + '15' }}
                  >
                    <FolderOpen className="w-6 h-6" style={{ color: protocol.color }} />
                  </div>
                  <Badge 
                    className="text-white"
                    style={{ backgroundColor: protocol.color }}
                  >
                    {protocol.documents} docs
                  </Badge>
                </div>
                <CardTitle style={{ color: 'var(--navy-deep)' }}>
                  {protocol.name}
                </CardTitle>
                <CardDescription>{protocol.fullName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{protocol.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Última actualización:</span>
                    <span style={{ color: 'var(--navy-deep)' }}>{protocol.lastUpdate}</span>
                  </div>
                  <Button 
                    className="w-full text-white"
                    style={{ backgroundColor: protocol.color }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Documentos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vista Previa de Documentos */}
        <Card className="mt-6 border-2" style={{ borderColor: 'var(--gray-structure)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--navy-deep)' }}>Documentos Recientes</CardTitle>
            <CardDescription>Últimos archivos agregados al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sampleDocuments.map((doc, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  style={{ borderColor: 'var(--gray-structure)' }}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm" style={{ color: 'var(--navy-deep)' }}>{doc}</p>
                      <p className="text-xs text-gray-500">Actualizado hace {index + 1} día(s)</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="mt-6 border-2" style={{ borderColor: '#1976D2' }}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#1976D2' + '15' }}
              >
                <FileText className="w-5 h-5" style={{ color: '#1976D2' }} />
              </div>
              <div>
                <h4 className="mb-1" style={{ color: 'var(--navy-deep)' }}>Normativa Vigente</h4>
                <p className="text-sm text-gray-600">
                  Todos los protocolos deben estar actualizados según el D.S. 594 y normativa MINSAL vigente.
                  La revisión debe realizarse al menos una vez al año o cuando cambien las condiciones de la obra.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
