
import { Schedule } from '@/types/schedule';

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
