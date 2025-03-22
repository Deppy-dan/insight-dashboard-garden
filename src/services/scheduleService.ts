
import { Schedule } from '@/types/schedule';
import { getAllSongs } from './songService';

// Dados simulados para agendamentos
const schedules: Schedule[] = [
  {
    id: 1,
    date: '2024-09-25',
    time: '09:00',
    title: 'Culto de Domingo - Manhã',
    description: 'Culto regular de domingo pela manhã',
    location: 'Templo Principal',
    musicians: [
      { musicianId: 1, instrument: 'violão', confirmed: true },
      { musicianId: 2, instrument: 'bateria', confirmed: true },
      { musicianId: 4, instrument: 'teclado', confirmed: false }
    ],
    songs: [
      { id: 1, title: 'Grande é o Senhor', key: 'G', style: 'Louvor', lastPlayed: '15/05/2023', timesPlayed: 12 },
      { id: 3, title: 'Corpo e Família', key: 'E', style: 'Congregacional', lastPlayed: '04/06/2023', timesPlayed: 6 }
    ]
  },
  {
    id: 2,
    date: '2024-09-25',
    time: '19:00',
    title: 'Culto de Domingo - Noite',
    description: 'Culto regular de domingo à noite',
    location: 'Templo Principal',
    musicians: [
      { musicianId: 2, instrument: 'baixo', confirmed: true },
      { musicianId: 3, instrument: 'guitarra', confirmed: true }
    ],
    songs: [
      { id: 2, title: 'Deus é Deus', key: 'D', style: 'Adoração', lastPlayed: '28/05/2023', timesPlayed: 8 },
      { id: 5, title: 'Águas Purificadoras', key: 'D', style: 'Louvor', lastPlayed: '18/06/2023', timesPlayed: 4 }
    ]
  },
  {
    id: 3,
    date: '2024-09-28',
    time: '19:30',
    title: 'Culto de Jovens',
    description: 'Culto especial para jovens',
    location: 'Salão de Eventos',
    musicians: [
      { musicianId: 1, instrument: 'vocal', confirmed: false },
      { musicianId: 3, instrument: 'violão', confirmed: true }
    ],
    songs: [
      { id: 6, title: 'Revelation Song', key: 'D', style: 'Adoração', lastPlayed: '25/06/2023', timesPlayed: 3 },
      { id: 7, title: 'Maravilhosa Graça', key: 'G', style: 'Congregacional', lastPlayed: '02/07/2023', timesPlayed: 2 }
    ]
  },
  {
    id: 4,
    date: '2024-10-02',
    time: '19:30',
    title: 'Culto de Quarta',
    description: 'Culto regular de quarta-feira',
    location: 'Templo Principal',
    musicians: [
      { musicianId: 1, instrument: 'violão', confirmed: true },
      { musicianId: 4, instrument: 'teclado', confirmed: true }
    ],
    songs: [
      { id: 4, title: 'Tua Graça me Basta', key: 'C', style: 'Adoração', lastPlayed: '11/06/2023', timesPlayed: 5 },
      { id: 1, title: 'Grande é o Senhor', key: 'G', style: 'Louvor', lastPlayed: '15/05/2023', timesPlayed: 12 }
    ]
  }
];

export async function getSchedulesByMusicianId(musicianId: number): Promise<Schedule[]> {
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      const musicianSchedules = schedules.filter(
        schedule => schedule.musicians.some(m => m.musicianId === musicianId)
      );
      resolve(musicianSchedules);
    }, 500);
  });
}

export async function getAllSchedules(): Promise<Schedule[]> {
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...schedules]);
    }, 500);
  });
}

export async function addSchedule(schedule: Omit<Schedule, 'id'>): Promise<Schedule> {
  // Simulando a criação de um novo ID
  const newId = schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1;
  
  const newSchedule: Schedule = {
    ...schedule,
    id: newId
  };
  
  schedules.push(newSchedule);
  
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newSchedule);
    }, 500);
  });
}

export async function assignMusicianToSchedule(
  scheduleId: number, 
  musicianId: number, 
  instrument: string
): Promise<boolean> {
  // Encontrar o agendamento
  const schedule = schedules.find(s => s.id === scheduleId);
  if (!schedule) return Promise.resolve(false);
  
  // Verificar se o músico já está atribuído
  const existingAssignment = schedule.musicians.find(m => m.musicianId === musicianId);
  if (existingAssignment) {
    existingAssignment.instrument = instrument;
  } else {
    schedule.musicians.push({
      musicianId,
      instrument,
      confirmed: false
    });
  }
  
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}

export async function confirmMusicianAttendance(
  scheduleId: number,
  musicianId: number,
  confirmed: boolean
): Promise<boolean> {
  // Encontrar o agendamento
  const schedule = schedules.find(s => s.id === scheduleId);
  if (!schedule) return Promise.resolve(false);
  
  // Encontrar o músico no agendamento
  const musician = schedule.musicians.find(m => m.musicianId === musicianId);
  if (!musician) return Promise.resolve(false);
  
  // Atualizar confirmação
  musician.confirmed = confirmed;
  
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}

export async function addSongsToSchedule(
  scheduleId: number,
  songIds: number[]
): Promise<boolean> {
  // Encontrar o agendamento
  const schedule = schedules.find(s => s.id === scheduleId);
  if (!schedule) return Promise.resolve(false);
  
  // Obter todas as músicas
  const allSongs = await getAllSongs();
  
  // Filtrar as músicas pelos IDs fornecidos
  const songsToAdd = allSongs.filter(song => songIds.includes(song.id));
  
  // Atualizar as músicas do agendamento
  schedule.songs = songsToAdd;
  
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}
