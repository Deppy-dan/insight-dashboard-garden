import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { Music, Users, Calendar, Clock, MapPin, CheckCircle, XCircle, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { getAllMusicians } from '@/services/musicianService';
import { getAllSchedules } from '@/services/scheduleService';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Buscar todos os músicos
  const { data: musicians = [], isLoading: isMusiciansLoading } = useQuery({
    queryKey: ['musicians'],
    queryFn: getAllMusicians,
  });

  // Buscar todos os agendamentos
  const { data: schedules = [], isLoading: isSchedulesLoading } = useQuery({
    queryKey: ['schedules'],
    queryFn: getAllSchedules,
  });

  // Filtrar músicos baseado no termo de busca
  const filteredMusicians = musicians.filter(musician => 
    musician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    musician.instruments.some(instrument => 
      instrument.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Separar agendamentos futuros e passados
  const currentDate = new Date();
  const upcomingSchedules = schedules.filter(
    schedule => new Date(`${schedule.date}T${schedule.time}`) >= currentDate
  );
  
  const pastSchedules = schedules.filter(
    schedule => new Date(`${schedule.date}T${schedule.time}`) < currentDate
  );

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  // Estatísticas
  const totalMusicians = musicians.length;
  const totalUpcomingEvents = upcomingSchedules.length;
  const totalPastEvents = pastSchedules.length;
  
  // Contagem de instrumentos
  const instrumentCount: Record<string, number> = {};
  musicians.forEach(musician => {
    musician.instruments.forEach(instrument => {
      instrumentCount[instrument] = (instrumentCount[instrument] || 0) + 1;
    });
  });

  if (isMusiciansLoading || isSchedulesLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">
              Gerencie músicos e agendamentos de adoração
            </p>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Músicos</p>
                  <div className="text-3xl font-bold">{totalMusicians}</div>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Eventos Próximos</p>
                  <div className="text-3xl font-bold">{totalUpcomingEvents}</div>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Eventos Realizados</p>
                  <div className="text-3xl font-bold">{totalPastEvents}</div>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Instrumentos</p>
                  <div className="text-3xl font-bold">{Object.keys(instrumentCount).length}</div>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Music className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Músicos */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" /> Músicos Cadastrados
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar músicos..."
                    className="pl-8 w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>
                Lista de todos os músicos disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredMusicians.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum músico encontrado com o termo "{searchTerm}".
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Instrumentos</TableHead>
                      <TableHead>Disponibilidade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMusicians.map((musician) => (
                      <TableRow key={musician.id}>
                        <TableCell className="font-medium">{musician.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {musician.instruments.map((instrument) => (
                              <span
                                key={instrument}
                                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                              >
                                {instrument}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {musician.availability.map((avail, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-full text-xs font-medium"
                              >
                                {avail.day} ({avail.period})
                              </span>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Agendamentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Agendamentos
              </CardTitle>
              <CardDescription>
                Gerencie eventos e participações dos músicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Próximos</TabsTrigger>
                  <TabsTrigger value="past">Anteriores</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="mt-4">
                  {upcomingSchedules.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Não há agendamentos futuros.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Evento</TableHead>
                          <TableHead>Músicos</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingSchedules.map((schedule) => (
                          <TableRow key={schedule.id}>
                            <TableCell>
                              <div className="font-medium">{formatDate(schedule.date)}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {schedule.time}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{schedule.title}</div>
                              {schedule.description && (
                                <div className="text-sm text-muted-foreground">
                                  {schedule.description}
                                </div>
                              )}
                              {schedule.location && (
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> {schedule.location}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {schedule.musicians.map((musician) => {
                                  const musicianData = musicians.find(m => m.id === musician.musicianId);
                                  return (
                                    <div key={`${schedule.id}-${musician.musicianId}`} className="flex items-center gap-1">
                                      <span className="text-sm font-medium">
                                        {musicianData?.name}:
                                      </span>
                                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                        {musician.instrument}
                                      </span>
                                      {musician.confirmed ? (
                                        <CheckCircle className="h-3 w-3 text-green-600" />
                                      ) : (
                                        <XCircle className="h-3 w-3 text-amber-600" />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>

                <TabsContent value="past" className="mt-4">
                  {pastSchedules.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Não há agendamentos anteriores.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Evento</TableHead>
                          <TableHead>Músicos</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastSchedules.map((schedule) => (
                          <TableRow key={schedule.id}>
                            <TableCell>
                              <div className="font-medium">{formatDate(schedule.date)}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {schedule.time}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{schedule.title}</div>
                              {schedule.description && (
                                <div className="text-sm text-muted-foreground">
                                  {schedule.description}
                                </div>
                              )}
                              {schedule.location && (
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> {schedule.location}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {schedule.musicians.map((musician) => {
                                  const musicianData = musicians.find(m => m.id === musician.musicianId);
                                  return (
                                    <div key={`${schedule.id}-${musician.musicianId}`} className="flex items-center gap-1">
                                      <span className="text-sm font-medium">
                                        {musicianData?.name}:
                                      </span>
                                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                        {musician.instrument}
                                      </span>
                                      {musician.confirmed ? (
                                        <CheckCircle className="h-3 w-3 text-green-600" />
                                      ) : (
                                        <XCircle className="h-3 w-3 text-red-600" />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
