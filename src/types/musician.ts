
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

// Removendo esta interface Song que está em conflito com src/types/song.ts
// e importando a interface Song correta do arquivo song.ts
import { Song } from './song';
export { Song };
