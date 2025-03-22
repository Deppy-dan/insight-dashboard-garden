
import { Musician } from '@/types/musician';

// Dados simulados para músicos
const musicians: Musician[] = [
  {
    id: 1,
    userId: 2, // Associado ao usuário regular
    name: 'Usuário Padrão',
    instruments: ['violão', 'vocal'],
    availability: [
      { day: 'domingo', period: 'manhã' },
      { day: 'quarta', period: 'noite' },
    ],
    phoneNumber: '(11) 99999-8888',
    experience: '5 anos tocando na igreja'
  },
  {
    id: 2,
    userId: 1, // Associado ao admin
    name: 'Administrador',
    instruments: ['bateria', 'baixo'],
    availability: [
      { day: 'domingo', period: 'manhã' },
      { day: 'domingo', period: 'noite' },
      { day: 'terça', period: 'noite' },
    ],
    phoneNumber: '(11) 97777-6666',
    experience: '10 anos de experiência musical'
  },
  // Outros músicos
  {
    id: 3,
    userId: 3,
    name: 'João Silva',
    instruments: ['guitarra', 'violão'],
    availability: [
      { day: 'sábado', period: 'noite' },
      { day: 'domingo', period: 'manhã' },
    ],
  },
  {
    id: 4,
    userId: 4,
    name: 'Maria Oliveira',
    instruments: ['teclado', 'piano'],
    availability: [
      { day: 'domingo', period: 'manhã' },
      { day: 'quarta', period: 'noite' },
    ],
  }
];

export async function getMusicianByUserId(userId: number): Promise<Musician | null> {
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      const musician = musicians.find(m => m.userId === userId);
      resolve(musician || null);
    }, 500);
  });
}

export async function getAllMusicians(): Promise<Musician[]> {
  // Simula um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...musicians]);
    }, 500);
  });
}
