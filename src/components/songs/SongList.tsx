
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllSongs, deleteSong } from '@/services/songService';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, Eye, MoreVertical, Music, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import SongForm from './SongForm';
import SongDetail from './SongDetail';
import { Song } from '@/types/song';

const SongList = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const { data: songs, isLoading, isError, refetch } = useQuery({
    queryKey: ['songs'],
    queryFn: getAllSongs,
  });

  const handleAdd = () => {
    setSelectedSong(null);
    setOpenAddDialog(true);
  };

  const handleEdit = (song: Song) => {
    setSelectedSong(song);
    setOpenEditDialog(true);
  };

  const handleView = (song: Song) => {
    setSelectedSong(song);
    setOpenViewDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta música?')) {
      try {
        await deleteSong(id);
        toast.success('Música excluída com sucesso');
        refetch();
      } catch (error) {
        console.error('Erro ao excluir música:', error);
        toast.error('Erro ao excluir música');
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando músicas...</div>;
  }

  if (isError) {
    return <div className="text-center p-8 text-red-500">Erro ao carregar músicas</div>;
  }

  // Ensure songs is always an array
  const songsList = Array.isArray(songs) ? songs : [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Repertório</CardTitle>
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nova Música
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Música</DialogTitle>
            </DialogHeader>
            <SongForm 
              onSuccess={() => {
                setOpenAddDialog(false);
                refetch();
              }} 
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Artista</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tom</TableHead>
              <TableHead>BPM</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {songsList.length > 0 ? (
              songsList.map((song) => (
                <TableRow key={song.id}>
                  <TableCell className="font-medium">{song.title}</TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{song.category}</Badge>
                  </TableCell>
                  <TableCell>{song.key}</TableCell>
                  <TableCell>{song.tempo}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(song)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(song)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(song.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Nenhuma música encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Música</DialogTitle>
            </DialogHeader>
            {selectedSong && (
              <SongForm 
                song={selectedSong}
                onSuccess={() => {
                  setOpenEditDialog(false);
                  refetch();
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Detalhes da Música</DialogTitle>
            </DialogHeader>
            {selectedSong && <SongDetail song={selectedSong} />}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SongList;
