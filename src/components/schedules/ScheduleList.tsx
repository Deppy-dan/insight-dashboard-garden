
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllSchedules, deleteSchedule } from '@/services/scheduleService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Schedule } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
import { Calendar, Edit, MoreVertical, Plus, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';
import ScheduleForm from './ScheduleForm';
import ScheduleDetails from './ScheduleDetails';

const ScheduleList: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const { data: schedules, isLoading, isError, refetch } = useQuery({
    queryKey: ['schedules'],
    queryFn: getAllSchedules,
  });

  const handleAdd = () => {
    setSelectedSchedule(null);
    setOpenAddDialog(true);
  };

  const handleEdit = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setOpenEditDialog(true);
  };

  const handleDetails = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setOpenDetailsDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta escala?')) {
      try {
        await deleteSchedule(id);
        toast.success('Escala excluída com sucesso');
        refetch();
      } catch (error) {
        console.error('Erro ao excluir escala:', error);
        toast.error('Erro ao excluir escala');
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando escalas...</div>;
  }

  if (isError) {
    return <div className="text-center p-8 text-red-500">Erro ao carregar escalas</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Escalas</CardTitle>
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nova Escala
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Adicionar Escala</DialogTitle>
            </DialogHeader>
            <ScheduleForm
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
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Músicos</TableHead>
              <TableHead>Músicas</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules && schedules.length > 0 ? (
              schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.title}</TableCell>
                  <TableCell>
                    {format(new Date(schedule.date), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>{schedule.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {schedule.musicians?.length || 0} músicos
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {schedule.songs?.length || 0} músicas
                    </Badge>
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
                        <DropdownMenuItem onClick={() => handleDetails(schedule)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(schedule)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(schedule.id)}>
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
                  Nenhuma escala encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Editar Escala</DialogTitle>
            </DialogHeader>
            {selectedSchedule && (
              <ScheduleForm
                schedule={selectedSchedule}
                onSuccess={() => {
                  setOpenEditDialog(false);
                  refetch();
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Details Dialog */}
        <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Detalhes da Escala</DialogTitle>
            </DialogHeader>
            {selectedSchedule && (
              <ScheduleDetails schedule={selectedSchedule} />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ScheduleList;
