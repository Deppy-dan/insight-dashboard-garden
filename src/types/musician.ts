
export interface Musician {
  id: number;
  name: string;
  email: string;
  phone: string;
  instruments: string[];
  availability: { day: string; period: string }[];
  skillLevel: string;
  joined: string;
}

export interface Instrument {
  id: number;
  name: string;
}

// Using export type for re-exporting when isolatedModules is enabled
import { Song } from './song';
export type { Song };
