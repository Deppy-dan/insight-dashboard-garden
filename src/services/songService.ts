
import { Song } from '@/types/musician';

// Mock data for songs
const songs: Song[] = [
  {
    id: 1,
    title: 'Grande é o Senhor',
    key: 'E',
    style: 'Adoração',
    timesPlayed: 12,
    lastPlayed: '2023-07-15'
  },
  {
    id: 2,
    title: 'Deus é Deus',
    key: 'G',
    style: 'Louvor',
    timesPlayed: 8,
    lastPlayed: '2023-08-02'
  },
  {
    id: 3,
    title: 'Santo Espírito',
    key: 'D',
    style: 'Adoração',
    timesPlayed: 15,
    lastPlayed: '2023-07-30'
  },
  {
    id: 4,
    title: 'Oceans',
    key: 'D',
    style: 'Contemporâneo',
    timesPlayed: 6,
    lastPlayed: '2023-06-10'
  }
];

export const getAllSongs = async (): Promise<Song[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return songs;
};

export const getSongById = async (id: number): Promise<Song | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return songs.find(song => song.id === id);
};

export const addSong = async (song: Omit<Song, 'id'>): Promise<Song> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newSong = {
    ...song,
    id: songs.length + 1
  };
  songs.push(newSong);
  return newSong;
};

export const updateSong = async (id: number, updates: Partial<Song>): Promise<Song> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = songs.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Song not found');
  
  songs[index] = { ...songs[index], ...updates };
  return songs[index];
};

export const deleteSong = async (id: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = songs.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Song not found');
  
  songs.splice(index, 1);
};

export const updateScheduleWithSongs = async (scheduleId: number, songIds: number[]): Promise<void> => {
  // This would be an API call to update a schedule with songs
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Updated schedule ${scheduleId} with songs: ${songIds.join(', ')}`);
};
