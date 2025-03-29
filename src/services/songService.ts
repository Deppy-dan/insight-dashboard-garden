
import api from './api';
import { Song } from '../types/song';

// Define a NewSong type for song creation without ID
export type NewSong = Omit<Song, 'id' | 'timesPlayed' | 'lastPlayed' | 'style'>;

// Mock data for songs
const songs: Song[] = [
  {
    id: 1,
    title: 'Grandioso És Tu',
    artist: 'Stuart K. Hine',
    key: 'D',
    tempo: 80,
    category: 'Adoração',
    style: 'Hino',
    timesPlayed: 12,
    lastPlayed: '2023-08-15',
    lyrics: 'Senhor meu Deus, quando eu maravilhado\nFico a pensar nas obras de Tuas mãos\nO céu azul de estrelas pontilhado\nO Teu poder mostrando a criação\n\nEntão minh\'alma canta a Ti, Senhor\nQuão grande és Tu, quão grande és Tu\nEntão minh\'alma canta a Ti, Senhor\nQuão grande és Tu, quão grande és Tu',
    chords: 'D        G         D\nSenhor meu Deus, quando eu maravilhado\nD       A        D\nFico a pensar nas obras de Tuas mãos\nD      G      D\nO céu azul de estrelas pontilhado\nD        A       D\nO Teu poder mostrando a criação'
  },
  {
    id: 2,
    title: 'Em Espírito, Em Verdade',
    artist: 'Ministério Vineyard',
    key: 'G',
    tempo: 75,
    category: 'Louvor',
    style: 'Contemporâneo',
    timesPlayed: 8,
    lastPlayed: '2023-09-01',
    lyrics: 'Em espírito, em verdade\nTe adoramos, te adoramos\nEm espírito, em verdade\nTe adoramos, te adoramos\n\nRei dos reis e Senhor\nTe entregamos nosso viver\nRei dos reis e Senhor\nTe entregamos nosso viver',
    chords: 'G             C\nEm espírito, em verdade\nG                 D\nTe adoramos, te adoramos\nG             C\nEm espírito, em verdade\nG       D        G\nTe adoramos, te adoramos'
  },
  {
    id: 3,
    title: 'Maranata',
    artist: 'Ministério Avivah',
    key: 'Em',
    tempo: 138,
    category: 'Congregacional',
    style: 'Contemporâneo',
    timesPlayed: 5,
    lastPlayed: '2023-09-10',
    lyrics: 'Tu és a minha luz, a minha salvação\nE a Ti me renderei\nE se em Ti confiar, não hei de temer\nMeu coração vai cantar\n\nTu és a minha luz, a minha salvação\nA Ti me renderei\nE se em Ti confiar, não hei de temer\nMeu coração vai cantar\n\nMaranata, ora vem\nMaranata, ora vem, Senhor Jesus',
    chords: 'Em          C           G          D\nTu és a minha luz, a minha salvação\nEm        C     D\nE a Ti me renderei\nEm       C        G         D\nE se em Ti confiar, não hei de temer\nEm     C       D\nMeu coração vai cantar'
  },
  {
    id: 4,
    title: 'Deus Está Aqui',
    artist: 'Adhemar de Campos',
    key: 'C',
    tempo: 65,
    category: 'Congregacional',
    style: 'Hino',
    timesPlayed: 15,
    lastPlayed: '2023-08-27',
    lyrics: 'Deus está aqui\nTão certo como o ar que eu respiro\nTão certo como o amanhã que se levanta\nTão certo como eu te falo\nE podes me ouvir\n\nDeus está aqui\nTão certo como o ar que eu respiro\nTão certo como o amanhã que se levanta\nTão certo como eu te falo\nE podes me ouvir\n\nPodes me ouvir',
    chords: 'C           G\nDeus está aqui\nC                              F\nTão certo como o ar que eu respiro\nC                                     G\nTão certo como o amanhã que se levanta\nC                F\nTão certo como eu te falo\nG          C\nE podes me ouvir'
  }
];

export const getAllSongs = async (): Promise<Song[]> => {
  try {
    const response = await api.get('/songs');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar músicas da API, usando dados mock:', error);
    // Caso a API ainda não esteja implementada, retorna dados mock
    return songs;
  }
};

export const getSongById = async (id: number): Promise<Song | undefined> => {
  try {
    const response = await api.get(`/songs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar música da API, usando dados mock:', error);
    // Caso a API ainda não esteja implementada, retorna dados mock
    return songs.find(song => song.id === id);
  }
};

export const createSong = async (song: Omit<Song, 'id'>): Promise<Song> => {
  try {
    const response = await api.post('/songs', song);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar música na API, usando dados mock:', error);
    // Caso a API ainda não esteja implementada, simula criação com dados mock
    const newSong = {
      ...song,
      id: songs.length + 1
    };
    songs.push(newSong);
    return newSong;
  }
};

export const updateSong = async (id: number, updates: Partial<Song>): Promise<Song> => {
  try {
    const response = await api.put(`/songs/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar música na API, usando dados mock:', error);
    // Caso a API ainda não esteja implementada, simula atualização com dados mock
    const index = songs.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Música não encontrada');
    
    songs[index] = { ...songs[index], ...updates };
    return songs[index];
  }
};

export const deleteSong = async (id: number): Promise<void> => {
  try {
    await api.delete(`/songs/${id}`);
  } catch (error) {
    console.error('Erro ao excluir música na API, usando dados mock:', error);
    // Caso a API ainda não esteja implementada, simula exclusão com dados mock
    const index = songs.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Música não encontrada');
    
    songs.splice(index, 1);
  }
};

// Funções adicionais que estavam faltando
export const updateScheduleWithSongs = async (scheduleId: number, songIds: number[]): Promise<void> => {
  try {
    await api.post(`/schedules/${scheduleId}/songs`, { songs: songIds });
  } catch (error) {
    console.error('Erro ao atualizar músicas da escala:', error);
    // Implementação mock apenas para evitar erros
  }
};

export const addSong = async (song: NewSong): Promise<Song> => {
  const fullSong: Omit<Song, 'id'> = {
    ...song,
    style: 'Contemporâneo',
    timesPlayed: 0,
    lastPlayed: new Date().toISOString().split('T')[0]
  };
  return createSong(fullSong);
};
