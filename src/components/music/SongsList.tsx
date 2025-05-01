
import React from 'react';
import { Song } from '@/types/musician';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SongsListProps {
  songs: Song[];
  isLoading: boolean;
}

export const SongsList: React.FC<SongsListProps> = ({ songs, isLoading }) => {
  // Make sure songs is always an array
  const songsList = Array.isArray(songs) ? songs : [];

  if (isLoading) {
    return (
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music2 className="h-5 w-5" /> Lista de Músicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music2 className="h-5 w-5" /> Lista de Músicas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!songsList.length ? (
          <div className="text-center py-8">
            Nenhuma música adicionada ainda.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tonalidade</TableHead>
                <TableHead>Estilo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {songsList.map((song) => (
                <TableRow key={song.id}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.key}</TableCell>
                  <TableCell>{song.style}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SongsList;
