
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/dashboard/DataTable';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BarChart4, CalendarIcon, Clock, Music, UserCheck, PlusCircle, Check, X } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Instrument, Song } from '@/types/musician';
import { getAllMusicians } from '@/services/musicianService';
import { getAllSchedules, assignMusicianToSchedule, addSchedule, addSongsToSchedule } from '@/services/scheduleService';
import { getAllSongs, addSong } from '@/services/songService';

// Schemas para validação de formulários
const addSongSchema = z.object({
  title: z.string().min(2, { message: 'O título deve ter pelo menos 2 caracteres' }),
  key: z.string().min(1, { message: 'Informe a tonalidade da música' }),
  style: z.string().min(1, { message: 'Informe o estilo da música' }),
});

const addScheduleSchema = z.object({
  title: z.string().min(2, { message: 'O título deve ter pelo menos 2 caracteres' }),
  date: z.date({ required_error: 'Por favor, selecione uma data' }),
  time: z.string().min(1, { message: 'Informe o horário' }),
  location: z.string().optional(),
  description: z.string().optional(),
});

const assignMusicianSchema = z.object({
  scheduleId: z.number({ required_error: 'Selecione um evento' }),
  musicianId: z.number({ required_error: 'Selecione um músico' }),
  instrument: z.string().min(1, { message: 'Selecione um instrumento' }),
});

const addSongsToScheduleSchema = z.object({
  scheduleId: z.number({ required_error: 'Selecione um evento' }),
  songIds: z.array(z.number()).min(1, { message: 'Selecione pelo menos uma música' }),
});

// Table columns configuration for musicians
const musicianColumns = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'name' },
  { 
    title: 'Instrumentos', 
    key: 'instruments',
    render: (value: Instrument[]) => (
      <div className="flex flex-wrap gap-1">
        {value.map((inst, index) => (
          <Badge key={index} variant="outline">
            {inst}
          </Badge>
        ))}
      </div>
    )
  },
  { 
    title: 'Disponibilidade', 
    key: 'availability',
    render: (value: any[]) => (
      <div className="flex flex-wrap gap-1">
        {value.map((av, index) => (
          <Badge key={index} variant={
            av.period === 'manhã' ? 'default' : 
            av.period === 'tarde' ? 'secondary' : 
            'outline'
          }>
            {av.day} ({av.period})
          </Badge>
        ))}
      </div>
    )
  },
  { title: 'Telefone', key: 'phoneNumber' },
  { title: 'Experiência', key: 'experience' },
];

// Table columns configuration for songs
const songColumns = [
  { title: 'ID', key: 'id' },
  { title: 'Título', key: 'title' },
  { title: 'Tom', key: 'key' },
  { title: 'Estilo', key: 'style' },
  { title: 'Última Vez', key: 'lastPlayed' },
  { 
    title: 'Vezes Tocada', 
    key: 'timesPlayed',
    render: (value: number) => (
      <div className="flex items-center">
        <span className="font-medium">{value}</span>
        <div className="ml-2 h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${Math.min(100, (value / 12) * 100)}%` }}
          ></div>
        </div>
      </div>
    )
  },
];

