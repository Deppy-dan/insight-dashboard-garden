
import React from 'react';
import { format, parseISO, addDays, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";
import { Musician } from '@/types/musician';
import { Schedule } from '@/types/schedule';
import { createSchedule } from '@/services/scheduleService';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const scheduleFormSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  date: z.date(),
  time: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  musicians: z.array(
    z.object({
      musicianId: z.number(),
      instrument: z.string(),
      confirmed: z.boolean().default(false),
    })
  ).optional(),
});

type ScheduleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  musicians: Musician[];
};

export const CreateScheduleDialog: React.FC<ScheduleDialogProps> = ({ 
  open, 
  onOpenChange, 
  musicians 
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const scheduleForm = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      time: "20:00",
      description: "",
      location: "",
      musicians: [],
    },
  });

  const createScheduleMutation = useMutation({
    mutationFn: (formData: z.infer<typeof scheduleFormSchema>) => {
      const newSchedule: Omit<Schedule, 'id'> = {
        title: formData.title || "",
        date: formData.date ? format(formData.date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
        time: formData.time || "00:00",
        description: formData.description || "",
        location: formData.location || "",
        musicians: formData.musicians ? formData.musicians.map(m => ({
          musicianId: m.musicianId,
          instrument: m.instrument,
          confirmed: m.confirmed || false
        })) : [],
        songs: []
      };
      return createSchedule(newSchedule);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      scheduleForm.reset();
      onOpenChange(false);
      toast({
        title: "Evento criado",
        description: "O evento foi criado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar evento",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateSchedule = async (values: z.infer<typeof scheduleFormSchema>) => {
    createScheduleMutation.mutate(values);
  };

  // Make sure musicians is always an array
  const musiciansList = Array.isArray(musicians) ? musicians : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Criar Evento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Evento</DialogTitle>
          <DialogDescription>
            Crie um novo evento para a igreja.
          </DialogDescription>
        </DialogHeader>
        <Form {...scheduleForm}>
          <form onSubmit={scheduleForm.handleSubmit(handleCreateSchedule)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={scheduleForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do evento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={scheduleForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data do evento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione a data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > addDays(new Date(), 365) || isBefore(date, new Date())
                          }
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={scheduleForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <Input type="time" defaultValue="20:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={scheduleForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local</FormLabel>
                    <FormControl>
                      <Input placeholder="Local do evento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={scheduleForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalhes do evento"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Músicos</FormLabel>
              {musiciansList.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Instrumento</TableHead>
                      <TableHead className="text-right">Confirmado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {musiciansList.map((musician) => {
                      // Ensure musician.instruments is an array before mapping
                      const instruments = Array.isArray(musician.instruments) ? musician.instruments : [];
                      
                      return (
                        <TableRow key={musician.id}>
                          <TableCell className="font-medium">{musician.name}</TableCell>
                          <TableCell>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                {instruments.length > 0 ? 
                                  instruments.map((instrument) => (
                                    <SelectItem key={instrument} value={instrument}>
                                      {instrument}
                                    </SelectItem>
                                  )) : 
                                  <SelectItem value="default">Instrumento padrão</SelectItem>
                                }
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <Checkbox id={`terms${musician.id}`} />
                            <Label
                              htmlFor={`terms${musician.id}`}
                              className="font-normal"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Nenhum músico disponível
                </div>
              )}
            </div>

            <Button type="submit">Criar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScheduleDialog;
