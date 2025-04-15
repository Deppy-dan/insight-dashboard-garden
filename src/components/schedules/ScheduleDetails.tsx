
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Schedule } from '@/types/schedule';
import { useQuery } from '@tanstack/react-query';
import { getMusicianById } from '@/services/musicianService';
import { getSongById } from '@/services/songService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Clock, MapPin, Music, Users } from 'lucide-react';

interface ScheduleDetailsProps {
  schedule: Schedule;
}

const ScheduleDetails: React.FC<ScheduleDetailsProps> = ({ schedule }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div className="text-lg font-medium">
                {format(new Date(schedule.date), 'PPPP', { locale: ptBR })}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>{schedule.time}</div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>{schedule.location}</div>
            </div>
          </div>

          {schedule.description && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="text-lg font-medium mb-2">Descrição</h3>
                <p className="text-muted-foreground">{schedule.description}</p>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Músicos</h3>
            </div>
            
            {schedule.musicians && Array.isArray(schedule.musicians) && schedule.musicians.length > 0 ? (
              <div className="space-y-2">
                {schedule.musicians.map((musician) => (
                  <MusicianCard key={musician.musicianId} musician={musician} />
                ))}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                Nenhum músico adicionado
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Músicas</h3>
            </div>
            
            {schedule.songs && Array.isArray(schedule.songs) && schedule.songs.length > 0 ? (
              <div className="space-y-2">
                {schedule.songs.map((song, index) => {
                  const songId = typeof song === 'number' ? song : song.id;
                  return <SongCard key={songId} songId={songId} index={index + 1} />;
                })}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                Nenhuma música adicionada
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MusicianCardProps {
  musician: {
    musicianId: number;
    instrument: string;
    confirmed: boolean;
  };
}

const MusicianCard: React.FC<MusicianCardProps> = ({ musician }) => {
  const { data: musicianData } = useQuery({
    queryKey: ['musician', musician.musicianId],
    queryFn: () => getMusicianById(musician.musicianId),
  });

  if (!musicianData) {
    return <div>Carregando...</div>;
  }

  return (
    <Card className="hover-lift">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-medium">{musicianData.name}</span>
            <span className="text-sm text-muted-foreground">{musician.instrument}</span>
          </div>
          <Badge variant={musician.confirmed ? "default" : "outline"}>
            {musician.confirmed ? 'Confirmado' : 'Pendente'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

interface SongCardProps {
  songId: number;
  index: number;
}

const SongCard: React.FC<SongCardProps> = ({ songId, index }) => {
  const { data: song } = useQuery({
    queryKey: ['song', songId],
    queryFn: () => getSongById(songId),
  });

  if (!song) {
    return <div>Carregando...</div>;
  }

  return (
    <Card className="hover-lift">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center p-0">
              {index}
            </Badge>
            <div className="flex flex-col">
              <span className="font-medium">{song.title}</span>
              <span className="text-sm text-muted-foreground">
                {song.artist} - Tom: {song.key}
              </span>
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            {song.tempo} BPM
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleDetails;
