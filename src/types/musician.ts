
import { User } from './user';

export type Instrument = 'violão' | 'guitarra' | 'baixo' | 'bateria' | 'teclado' | 'piano' | 'vocal' | 'violino' | 'flauta' | 'saxofone' | 'trompete';

export interface Musician {
  id: number;
  userId: number;
  user?: User;
  name: string;
  instruments: Instrument[];
  availability: {
    day: string;
    period: 'manhã' | 'tarde' | 'noite';
  }[];
  phoneNumber?: string;
  experience?: string;
}

export interface Song {
  id: number;
  title: string;
  key: string;
  style: string;
  lastPlayed?: string;
  timesPlayed: number;
}
