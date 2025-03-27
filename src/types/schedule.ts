
import { Song } from './musician';

export interface ScheduleMusician {
  musicianId: number;
  instrument: string;
  confirmed: boolean;
}

export interface Schedule {
  id: number;
  title: string;
  date: string;
  time: string;
  description?: string;
  location?: string;
  musicians: ScheduleMusician[];
  songs: Song[];
}
