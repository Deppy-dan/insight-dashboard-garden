
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMusicianById } from '@/services/musicianService';
import { getSchedulesByMusicianId } from '@/services/scheduleService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Musician } from '@/types/musician';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface MusicianDetailProps {
  id: number;
}

const MusicianDetail: React.FC<MusicianDetailProps> = ({ id }) => {
  const { data: musician, isLoading: isLoadingMusician, isError: isErrorMusician } = useQuery({
    queryKey: ['musician', id],
    queryFn: () => getMusicianById(id),
  });

  const { data: schedules, isLoading: isLoadingSchedules } = useQuery({
    queryKey: ['schedules', id],
    queryFn: () => getSchedulesByMusicianId(id),
    enabled: !!id,
  });

  if (isLoadingMusician) {
    return <div className="flex justify-center p-8">Carregando detalhes do músico...</div>;
  }

  if (isErrorMusician || !musician) {
    return <div className="text-center p-8 text-red-500">Erro ao carregar detalhes do músico</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{musician.name}</CardTitle>
          <CardDescription>Detalhes do músico</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{musician.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Telefone</p>
              <p>{musician.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nível</p>
              <p>{musician.skillLevel}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Desde</p>
              <p>{musician.joined ? format(new Date(musician.joined), 'PPP', { locale: ptBR }) : 'N/A'}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium mb-2">Instrumentos</h3>
            <div className="flex flex-wrap gap-2">
              {musician.instruments?.map((instrument, index) => (
                <Badge key={index} variant="secondary">
                  {instrument}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium mb-2">Disponibilidade</h3>
            {musician.availability && musician.availability.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {musician.availability.map((av, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline">{av.day}</Badge>
                    <span className="text-sm">{av.period}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma disponibilidade cadastrada</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Próximas Escalas</CardTitle>
          <CardDescription>Eventos agendados para este músico</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingSchedules ? (
            <div className="flex justify-center p-4">Carregando escalas...</div>
          ) : schedules && schedules.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evento</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Instrumento</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => {
                  // Find this musician in the schedule's musicians array
                  const musicianInSchedule = schedule.musicians.find(
                    (m) => m.musicianId === musician.id
                  );
                  
                  return (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.title}</TableCell>
                      <TableCell>
                        {format(new Date(schedule.date), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>{schedule.time}</TableCell>
                      <TableCell>{schedule.location}</TableCell>
                      <TableCell>{musicianInSchedule?.instrument || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={musicianInSchedule?.confirmed ? "success" : "secondary"}>
                          {musicianInSchedule?.confirmed ? 'Confirmado' : 'Pendente'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center py-4 text-muted-foreground">
              Nenhuma escala agendada para este músico
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicianDetail;
