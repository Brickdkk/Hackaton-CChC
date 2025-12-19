import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

interface AnalyticsModuleProps {
  onBack: () => void;
}

export function AnalyticsModule({ onBack }: AnalyticsModuleProps) {
  const accidentRateData = [
    { month: 'Jul', incidents: 2, rate: 1.2 },
    { month: 'Ago', incidents: 3, rate: 1.8 },
    { month: 'Sep', incidents: 1, rate: 0.6 },
    { month: 'Oct', incidents: 4, rate: 2.4 },
    { month: 'Nov', incidents: 2, rate: 1.2 },
    { month: 'Dic', incidents: 1, rate: 0.6 }
  ];

  const incidentTypeData = [
    { name: 'Caídas', value: 35, color: '#FF6B35' },
    { name: 'Contacto Eléctrico', value: 20, color: '#0A2342' },
    { name: 'Golpes', value: 25, color: '#1976D2' },
    { name: 'Atrapamientos', value: 12, color: '#388E3C' },
    { name: 'Otros', value: 8, color: '#9E9E9E' }
  ];

  const workerTrainingData = [
    { category: 'Altura', completed: 78, total: 84 },
    { category: 'Eléctrica', completed: 84, total: 84 },
    { category: 'Emergencias', completed: 70, total: 84 },
    { category: 'EPP', completed: 84, total: 84 },
    { category: 'Excavaciones', completed: 45, total: 84 }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KPIs */}
          <Card className="lg:col-span-2 border-2" style={{ borderColor: 'var(--navy-deep)' }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--navy-deep)' }}>Indicadores Clave de Seguridad</CardTitle>
              <CardDescription>Métricas principales del último período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#4CAF50' + '15' }}>
                  <p className="text-sm mb-1" style={{ color: '#388E3C' }}>Días sin Accidentes</p>
                  <p className="text-3xl" style={{ color: '#388E3C' }}>47</p>
                  <div className="flex items-center gap-1 text-sm mt-1" style={{ color: '#388E3C' }}>
                    <TrendingUp className="w-4 h-4" />
                    <span>+12 días vs mes anterior</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#FF6B35' + '15' }}>
                  <p className="text-sm mb-1" style={{ color: '#FF6B35' }}>Tasa de Accidentabilidad</p>
                  <p className="text-3xl" style={{ color: '#FF6B35' }}>0.6</p>
                  <div className="flex items-center gap-1 text-sm mt-1" style={{ color: '#4CAF50' }}>
                    <TrendingDown className="w-4 h-4" />
                    <span>-50% vs mes anterior</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#1976D2' + '15' }}>
                  <p className="text-sm mb-1" style={{ color: '#1976D2' }}>Observaciones de Seguridad</p>
                  <p className="text-3xl" style={{ color: '#1976D2' }}>142</p>
                  <div className="flex items-center gap-1 text-sm mt-1" style={{ color: '#4CAF50' }}>
                    <TrendingUp className="w-4 h-4" />
                    <span>+28 vs semana anterior</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#7B1FA2' + '15' }}>
                  <p className="text-sm mb-1" style={{ color: '#7B1FA2' }}>Cumplimiento Capacitaciones</p>
                  <p className="text-3xl" style={{ color: '#7B1FA2' }}>92%</p>
                  <div className="flex items-center gap-1 text-sm mt-1" style={{ color: '#4CAF50' }}>
                    <TrendingUp className="w-4 h-4" />
                    <span>+5% vs mes anterior</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasa de Accidentabilidad */}
          <Card className="border-2" style={{ borderColor: 'var(--gray-structure)' }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--navy-deep)' }}>Tasa de Accidentabilidad (Semestre)</CardTitle>
              <CardDescription>Evolución mensual de incidentes y tasa</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={accidentRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="incidents" 
                    stroke="#FF6B35" 
                    name="N° Incidentes"
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#0A2342" 
                    name="Tasa"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tipos de Incidentes */}
          <Card className="border-2" style={{ borderColor: 'var(--gray-structure)' }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--navy-deep)' }}>Distribución por Tipo de Incidente</CardTitle>
              <CardDescription>Análisis de incidentes por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incidentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {incidentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {incidentTypeData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-gray-600">{item.value} casos</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Capacitaciones */}
          <Card className="lg:col-span-2 border-2" style={{ borderColor: 'var(--gray-structure)' }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--navy-deep)' }}>Estado de Capacitaciones</CardTitle>
              <CardDescription>Trabajadores capacitados por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workerTrainingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#4CAF50" name="Completadas" />
                  <Bar dataKey="total" fill="#E0E0E0" name="Total Trabajadores" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recomendaciones */}
          <Card className="lg:col-span-2 border-2" style={{ borderColor: '#FF6B35' }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--navy-deep)' }}>Recomendaciones del Sistema</CardTitle>
              <CardDescription>Acciones sugeridas basadas en el análisis de datos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFF3E0' }}>
                  <h4 className="mb-1" style={{ color: '#FF6B35' }}>Prioridad Alta</h4>
                  <p className="text-sm">Reforzar capacitación en trabajo en altura - Solo 78 de 84 trabajadores capacitados</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFF3E0' }}>
                  <h4 className="mb-1" style={{ color: '#FF6B35' }}>Prioridad Alta</h4>
                  <p className="text-sm">35% de incidentes son caídas - Revisar medidas de protección colectiva</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#E8F5E9' }}>
                  <h4 className="mb-1" style={{ color: '#4CAF50' }}>Buena Práctica</h4>
                  <p className="text-sm">Mantener el programa de observaciones de seguridad - Ha aumentado 28 reportes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
