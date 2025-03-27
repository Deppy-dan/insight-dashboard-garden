import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { Music, Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { getMusicianByUserId } from '@/services/musicianService';
import { getSchedulesByMusicianId } from '@/services/scheduleService';

const UserProfile = () => {
  const { user } = useAuth();

  // Buscar dados do músico
  const { data: musician, isLoading: isMusicianLoading } = useQuery({
    queryKey: ['musician', user?.id],
    queryFn: () => getMusicianByUserId(user?.id || 0),
    enabled: !!user?.id,
  });

  // Buscar agendamentos do músico
  const { data: schedules, isLoading: isSchedulesLoading } = useQuery({
    queryKey: ['schedules', musician?.id],
    queryFn: () => getSchedulesByMusicianId(musician?.id || 0),
    enabled: !!musician?.id,
  });

  // Separar agendamentos futuros e passados
  const currentDate = new Date();
  const upcomingSchedules = schedules?.filter(
    schedule => new Date(`${schedule.date}T${schedule.time}`) >= currentDate
  ) || [];
  
  const pastSchedules = schedules?.filter(
    schedule => new Date(`${schedule.date}T${schedule.time}`) < currentDate
  ) || [];

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  if (isMusicianLoading || isSchedulesLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!musician) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Perfil não encontrado</h2>
          <p className="text-muted-foreground">
            Não encontramos seu perfil de músico. Entre em contato com o administrador.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Seu Perfil</h1>
            <p className="text-muted-foreground">
              Visualize seus dados e próximos compromissos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card de Informações do Músico */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" /> Suas Informações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Nome</h3>
                <p className="font-medium">{musician.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Instrumentos</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {musician.instruments.map((instrument) => (
                    <span
                      key={instrument}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Disponibilidade</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {musician.availability.map((avail, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium"
                    >
                      {avail.day} ({avail.period})
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Telefone</h3>
                <p>{musician.phone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Nível</h3>
                <p>{musician.skillLevel}</p>
              </div>
            </CardContent>
          </Card>

          {/* Card de Agendamentos */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Seus Agendamentos
              </CardTitle>
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
                      Você não tem agendamentos futuros.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Evento</TableHead>
                          <TableHead>Instrumento</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingSchedules.map((schedule) => {
                          const musicianInSchedule = schedule.musicians.find(
                            (m) => m.musicianId === musician.id
                          );
                          
                          return (
                            <TableRow key={schedule.id}>
                              <TableCell>
                                <div className="font-medium">{formatDate(schedule.date)}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {schedule.time}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{schedule.title}</div>
                                {schedule.location && (
                                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" /> {schedule.location}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                  {musicianInSchedule?.instrument}
                                </span>
                              </TableCell>
                              <TableCell>
                                {musicianInSchedule?.confirmed ? (
                                  <div className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="h-4 w-4" /> Confirmado
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-amber-600">
                                    <XCircle className="h-4 w-4" /> Pendente
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>

                <TabsContent value="past" className="mt-4">
                  {pastSchedules.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Você não tem agendamentos anteriores.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Evento</TableHead>
                          <TableHead>Instrumento</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastSchedules.map((schedule) => {
                          const musicianInSchedule = schedule.musicians.find(
                            (m) => m.musicianId === musician.id
                          );
                          
                          return (
                            <TableRow key={schedule.id}>
                              <TableCell>
                                <div className="font-medium">{formatDate(schedule.date)}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {schedule.time}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{schedule.title}</div>
                                {schedule.location && (
                                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" /> {schedule.location}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                  {musicianInSchedule?.instrument}
                                </span>
                              </TableCell>
                              <TableCell>
                                {musicianInSchedule?.confirmed ? (
                                  <div className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="h-4 w-4" /> Participou
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-red-600">
                                    <XCircle className="h-4 w-4" /> Não participou
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
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

export default UserProfile;
