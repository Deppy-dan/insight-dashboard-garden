
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { createSchedule, updateSchedule } from '@/services/scheduleService';
import { getAllMusicians } from '@/services/musicianService';
import { getAllSongs } from '@/services/songService';
import { Schedule } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Info, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Validation schema
const formSchema = z.object({
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  date: z.date(),
  time: z.string().min(1, 'Horário é obrigatório'),
  location: z.string().min(1, 'Local é obrigatório'),
  description: z.string().optional(),
  musicians: z.array(z.object({
    musicianId: z.number(),
    instrument: z.string(),
    confirmed: z.boolean().default(false)
  })).optional(),
  songs: z.array(z.number()).optional()
});

interface ScheduleFormProps {
  schedule?: Schedule;
  onSuccess: () => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ schedule, onSuccess }) => {
  const [selectedMusicians, setSelectedMusicians] = useState<any[]>(
    schedule?.musicians?.map(m => ({
      musicianId: m.musicianId,
      instrument: m.instrument,
      confirmed: m.confirmed
    })) || []
  );
  const [selectedSongs, setSelectedSongs] = useState<number[]>(
    schedule?.songs?.map(s => typeof s === 'number' ? s : s.id) || []
  );
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: schedule ? {
      ...schedule,
      date: new Date(schedule.date),
      musicians: selectedMusicians,
      songs: selectedSongs
    } : {
      title: '',
      date: new Date(),
      time: '',
      location: '',
      description: '',
      musicians: [],
      songs: []
    }
  });

  const { data: musicians, isLoading: isLoadingMusicians } = useQuery({
    queryKey: ['musicians'],
    queryFn: getAllMusicians,
  });

  const { data: songs, isLoading: isLoadingSongs } = useQuery({
    queryKey: ['songs'],
    queryFn: getAllSongs,
  });

  // Function to add a musician to the schedule
  const addMusician = (musicianId: number, instrument: string) => {
    if (selectedMusicians.some(m => m.musicianId === musicianId)) {
      toast.error('Este músico já foi adicionado');
      return;
    }
    
    const newMusicians = [
      ...selectedMusicians,
      { musicianId, instrument, confirmed: false }
    ];
    
    setSelectedMusicians(newMusicians);
    form.setValue('musicians', newMusicians);
  };

  // Function to remove a musician from the schedule
  const removeMusician = (musicianId: number) => {
    const newMusicians = selectedMusicians.filter(
      m => m.musicianId !== musicianId
    );
    
    setSelectedMusicians(newMusicians);
    form.setValue('musicians', newMusicians);
  };

  // Function to toggle musician confirmation
  const toggleConfirmation = (musicianId: number) => {
    const newMusicians = selectedMusicians.map(m => {
      if (m.musicianId === musicianId) {
        return { ...m, confirmed: !m.confirmed };
      }
      return m;
    });
    
    setSelectedMusicians(newMusicians);
    form.setValue('musicians', newMusicians);
  };

  // Function to add a song to the schedule
  const addSong = (songId: number) => {
    if (selectedSongs.includes(songId)) {
      toast.error('Esta música já foi adicionada');
      return;
    }
    
    const newSongs = [...selectedSongs, songId];
    setSelectedSongs(newSongs);
    form.setValue('songs', newSongs);
  };

  // Function to remove a song from the schedule
  const removeSong = (songId: number) => {
    const newSongs = selectedSongs.filter(id => id !== songId);
    setSelectedSongs(newSongs);
    form.setValue('songs', newSongs);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Prepare data for submission
      const submissionData = {
        ...data,
        date: format(data.date, 'yyyy-MM-dd'),
        musicians: selectedMusicians,
        songs: selectedSongs
      };
      
      if (schedule) {
        await updateSchedule(schedule.id, submissionData);
        toast.success('Escala atualizada com sucesso');
      } else {
        await createSchedule(submissionData);
        toast.success('Escala criada com sucesso');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar escala:', error);
      toast.error('Erro ao salvar escala');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 19:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
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
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição do evento" 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="musicians">
                <AccordionTrigger>Músicos</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Select
                        onValueChange={(value) => {
                          const musicianId = parseInt(value);
                          const musicianName = musicians?.find(m => m.id === musicianId)?.name;
                          if (musicianName) {
                            // Get musician's primary instrument
                            const primaryInstrument = musicians?.find(m => m.id === musicianId)?.instruments?.[0] || '';
                            addMusician(musicianId, primaryInstrument);
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um músico" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingMusicians ? (
                            <SelectItem value="loading" disabled>
                              Carregando músicos...
                            </SelectItem>
                          ) : musicians && musicians.length > 0 ? (
                            musicians.map((musician) => (
                              <SelectItem key={musician.id} value={musician.id.toString()}>
                                {musician.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="empty" disabled>
                              Nenhum músico encontrado
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      {selectedMusicians.length > 0 ? (
                        selectedMusicians.map((m) => {
                          const musician = musicians?.find(mus => mus.id === m.musicianId);
                          return (
                            <Card key={m.musicianId} className="hover-lift">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      checked={m.confirmed}
                                      onCheckedChange={() => toggleConfirmation(m.musicianId)}
                                    />
                                    <span className={m.confirmed ? 'font-medium' : ''}>
                                      {musician?.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Select
                                      value={m.instrument}
                                      onValueChange={(value) => {
                                        const newMusicians = selectedMusicians.map(mus => {
                                          if (mus.musicianId === m.musicianId) {
                                            return { ...mus, instrument: value };
                                          }
                                          return mus;
                                        });
                                        setSelectedMusicians(newMusicians);
                                        form.setValue('musicians', newMusicians);
                                      }}
                                    >
                                      <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Instrumento" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {musician?.instruments.map((inst) => (
                                          <SelectItem key={inst} value={inst}>
                                            {inst}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeMusician(m.musicianId)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                      ) : (
                        <div className="text-center p-4 text-muted-foreground">
                          Nenhum músico adicionado
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="songs">
                <AccordionTrigger>Músicas</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Select
                        onValueChange={(value) => {
                          const songId = parseInt(value);
                          addSong(songId);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma música" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingSongs ? (
                            <SelectItem value="loading" disabled>
                              Carregando músicas...
                            </SelectItem>
                          ) : songs && songs.length > 0 ? (
                            songs.map((song) => (
                              <SelectItem key={song.id} value={song.id.toString()}>
                                {song.title} - {song.artist}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="empty" disabled>
                              Nenhuma música encontrada
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      {selectedSongs.length > 0 ? (
                        selectedSongs.map((songId) => {
                          const song = songs?.find(s => s.id === songId);
                          return (
                            <Card key={songId} className="hover-lift">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div className="flex flex-col">
                                    <span className="font-medium">{song?.title}</span>
                                    <span className="text-sm text-muted-foreground">
                                      {song?.artist} - {song?.key}
                                    </span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSong(songId)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                      ) : (
                        <div className="text-center p-4 text-muted-foreground">
                          Nenhuma música adicionada
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess()}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {schedule ? 'Atualizar' : 'Criar'} Escala
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ScheduleForm;
