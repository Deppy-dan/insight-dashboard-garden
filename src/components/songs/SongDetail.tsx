
import React from 'react';
import { Song } from '@/types/song';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, ListMusic } from 'lucide-react';

interface SongDetailProps {
  song: Song;
}

const SongDetail: React.FC<SongDetailProps> = ({ song }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl">{song.title}</CardTitle>
              <CardDescription>{song.artist}</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              <Badge>{song.key}</Badge>
              <Badge variant="outline">{song.tempo} BPM</Badge>
              <Badge variant="secondary">{song.category}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lyrics" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lyrics" className="flex items-center">
                <Music className="mr-2 h-4 w-4" />
                Letra
              </TabsTrigger>
              <TabsTrigger value="chords" className="flex items-center">
                <ListMusic className="mr-2 h-4 w-4" />
                Cifra
              </TabsTrigger>
            </TabsList>
            <TabsContent value="lyrics" className="mt-4">
              {song.lyrics ? (
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {song.lyrics}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma letra disponível para esta música
                </div>
              )}
            </TabsContent>
            <TabsContent value="chords" className="mt-4">
              {song.chords ? (
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono">
                  {song.chords}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma cifra disponível para esta música
                </div>
              )}
            </TabsContent>
          </Tabs>

          {song.notes && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="text-lg font-medium mb-2">Observações</h3>
                <p className="text-muted-foreground whitespace-pre-line">{song.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SongDetail;
