
import { Schedule } from '@/types/schedule';
import { Song } from '@/types/musician';
import { getAllSongs } from './songService';

// Mock data for schedules
const schedules: Schedule[] = [
  {
    id: 1,
    title: 'Culto de Domingo',
    date: '2023-09-10',
    time: '19:00',
    location: 'Templo Principal',
    description: 'Culto de celebração dominical',
    musicians: [
      { musicianId: 1, instrument: 'Guitarra', confirmed: true },
      { musicianId: 2, instrument: 'Piano', confirmed: true },
      { musicianId: 3, instrument: 'Bateria', confirmed: false }
    ],
    songs: []
  },
  {
    id: 2,
    title: 'Reunião de Jovens',
    date: '2023-09-16',
    time: '20:00',
    location: 'Salão Multiuso',
    description: 'Encontro semanal da juventude',
    musicians: [
      { musicianId: 1, instrument: 'Violão', confirmed: true },
      { musicianId: 4, instrument: 'Baixo', confirmed: true }
    ],
    songs: []
  }
];

// Initialize the songs in schedules
(async () => {
  const allSongs = await getAllSongs();
  if (allSongs.length > 0) {
    schedules[0].songs = [allSongs[0], allSongs[2]];
    schedules[1].songs = [allSongs[1], allSongs[3]];
  }
})();

export const getAllSchedules = async (): Promise<Schedule[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return schedules;
};

export const getScheduleById = async (id: number): Promise<Schedule | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return schedules.find(schedule => schedule.id === id);
};

// Add the missing function to get schedules by musician ID
export const getSchedulesByMusicianId = async (musicianId: number): Promise<Schedule[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return schedules.filter(schedule => 
    schedule.musicians.some(musician => musician.musicianId === musicianId)
  );
};

export const createSchedule = async (schedule: Omit<Schedule, 'id'>): Promise<Schedule> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newSchedule = {
    ...schedule,
    id: schedules.length + 1
  };
  schedules.push(newSchedule);
  return newSchedule;
};

export const updateSchedule = async (id: number, updates: Partial<Schedule>): Promise<Schedule> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = schedules.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Schedule not found');
  
  schedules[index] = { ...schedules[index], ...updates };
  return schedules[index];
};

export const deleteSchedule = async (id: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = schedules.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Schedule not found');
  
  schedules.splice(index, 1);
};
