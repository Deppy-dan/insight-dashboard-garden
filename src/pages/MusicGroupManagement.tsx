
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { Checkbox } from '@/components/ui/checkbox';
import { ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import { BarChart4, CalendarIcon, Clock, Music, UserCheck } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';

// Mock data for musicians
const musiciansData = [
  { 
    id: 1, 
    nome: 'João Silva', 
    instrumento: 'Violão', 
    disponibilidade: 'Manhã, Tarde', 
    dias: 'Dom, Qua', 
    tom: 'G, D, E', 
    experiencia: 'Avançado' 
  },
  { 
    id: 2, 
    nome: 'Maria Oliveira', 
    instrumento: 'Vocal', 
    disponibilidade: 'Tarde, Noite', 
    dias: 'Dom, Sex', 
    tom: 'C, D, F', 
    experiencia: 'Intermediário' 
  },
  { 
    id: 3, 
    nome: 'Carlos Santos', 
    instrumento: 'Bateria', 
    disponibilidade: 'Manhã, Noite', 
    dias: 'Dom, Ter, Sáb', 
    tom: 'Todos', 
    experiencia: 'Avançado' 
  },
  { 
    id: 4, 
    nome: 'Ana Beatriz', 
    instrumento: 'Teclado', 
    disponibilidade: 'Tarde', 
    dias: 'Dom, Qui', 
    tom: 'C, G, A', 
    experiencia: 'Intermediário' 
  },
  { 
    id: 5, 
    nome: 'Pedro Alves', 
    instrumento: 'Baixo', 
    disponibilidade: 'Noite', 
    dias: 'Dom, Qua, Sex', 
    tom: 'E, A, D', 
    experiencia: 'Iniciante' 
  },
  { 
    id: 6, 
    nome: 'Luiza Ferreira', 
    instrumento: 'Violino', 
    disponibilidade: 'Manhã, Tarde', 
    dias: 'Dom, Sáb', 
    tom: 'D, A, E', 
    experiencia: 'Avançado' 
  },
  { 
    id: 7, 
    nome: 'Fernando Costa', 
    instrumento: 'Vocal', 
    disponibilidade: 'Manhã, Tarde, Noite', 
    dias: 'Dom, Ter, Qui, Sáb', 
    tom: 'G, A, B', 
    experiencia: 'Avançado' 
  },
];

// Table columns configuration
const musicianColumns = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Instrumento', key: 'instrumento' },
  { 
    title: 'Disponibilidade', 
    key: 'disponibilidade',
    render: (value: string) => (
      <div className="flex flex-wrap gap-1">
        {value.split(', ').map((time, index) => (
          <Badge key={index} variant={
            time === 'Manhã' ? 'default' : 
            time === 'Tarde' ? 'secondary' : 
            'outline'
          }>
            {time}
          </Badge>
        ))}
      </div>
    )
  },
  { title: 'Dias', key: 'dias' },
  { title: 'Tom Preferido', key: 'tom' },
  { 
    title: 'Experiência', 
    key: 'experiencia',
    render: (value: string) => {
      let className = '';
      if (value === 'Avançado') className = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      else if (value === 'Intermediário') className = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      else className = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
          {value}
        </span>
      );
    }
  },
];

// Gantt chart data
const scheduleData = [
  { 
    id: 1, 
    title: 'Ensaio Geral', 
    start: new Date(2023, 5, 10, 19, 0), 
    end: new Date(2023, 5, 10, 21, 0),
    members: ['João', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Luiza'] 
  },
  { 
    id: 2, 
    title: 'Ensaio Vocal', 
    start: new Date(2023, 5, 12, 18, 0), 
    end: new Date(2023, 5, 12, 19, 30),
    members: ['Maria', 'Fernando'] 
  },
  { 
    id: 3, 
    title: 'Culto Domingo', 
    start: new Date(2023, 5, 14, 9, 0), 
    end: new Date(2023, 5, 14, 12, 0),
    members: ['João', 'Maria', 'Carlos', 'Ana', 'Fernando'] 
  },
  { 
    id: 4, 
    title: 'Preparação Louvor', 
    start: new Date(2023, 5, 16, 19, 0), 
    end: new Date(2023, 5, 16, 20, 30),
    members: ['João', 'Pedro', 'Luiza'] 
  },
  { 
    id: 5, 
    title: 'Culto Quarta', 
    start: new Date(2023, 5, 17, 19, 0), 
    end: new Date(2023, 5, 17, 21, 0),
    members: ['João', 'Maria', 'Pedro', 'Fernando'] 
  },
];

// Days of the week
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const MusicGroupManagement: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  
  // Handle day selection
  const handleDayToggle = (day: string) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
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
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto">
            <TabsTrigger value="musicians">Músicos</TabsTrigger>
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
                  data={musiciansData}
                  searchPlaceholder="Buscar músico..."
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Escala Tab */}
          <TabsContent value="schedule" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scheduleData.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>{format(event.start, 'dd/MM/yyyy')}</TableCell>
                            <TableCell>{`${format(event.start, 'HH:mm')} - ${format(event.end, 'HH:mm')}`}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {event.members.map((member, i) => (
                                  <Badge key={i} variant="outline">{member}</Badge>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar à Escala</CardTitle>
                  <CardDescription>
                    Adicione músicos a um evento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Nome do Evento</Label>
                    <Input id="eventName" placeholder="Ex: Ensaio Geral" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <div className="border rounded-md p-2">
                      <Calendar 
                        mode="single" 
                        selected={date} 
                        onSelect={setDate} 
                        className="rounded-md border w-full" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Horário Início</Label>
                      <Input id="startTime" type="time" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endTime">Horário Fim</Label>
                      <Input id="endTime" type="time" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Músicos</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione músicos" />
                      </SelectTrigger>
                      <SelectContent>
                        {musiciansData.map((musician) => (
                          <SelectItem key={musician.id} value={musician.id.toString()}>
                            {musician.nome} ({musician.instrumento})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">Adicionar à Escala</Button>
                </CardContent>
              </Card>
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
                    {scheduleData.map((event) => {
                      // Calculate which day of week the event is on (0-6)
                      const dayOfWeek = event.start.getDay();
                      // Calculate duration in hours
                      const durationHours = (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60);
                      // Calculate width percentage based on duration (assuming max 3 hours per event)
                      const widthPercentage = Math.min(100, (durationHours / 3) * 100);
                      
                      return (
                        <div key={event.id} className="flex border-b">
                          <div className="w-1/4 p-3">
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {format(event.start, 'dd/MM HH:mm')} - {format(event.end, 'HH:mm')}
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
                                    {format(event.start, 'HH:mm')}
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
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{musiciansData.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {musiciansData.filter(m => m.instrumento === 'Vocal').length} vocais, {musiciansData.length - musiciansData.filter(m => m.instrumento === 'Vocal').length} instrumentistas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Previstos</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduleData.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Próximo: {format(scheduleData[0].start, 'dd/MM')} - {scheduleData[0].title}
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
                  <div className="text-xl font-bold">{musiciansData.filter(m => m.disponibilidade.includes('Manhã')).length}</div>
                  <p className="text-xs text-muted-foreground">Manhã</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{musiciansData.filter(m => m.disponibilidade.includes('Tarde')).length}</div>
                  <p className="text-xs text-muted-foreground">Tarde</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{musiciansData.filter(m => m.disponibilidade.includes('Noite')).length}</div>
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
              {['Vocal', 'Violão', 'Bateria', 'Baixo', 'Teclado', 'Violino', 'Guitarra', 'Percussão'].map((instrument) => {
                const count = musiciansData.filter(m => m.instrumento === instrument).length;
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
