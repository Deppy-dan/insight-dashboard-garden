
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';

// Sample schedule data
const scheduleItems = [
  { id: 1, title: 'Ensaio Geral', date: '10/05', time: '19:00 - 21:00', day: 'Sáb' },
  { id: 2, title: 'Ensaio Vocal', date: '12/05', time: '18:00 - 19:30', day: 'Seg' },
  { id: 3, title: 'Culto Domingo', date: '14/05', time: '09:30 - 12:00', day: 'Qui' },
  { id: 4, title: 'Preparação Louvor', date: '16/05', time: '19:00 - 20:30', day: 'Sex' },
  { id: 5, title: 'Culto Quarta', date: '17/05', time: '19:00 - 21:00', day: 'Sáb' },
];

const RehearsalSchedule = () => {
  return (
    <Layout>
      <Helmet>
        <title>Cronograma de Ensaios | MúsicaIgreja</title>
      </Helmet>

      <div className="container py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Gestão do Grupo de Música</h1>
          <p className="text-muted-foreground">Gerenciamento de músicos, instrumentos, disponibilidade e escalas</p>
        </div>

        <Tabs defaultValue="cronograma">
          <TabsList className="mb-6">
            <TabsTrigger value="musicos">Músicos</TabsTrigger>
            <TabsTrigger value="musicas">Músicas</TabsTrigger>
            <TabsTrigger value="escala">Escala</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cronograma">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Cronograma de Atividades</h2>
                  <p className="text-sm text-muted-foreground">Visualização do cronograma em formato Gantt</p>
                </div>
                
                <div className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-2 w-1/4">Evento</th>
                          <th className="text-center pb-2">Dom</th>
                          <th className="text-center pb-2">Seg</th>
                          <th className="text-center pb-2">Ter</th>
                          <th className="text-center pb-2">Qua</th>
                          <th className="text-center pb-2">Qui</th>
                          <th className="text-center pb-2">Sex</th>
                          <th className="text-center pb-2">Sáb</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduleItems.map(item => (
                          <tr key={item.id} className="border-b">
                            <td className="py-4 pr-4">
                              <div className="font-medium">{item.title}</div>
                              <div className="text-xs text-muted-foreground">{item.date} {item.time}</div>
                            </td>
                            <td className="p-2">{item.day === 'Dom' && <div className="bg-blue-100 h-10 rounded-md"></div>}</td>
                            <td className="p-2">{item.day === 'Seg' && <div className="bg-blue-100 h-10 rounded-md"></div>}</td>
                            <td className="p-2">{item.day === 'Ter' && <div className="bg-blue-100 h-10 rounded-md"></div>}</td>
                            <td className="p-2">{item.day === 'Qua' && <div className="bg-blue-100 h-10 rounded-md"></div>}</td>
                            <td className="p-2">{item.day === 'Qui' && <div className="bg-blue-100 h-10 rounded-md"></div>}</td>
                            <td className="p-2">{item.day === 'Sex' && <div className="bg-blue-100 h-10 rounded-md"></div>}</td>
                            <td className="p-2">{item.day === 'Sáb' && <div className="bg-blue-100 h-10 rounded-md"></div>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Total de Músicos</h3>
                </div>
                <p className="text-3xl font-bold mt-2">7</p>
                <p className="text-sm text-muted-foreground mt-1">2 vocais, 5 instrumentistas</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Eventos Previstos</h3>
                </div>
                <p className="text-3xl font-bold mt-2">5</p>
                <p className="text-sm text-muted-foreground mt-1">Próximo: 10/05 - Ensaio Geral</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Disponibilidade</h3>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center">
                    <div className="text-xl font-bold">4</div>
                    <div className="text-xs text-muted-foreground">Manhã</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">5</div>
                    <div className="text-xs text-muted-foreground">Tarde</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">4</div>
                    <div className="text-xs text-muted-foreground">Noite</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RehearsalSchedule;
