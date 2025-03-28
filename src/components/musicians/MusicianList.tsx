
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMusicians, deleteMusician } from '@/services/musicianService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
import { Edit, MoreVertical, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import MusicianForm from './MusicianForm';
import { format } from 'date-fns';
import { Musician } from '@/types/musician';

const MusicianList = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedMusician, setSelectedMusician] = useState<Musician | null>(null);

  const { data: musicians, isLoading, isError, refetch } = useQuery({
    queryKey: ['musicians'],
    queryFn: getAllMusicians,
  });

  const handleEdit = (musician: Musician) => {
    setSelectedMusician(musician);
    setOpenEditDialog(true);
  };

  const handleAdd = () => {
    setSelectedMusician(null);
    setOpenAddDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este músico?')) {
      try {
        await deleteMusician(id);
        toast.success('Músico excluído com sucesso');
        refetch();
      } catch (error) {
        console.error('Erro ao excluir músico:', error);
        toast.error('Erro ao excluir músico');
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando músicos...</div>;
  }

  if (isError) {
    return <div className="text-center p-8 text-red-500">Erro ao carregar músicos</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Músicos</CardTitle>
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Músico
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Músico</DialogTitle>
            </DialogHeader>
            <MusicianForm 
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
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Instrumentos</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Desde</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {musicians && musicians.length > 0 ? (
              musicians.map((musician) => (
                <TableRow key={musician.id}>
                  <TableCell className="font-medium">{musician.name}</TableCell>
                  <TableCell>{musician.email}</TableCell>
                  <TableCell>{musician.phone}</TableCell>
                  <TableCell>{musician.instruments?.join(', ')}</TableCell>
                  <TableCell>{musician.skillLevel}</TableCell>
                  <TableCell>
                    {musician.joined ? format(new Date(musician.joined), 'dd/MM/yyyy') : 'N/A'}
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(musician)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(musician.id)}>
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
                <TableCell colSpan={7} className="text-center">
                  Nenhum músico encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Músico</DialogTitle>
            </DialogHeader>
            {selectedMusician && (
              <MusicianForm 
                musician={selectedMusician}
                onSuccess={() => {
                  setOpenEditDialog(false);
                  refetch();
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MusicianList;
