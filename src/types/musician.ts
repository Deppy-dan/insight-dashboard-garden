
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

export interface Song {
  id: number;
  title: string;
  key: string;
  style: string;
  timesPlayed?: number;
  lastPlayed?: string | null;
}
