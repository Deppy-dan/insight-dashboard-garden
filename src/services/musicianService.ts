
import { Musician } from '@/types/musician';

// This is a mock service that would be replaced with real API calls to your Laravel backend
const musicians: Musician[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '(11) 98765-4321',
    instruments: ['Guitarra', 'Violão'],
    availability: ['Segunda', 'Quarta', 'Sexta'],
    skillLevel: 'Avançado',
    joined: '2022-01-15'
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    phone: '(11) 91234-5678',
    instruments: ['Piano', 'Teclado'],
    availability: ['Terça', 'Quinta', 'Sábado'],
    skillLevel: 'Intermediário',
    joined: '2022-03-10'
  },
  {
    id: 3,
    name: 'Pedro Santos',
    email: 'pedro.santos@example.com',
    phone: '(11) 99876-5432',
    instruments: ['Bateria'],
    availability: ['Segunda', 'Quinta', 'Domingo'],
    skillLevel: 'Avançado',
    joined: '2021-11-20'
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    phone: '(11) 98765-1234',
    instruments: ['Baixo', 'Contrabaixo'],
    availability: ['Quarta', 'Sexta', 'Sábado'],
    skillLevel: 'Intermediário',
    joined: '2022-02-05'
  },
];

// Fix the function name to match what's being imported in the components
export const getAllMusicians = async (): Promise<Musician[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return musicians;
};

export const getMusicianById = async (id: number): Promise<Musician | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return musicians.find(musician => musician.id === id);
};

export const createMusician = async (musician: Omit<Musician, 'id'>): Promise<Musician> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newMusician = {
    ...musician,
    id: musicians.length + 1
  };
  musicians.push(newMusician);
  return newMusician;
};

export const updateMusician = async (id: number, updates: Partial<Musician>): Promise<Musician> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = musicians.findIndex(m => m.id === id);
  if (index === -1) throw new Error('Musician not found');
  
  musicians[index] = { ...musicians[index], ...updates };
  return musicians[index];
};

export const deleteMusician = async (id: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = musicians.findIndex(m => m.id === id);
  if (index === -1) throw new Error('Musician not found');
  
  musicians.splice(index, 1);
};