// Dias da semana
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const MusicGroupManagement: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [musicians, setMusicians] = useState<any[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const { toast } = useToast();
  
  // Formulários
  const addSongForm = useForm<z.infer<typeof addSongSchema>>({
    resolver: zodResolver(addSongSchema),
    defaultValues: {
      title: '',
      key: '',
      style: ''
    }
  });

  const addScheduleForm = useForm<z.infer<typeof addScheduleSchema>>({
    resolver: zodResolver(addScheduleSchema),
    defaultValues: {
      title: '',
      time: '',
      location: '',
      description: ''
    }
  });

  const assignMusicianForm = useForm<z.infer<typeof assignMusicianSchema>>({
    resolver: zodResolver(assignMusicianSchema),
    defaultValues: {
      instrument: ''
    }
  });

  const addSongsToScheduleForm = useForm<z.infer<typeof addSongsToScheduleSchema>>({
    resolver: zodResolver(addSongsToScheduleSchema)
  });
  
  // Carregar dados 
  useEffect(() => {
    const loadData = async () => {
      try {
        const [musiciansData, songsData, schedulesData] = await Promise.all([
          getAllMusicians(),
          getAllSongs(),
          getAllSchedules()
        ]);
        
        setMusicians(musiciansData);
        setSongs(songsData);
        setSchedules(schedulesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast({
          title: 'Erro ao carregar dados',
          description: 'Não foi possível carregar os dados. Tente novamente mais tarde.',
          variant: 'destructive'
        });
      }
    };
    
    loadData();
  }, [toast]);
  
  // Handle day selection
  const handleDayToggle = (day: string) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  // Adicionar música
  const handleAddSong = async (values: z.infer<typeof addSongSchema>) => {
    try {
      const newSong = await addSong({
        ...values,
        timesPlayed: 0,
        lastPlayed: format(new Date(), 'dd/MM/yyyy')
      });
      
      setSongs([...songs, newSong]);
      addSongForm.reset();
      
      toast({
        title: 'Música adicionada',
        description: 'A música foi adicionada com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao adicionar música',
        description: 'Ocorreu um erro ao adicionar a música. Tente novamente.',
        variant: 'destructive'
      });
    }
  };

  // Adicionar agendamento
  const handleAddSchedule = async (values: z.infer<typeof addScheduleSchema>) => {
    try {
      const newSchedule = await addSchedule({
        ...values,
        date: format(values.date, 'yyyy-MM-dd'),
        musicians: []
      });
      
      setSchedules([...schedules, newSchedule]);
      addScheduleForm.reset();
      
      toast({
        title: 'Evento agendado',
        description: 'O evento foi agendado com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao agendar evento',
        description: 'Ocorreu um erro ao agendar o evento. Tente novamente.',
        variant: 'destructive'
      });
    }
  };

  // Atribuir músico a um evento
  const handleAssignMusician = async (values: z.infer<typeof assignMusicianSchema>) => {
    try {
      const success = await assignMusicianToSchedule(
        values.scheduleId,
        values.musicianId,
        values.instrument
      );
      
      if (success) {
        // Atualizar a lista de agendamentos
        const updatedSchedules = await getAllSchedules();
        setSchedules(updatedSchedules);
        
        assignMusicianForm.reset();
        
        toast({
          title: 'Músico atribuído',
          description: 'O músico foi atribuído ao evento com sucesso.',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao atribuir músico',
        description: 'Ocorreu um erro ao atribuir o músico. Tente novamente.',
        variant: 'destructive'
      });
    }
  };

  // Adicionar músicas a um evento
  const handleAddSongsToSchedule = async (values: z.infer<typeof addSongsToScheduleSchema>) => {
    try {
      const success = await addSongsToSchedule(
        values.scheduleId,
        selectedSongs
      );
      
      if (success) {
        // Atualizar a lista de agendamentos
        const updatedSchedules = await getAllSchedules();
        setSchedules(updatedSchedules);
        
        setSelectedSongs([]);
        addSongsToScheduleForm.reset();
        
        toast({
          title: 'Músicas adicionadas',
          description: 'As músicas foram adicionadas ao evento com sucesso.',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao adicionar músicas',
        description: 'Ocorreu um erro ao adicionar as músicas. Tente novamente.',
        variant: 'destructive'
      });
    }
  };

  const handleSongSelection = (songId: number) => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(selectedSongs.filter(id => id !== songId));
    } else {
      setSelectedSongs([...selectedSongs, songId]);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold tracking-tight">Gestão do Grupo de Música</h1>
        <p className="text-muted-foreground mt-1">Gerenciamento de músicos, instrumentos, disponibilidade e escalas</p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6"
      >
        <Tabs defaultValue="musicians">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 h-auto">
            <TabsTrigger value="musicians">Músicos</TabsTrigger>
            <TabsTrigger value="songs">Músicas</TabsTrigger>
            <TabsTrigger value="schedule">Escala</TabsTrigger>
            <TabsTrigger value="gantt">Cronograma</TabsTrigger>
          </TabsList>
          
          {/* Músicos Tab */}
          <TabsContent value="musicians" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Músicos</CardTitle>
                <CardDescription>
                  Gerenciamento de músicos, instrumentos e disponibilidade
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <DataTable 
                  columns={musicianColumns}
                  data={musicians}
                  searchable={true}
                  downloadable={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Músicas Tab */}
          <TabsContent value="songs" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Músicas Mais Tocadas</CardTitle>
                    <CardDescription>
                      Gerenciamento do repertório musical e frequência de uso
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <DataTable 
                      columns={songColumns}
                      data={songs}
                      searchable={true}
                      downloadable={true}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Nova Música</CardTitle>
                  <CardDescription>
                    Cadastre uma nova música no repertório
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...addSongForm}>
                    <form onSubmit={addSongForm.handleSubmit(handleAddSong)} className="space-y-4">
                      <FormField
                        control={addSongForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título da Música</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Grande é o Senhor" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addSongForm.control}
                        name="key"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tonalidade</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
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
                        control={addSongForm.control}
                        name="style"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estilo</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o estilo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {['Louvor', 'Adoração', 'Congregacional', 'Contemporâneo', 'Tradicional'].map((style) => (
                                  <SelectItem key={style} value={style}>{style}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Música
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Escala Tab */}
          <TabsContent value="schedule" className="mt-4">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Escala de Músicos</CardTitle>
                  <CardDescription>
                    Escala de músicos para os próximos eventos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Evento</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Horário</TableHead>
                        <TableHead>Músicos</TableHead>
                        <TableHead>Músicas</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules.map((schedule) => (
                        <TableRow key={schedule.id}>
                          <TableCell className="font-medium">{schedule.title}</TableCell>
                          <TableCell>{new Date(schedule.date).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>{schedule.time}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {schedule.musicians.map((m: any, i: number) => (
                                <div key={i} className="flex items-center">
                                  <Badge variant={m.confirmed ? "default" : "outline"} className="mr-1">
                                    {musicians.find(mus => mus.id === m.musicianId)?.name} ({m.instrument})
                                    {m.confirmed ? <Check className="ml-1 h-3 w-3" /> : <X className="ml-1 h-3 w-3" />}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {schedule.songs?.map((song: Song, i: number) => (
                                <Badge key={i} variant="secondary">{song.title} ({song.key})</Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Criar Novo Evento</CardTitle>
                    <CardDescription>
                      Agende um novo evento musical
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...addScheduleForm}>
                      <form onSubmit={addScheduleForm.handleSubmit(handleAddSchedule)} className="space-y-4">
                        <FormField
                          control={addScheduleForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do Evento</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Culto de Domingo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={addScheduleForm.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Data</FormLabel>
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                className="rounded-md border"
                                disabled={(date) => date < new Date()}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={addScheduleForm.control}
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
                        
                        <FormField
                          control={addScheduleForm.control}
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
                          control={addScheduleForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Descrição do evento..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Criar Evento
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Atribuir Músico</CardTitle>
                    <CardDescription>
                      Atribua músicos a um evento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...assignMusicianForm}>
                      <form onSubmit={assignMusicianForm.handleSubmit(handleAssignMusician)} className="space-y-4">
                        <FormField
                          control={assignMusicianForm.control}
                          name="scheduleId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Evento</FormLabel>
                              <Select 
                                onValueChange={(value) => field.onChange(parseInt(value))} 
                                defaultValue={field.value?.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o evento" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {schedules.map((schedule) => (
                                    <SelectItem key={schedule.id} value={schedule.id.toString()}>
                                      {schedule.title} - {new Date(schedule.date).toLocaleDateString('pt-BR')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={assignMusicianForm.control}
                          name="musicianId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Músico</FormLabel>
                              <Select 
                                onValueChange={(value) => field.onChange(parseInt(value))} 
                                defaultValue={field.value?.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o músico" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {musicians.map((musician) => (
                                    <SelectItem key={musician.id} value={musician.id.toString()}>
                                      {musician.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={assignMusicianForm.control}
                          name="instrument"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Instrumento</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o instrumento" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {['violão', 'guitarra', 'baixo', 'bateria', 'teclado', 'piano', 'vocal', 'violino', 'flauta', 'saxofone', 'trompete'].map((instrument) => (
                                    <SelectItem key={instrument} value={instrument}>{instrument}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Atribuir Músico
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Adicionar Músicas ao Evento</CardTitle>
                    <CardDescription>
                      Selecione as músicas para um evento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...addSongsToScheduleForm}>
                      <form onSubmit={addSongsToScheduleForm.handleSubmit(() => handleAddSongsToSchedule({ scheduleId: addSongsToScheduleForm.getValues().scheduleId, songIds: selectedSongs }))} className="space-y-4">
                        <FormField
                          control={addSongsToScheduleForm.control}
                          name="scheduleId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Evento</FormLabel>
                              <Select 
                                onValueChange={(value) => field.onChange(parseInt(value))} 
                                defaultValue={field.value?.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o evento" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {schedules.map((schedule) => (
                                    <SelectItem key={schedule.id} value={schedule.id.toString()}>
                                      {schedule.title} - {new Date(schedule.date).toLocaleDateString('pt-BR')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div>
                          <Label>Selecione as músicas</Label>
                          <div className="border rounded-md p-3 mt-2 space-y-2 max-h-[200px] overflow-y-auto">
                            {songs.map((song) => (
                              <div key={song.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`song-${song.id}`}
                                  checked={selectedSongs.includes(song.id)}
                                  onCheckedChange={() => handleSongSelection(song.id)}
                                />
                                <label
                                  htmlFor={`song-${song.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {song.title} ({song.key})
                                </label>
                              </div>
                            ))}
                          </div>
                          {selectedSongs.length === 0 && (
                            <p className="text-sm text-destructive mt-1">Selecione pelo menos uma música</p>
                          )}
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={selectedSongs.length === 0}
                        >
                          <Music className="mr-2 h-4 w-4" />
                          Adicionar Músicas
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Gantt Tab */}
          <TabsContent value="gantt" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Cronograma de Atividades</CardTitle>
                <CardDescription>
                  Visualização do cronograma em formato Gantt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Gantt Chart Header */}
                    <div className="flex border-b">
                      <div className="w-1/4 p-3 font-medium">Evento</div>
                      <div className="w-3/4 flex">
                        {[...Array(7)].map((_, i) => (
                          <div key={i} className="flex-1 p-3 text-center font-medium border-l">
                            {weekDays[i]}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Gantt Chart Body */}
                    {schedules.map((schedule) => {
                      // Calculate which day of week the event is on (0-6)
                      const eventDate = new Date(schedule.date);
                      const dayOfWeek = eventDate.getDay();
                      
                      // Calculate time slot position - simplistic calculation for visualization
                      const hour = parseInt(schedule.time.split(':')[0]);
                      const widthPercentage = 80; // Fixed width for now
                      
                      return (
                        <div key={schedule.id} className="flex border-b">
                          <div className="w-1/4 p-3">
                            <div className="font-medium">{schedule.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(schedule.date).toLocaleDateString('pt-BR')} - {schedule.time}
                            </div>
                          </div>
                          <div className="w-3/4 flex relative">
                            {[...Array(7)].map((_, i) => (
                              <div key={i} className="flex-1 p-3 border-l">
                                {i === dayOfWeek && (
                                  <div 
                                    className="absolute h-10 bg-primary/20 border-l-4 border-primary rounded-r-md flex items-center text-xs px-2 text-primary-foreground"
                                    style={{ 
                                      left: `calc(${(100/7) * dayOfWeek}% + 12px)`, 
                                      width: `calc(${widthPercentage}% - 24px)`,
                                      maxWidth: `calc(100% / 7 - 24px)`
                                    }}
                                  >
                                    {schedule.time}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Músicos</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{musicians.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {musicians.filter(m => m.instruments.includes('vocal')).length} vocais, 
                {musicians.length - musicians.filter(m => m.instruments.includes('vocal')).length} instrumentistas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Previstos</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schedules.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {schedules.length > 0 ? (
                  <>Próximo: {new Date(schedules[0].date).toLocaleDateString('pt-BR')} - {schedules[0].title}</>
                ) : (
                  'Nenhum evento previsto'
                )}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibilidade</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {musicians.filter(m => m.availability.some(a => a.period === 'manhã')).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Manhã</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {musicians.filter(m => m.availability.some(a => a.period === 'tarde')).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Tarde</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {musicians.filter(m => m.availability.some(a => a.period === 'noite')).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Noite</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Instrumentos do Grupo</CardTitle>
            <CardDescription>
              Distribuição de instrumentos entre os músicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['vocal', 'violão', 'bateria', 'baixo', 'teclado', 'violino', 'guitarra', 'piano'].map((instrument) => {
                const count = musicians.filter(m => m.instruments.includes(instrument as Instrument)).length;
                return (
                  <Card key={instrument} className={count > 0 ? '' : 'opacity-50'}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <Music className="h-5 w-5 mr-2 text-primary" />
                        <span>{instrument}</span>
                      </div>
                      <Badge>{count}</Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default MusicGroupManagement;
