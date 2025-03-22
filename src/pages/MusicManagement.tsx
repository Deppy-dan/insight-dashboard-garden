
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Music, Calendar, Plus, Search, Save, PlusCircle, 
  Users, CheckCircle, XCircle 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getAllSongs, addSong, updateScheduleWithSongs } from '@/services/songService';
import { getAllMusicians } from '@/services/musicianService';
import { getAllSchedules, createSchedule, updateSchedule } from '@/services/scheduleService';
import { Instrument, Song } from '@/types/musician';
import { Schedule } from '@/types/schedule';

// Schemas de validação
const songFormSchema = z.object({
  title: z.string().min(2, { message: 'Título é obrigatório' }),
  key: z.string().min(1, { message: 'Tonalidade é obrigatória' }),
  style: z.string().min(1, { message: 'Estilo é obrigatório' }),
  lastPlayed: z.string().optional(),
  timesPlayed: z.number().default(0),
});

const scheduleFormSchema = z.object({
  title: z.string().min(2, { message: 'Título é obrigatório' }),
  date: z.string().min(10, { message: 'Data é obrigatória' }),
  time: z.string().min(5, { message: 'Hora é obrigatória' }),
  description: z.string().optional(),
  location: z.string().optional(),
  musicians: z.array(
    z.object({
      musicianId: z.number(),
      instrument: z.string(),
      confirmed: z.boolean().default(false)
    })
  ).optional(),
  songs: z.array(z.number()).optional(),
});

const MusicManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('songs');
  
  // Diálogos
  const [addSongDialogOpen, setAddSongDialogOpen] = useState(false);
  const [addScheduleDialogOpen, setAddScheduleDialogOpen] = useState(false);
  const [addSongsToScheduleDialogOpen, setAddSongsToScheduleDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);

  // Consultas
  const { data: songs = [], isLoading: isLoadingSongs } = useQuery({
    queryKey: ['songs'],
    queryFn: getAllSongs,
  });

  const { data: musicians = [], isLoading: isLoadingMusicians } = useQuery({
    queryKey: ['musicians'],
    queryFn: getAllMusicians,
  });

  const { data: schedules = [], isLoading: isLoadingSchedules } = useQuery({
    queryKey: ['schedules'],
    queryFn: getAllSchedules,
  });

  // Filtragem
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.style.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formulários
  const songForm = useForm<z.infer<typeof songFormSchema>>({
    resolver: zodResolver(songFormSchema),
    defaultValues: {
      title: '',
      key: '',
      style: '',
      timesPlayed: 0,
    },
  });

  const scheduleForm = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      title: '',
      date: '',
      time: '',
      description: '',
      location: '',
      musicians: [],
    },
  });

  // Mutações
  const addSongMutation = useMutation({
    mutationFn: (data: z.infer<typeof songFormSchema>) => {
      // Garantir que todos os campos obrigatórios estão presentes
      const newSong: Omit<Song, 'id'> = {
        title: data.title,
        key: data.key,
        style: data.style,
        lastPlayed: data.lastPlayed || undefined,
        timesPlayed: data.timesPlayed || 0
      };
      return addSong(newSong);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      songForm.reset();
      setAddSongDialogOpen(false);
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
    },
  });

  const createScheduleMutation = useMutation({
    mutationFn: (data: z.infer<typeof scheduleFormSchema>) => {
      // Garantir que todos os campos obrigatórios estão presentes
      const newSchedule: Omit<Schedule, 'id'> = {
        title: data.title,
        date: data.date,
        time: data.time,
        description: data.description,
        location: data.location,
        musicians: data.musicians || [],
        songs: []
      };
      return createSchedule(newSchedule);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      scheduleForm.reset();
      setAddScheduleDialogOpen(false);
      toast({
        title: "Evento agendado",
        description: "O evento foi agendado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao agendar evento",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateScheduleWithSongsMutation = useMutation({
    mutationFn: ({ scheduleId, songIds }: { scheduleId: number, songIds: number[] }) => 
      updateScheduleWithSongs(scheduleId, songIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      setAddSongsToScheduleDialogOpen(false);
      setSelectedSongs([]);
      toast({
        title: "Músicas adicionadas",
        description: "As músicas foram adicionadas ao evento com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao adicionar músicas",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handlers
  const onSubmitSong = (data: z.infer<typeof songFormSchema>) => {
    addSongMutation.mutate(data);
  };

  const onSubmitSchedule = (data: z.infer<typeof scheduleFormSchema>) => {
    createScheduleMutation.mutate(data);
  };

  const handleAddSongsToSchedule = () => {
    if (selectedSchedule && selectedSongs.length > 0) {
      updateScheduleWithSongsMutation.mutate({
        scheduleId: selectedSchedule.id,
        songIds: selectedSongs
      });
    }
  };

  const toggleSongSelection = (songId: number) => {
    setSelectedSongs(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

  const openAddSongsDialog = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setSelectedSongs(schedule.songs?.map(song => song.id) || []);
    setAddSongsToScheduleDialogOpen(true);
  };

  // Formatador de data
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  if (isLoadingSongs || isLoadingMusicians || isLoadingSchedules) {
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
            <h1 className="text-3xl font-bold">Gerenciamento de Músicas</h1>
            <p className="text-muted-foreground">
              Adicione e organize músicas para os eventos
            </p>
          </div>
        </div>

        <Tabs defaultValue="songs" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
            <TabsTrigger value="songs">Músicas</TabsTrigger>
            <TabsTrigger value="schedules">Eventos</TabsTrigger>
          </TabsList>

          {/* Aba de Músicas */}
          <TabsContent value="songs" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar músicas..."
                  className="pl-8 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={addSongDialogOpen} onOpenChange={setAddSongDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Música
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Música</DialogTitle>
                    <DialogDescription>
                      Preencha os detalhes da música abaixo
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...songForm}>
                    <form onSubmit={songForm.handleSubmit(onSubmitSong)} className="space-y-4">
                      <FormField
                        control={songForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Grande é o Senhor" {...field} />
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a tonalidade" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map((key) => (
                                  <SelectItem key={key} value={key}>{key}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o estilo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {['Louvor', 'Adoração', 'Congregacional', 'Contemporâneo', 'Outro'].map((style) => (
                                  <SelectItem key={style} value={style}>{style}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit" disabled={addSongMutation.isPending}>
                          {addSongMutation.isPending ? "Salvando..." : "Salvar"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" /> Músicas Cadastradas
                </CardTitle>
                <CardDescription>
                  Lista de todas as músicas disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSongs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchTerm ? `Nenhuma música encontrada com o termo "${searchTerm}".` : "Nenhuma música cadastrada."}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Tonalidade</TableHead>
                        <TableHead>Estilo</TableHead>
                        <TableHead>Última vez tocada</TableHead>
                        <TableHead>Tocada</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSongs.map((song) => (
                        <TableRow key={song.id}>
                          <TableCell className="font-medium">{song.title}</TableCell>
                          <TableCell>{song.key}</TableCell>
                          <TableCell>{song.style}</TableCell>
                          <TableCell>{song.lastPlayed || "Nunca"}</TableCell>
                          <TableCell>{song.timesPlayed} vezes</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Eventos */}
          <TabsContent value="schedules" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={addScheduleDialogOpen} onOpenChange={setAddScheduleDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Agendar Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Agendar Novo Evento</DialogTitle>
                    <DialogDescription>
                      Preencha os detalhes do evento e selecione os músicos
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...scheduleForm}>
                    <form onSubmit={scheduleForm.handleSubmit(onSubmitSchedule)} className="space-y-4">
                      <FormField
                        control={scheduleForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Culto de Domingo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={scheduleForm.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={scheduleForm.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Horário</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={scheduleForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Local</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Templo Principal" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={scheduleForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Adicione detalhes sobre o evento"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit" disabled={createScheduleMutation.isPending}>
                          {createScheduleMutation.isPending ? "Agendando..." : "Agendar"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Eventos Agendados
                </CardTitle>
                <CardDescription>
                  Gerencie os eventos e as músicas para cada evento
                </CardDescription>
              </CardHeader>
              <CardContent>
                {schedules.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum evento agendado.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Evento</TableHead>
                        <TableHead>Músicos</TableHead>
                        <TableHead>Músicas</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules.map((schedule) => (
                        <TableRow key={schedule.id}>
                          <TableCell>
                            <div className="font-medium">{formatDate(schedule.date)}</div>
                            <div className="text-sm text-muted-foreground">{schedule.time}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{schedule.title}</div>
                            {schedule.description && (
                              <div className="text-sm text-muted-foreground line-clamp-2">
                                {schedule.description}
                              </div>
                            )}
                            {schedule.location && (
                              <div className="text-sm text-muted-foreground">
                                Local: {schedule.location}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {schedule.musicians.length === 0 ? (
                                <span className="text-sm text-muted-foreground">
                                  Nenhum músico designado
                                </span>
                              ) : (
                                schedule.musicians.map((musician) => {
                                  const musicianData = musicians.find(
                                    (m) => m.id === musician.musicianId
                                  );
                                  return (
                                    <div
                                      key={`${schedule.id}-${musician.musicianId}`}
                                      className="flex items-center gap-1"
                                    >
                                      <span className="text-sm font-medium">
                                        {musicianData?.name}:
                                      </span>
                                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                        {musician.instrument}
                                      </span>
                                      {musician.confirmed ? (
                                        <CheckCircle className="h-3 w-3 text-green-600" />
                                      ) : (
                                        <XCircle className="h-3 w-3 text-amber-600" />
                                      )}
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {!schedule.songs || schedule.songs.length === 0 ? (
                                <span className="text-sm text-muted-foreground">
                                  Nenhuma música selecionada
                                </span>
                              ) : (
                                schedule.songs.map((song) => (
                                  <div key={song.id} className="text-sm">
                                    {song.title} ({song.key})
                                  </div>
                                ))
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openAddSongsDialog(schedule)}
                            >
                              <Music className="h-3 w-3 mr-1" /> Gerenciar Músicas
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo para adicionar músicas ao evento */}
      <Dialog open={addSongsToScheduleDialogOpen} onOpenChange={setAddSongsToScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Adicionar Músicas ao Evento</DialogTitle>
            <DialogDescription>
              {selectedSchedule && `Selecione as músicas para ${selectedSchedule.title} em ${formatDate(selectedSchedule.date)}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Tonalidade</TableHead>
                  <TableHead>Estilo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {songs.map((song) => (
                  <TableRow key={song.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedSongs.includes(song.id)}
                        onCheckedChange={() => toggleSongSelection(song.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{song.title}</TableCell>
                    <TableCell>{song.key}</TableCell>
                    <TableCell>{song.style}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={handleAddSongsToSchedule} 
              disabled={updateScheduleWithSongsMutation.isPending}
            >
              {updateScheduleWithSongsMutation.isPending ? "Salvando..." : "Salvar Seleção"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MusicManagement;
