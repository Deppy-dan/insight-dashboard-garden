
import { Song } from '@/types/musician';

// Dados simulados para músicas
const songs: Song[] = [
  { 
    id: 1, 
    title: 'Grande é o Senhor', 
    key: 'G', 
    style: 'Louvor',
    lastPlayed: '15/05/2023',
    timesPlayed: 12
  },
  { 
    id: 2, 
    title: 'Deus é Deus', 
    key: 'D', 
    style: 'Adoração',
    lastPlayed: '28/05/2023',
    timesPlayed: 8
  },
  { 
    id: 3, 
    title: 'Corpo e Família', 
    key: 'E', 
    style: 'Congregacional',
    lastPlayed: '04/06/2023',
    timesPlayed: 6
  },
  { 
    id: 4, 
    title: 'Tua Graça me Basta', 
    key: 'C', 
    style: 'Adoração',
    lastPlayed: '11/06/2023',
    timesPlayed: 5
  },
  { 
    id: 5, 
    title: 'Águas Purificadoras', 
    key: 'D', 
    style: 'Louvor',
    lastPlayed: '18/06/2023',
    timesPlayed: 4
  },
  { 
    id: 6, 
    title: 'Revelation Song', 
    key: 'D', 
    style: 'Adoração',
    lastPlayed: '25/06/2023',
    timesPlayed: 3
  },
  { 
    id: 7, 
    title: 'Maravilhosa Graça', 
    key: 'G', 
    style: 'Congregacional',
    lastPlayed: '02/07/2023',
    timesPlayed: 2
  },
];

export async function getAllSongs(): Promise<Song[]> {
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...songs]);
    }, 500);
  });
}

export async function addSong(song: Omit<Song, 'id'>): Promise<Song> {
  // Simulando a criação de um novo ID
  const newId = songs.length > 0 ? Math.max(...songs.map(s => s.id)) + 1 : 1;
  
  const newSong: Song = {
    ...song,
    id: newId,
    timesPlayed: song.timesPlayed || 0
  };
  
  songs.push(newSong);
  
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newSong);
    }, 500);
  });
}

export async function updateScheduleWithSongs(scheduleId: number, songIds: number[]): Promise<boolean> {
  // Simulação de atualização de agendamento com músicas
  console.log(`Atualizando agendamento ${scheduleId} com músicas: ${songIds.join(', ')}`);
  
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}
