
import { Musician } from './musician';
import { Song } from './musician';

export interface Schedule {
  id: number;
  date: string;
  time: string;
  title: string;
  description?: string;
  location?: string;
  songs?: Song[];
  musicians: {
    musicianId: number;
    musician?: Musician;
    instrument: string;
    confirmed: boolean;
  }[];
}
