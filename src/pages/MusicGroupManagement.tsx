
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Music2, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { addDays, isBefore, isAfter } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { addSong, getAllSongs } from '@/services/songService';
import { createSchedule } from '@/services/scheduleService';
import { getAllMusicians } from '@/services/musicianService';
import { Musician, Song } from '@/types/musician';
import { Schedule } from '@/types/schedule';

const songFormSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  key: z.string().min(1, {
    message: "A tonalidade deve ter pelo menos 1 caractere.",
  }),
  style: z.string().min(2, {
    message: "O estilo deve ter pelo menos 2 caracteres.",
  }),
  timesPlayed: z.number().optional(),
  lastPlayed: z.date().optional(),
});

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

const MusicGroupManagement = () => {
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Formulario de música
  const songForm = useForm<z.infer<typeof songFormSchema>>({
    resolver: zodResolver(songFormSchema),
    defaultValues: {
      title: "",
      key: "",
      style: "",
    },
  });

  // Formulario de evento
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

  // Buscar músicas
  const { data: songs, isLoading: isSongsLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: getAllSongs,
  });

  // Buscar músicos
  const { data: musicians, isLoading: isMusiciansLoading } = useQuery({
    queryKey: ['musicians'],
    queryFn: getAllMusicians,
  });

  // Mutações para adicionar música
  const addSongMutation = useMutation({
    mutationFn: (formData: z.infer<typeof songFormSchema>) => {
      const newSong: Omit<Song, 'id'> = {
        title: formData.title || "",
        key: formData.key || "",
        style: formData.style || "",
        timesPlayed: formData.timesPlayed || 0,
        lastPlayed: formData.lastPlayed ? format(formData.lastPlayed, 'yyyy-MM-dd') : null
      };
      return addSong(newSong);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      songForm.reset();
      setSongDialogOpen(false);
      toast({
        title: "Música adicionada",
        description: "A música foi adicionada com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao adicionar música",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Mutações para criar evento
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
      setScheduleDialogOpen(false);
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

  // Lógica para adicionar música
  const handleAddSong = async (values: z.infer<typeof songFormSchema>) => {
    addSongMutation.mutate(values);
  };

  // Lógica para criar evento
  const handleCreateSchedule = async (values: z.infer<typeof scheduleFormSchema>) => {
    createScheduleMutation.mutate(values);
  };

  // Formatador de data
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  if (isSongsLoading || isMusiciansLoading) {
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
            <h1 className="text-3xl font-bold">Gerenciamento de Música</h1>
            <p className="text-muted-foreground">
              Adicione músicas e crie eventos para sua igreja
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Música
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Música</DialogTitle>
                  <DialogDescription>
                    Adicione uma nova música ao repertório da igreja.
                  </DialogDescription>
                </DialogHeader>
                <Form {...songForm}>
                  <form onSubmit={songForm.handleSubmit(handleAddSong)} className="space-y-4">
                    <FormField
                      control={songForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da música" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={songForm.control}
                      name="key"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tonalidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Tom da música" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={songForm.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estilo</FormLabel>
                          <FormControl>
                            <Input placeholder="Estilo da música" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Adicionar</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
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
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Instrumento</TableHead>
                            <TableHead className="text-right">Confirmado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {musicians?.map((musician) => (
                            <TableRow key={musician.id}>
                              <TableCell className="font-medium">{musician.name}</TableCell>
                              <TableCell>
                                <Select>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {musician.instruments.map((instrument) => (
                                      <SelectItem key={instrument} value={instrument}>
                                        {instrument}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-right">
                                <Checkbox id={`terms${musician.id}`} />
                                <Label
                                  htmlFor={`terms${musician.id}`}
                                  className="font-normal"
                                >
                                </Label>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <Button type="submit">Criar</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music2 className="h-5 w-5" /> Próximos eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Aqui você pode adicionar uma lista dos próximos eventos */}
              Em breve...
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music2 className="h-5 w-5" /> Lista de Músicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!songs || songs.length === 0 ? (
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
                    {songs.map((song) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default MusicGroupManagement;
