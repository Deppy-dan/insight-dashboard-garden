
import { Musician } from './musician';

export interface Schedule {
  id: number;
  date: string;
  time: string;
  title: string;
  description?: string;
  location?: string;
  musicians: {
    musicianId: number;
    musician?: Musician;
    instrument: string;
    confirmed: boolean;
  }[];
}
