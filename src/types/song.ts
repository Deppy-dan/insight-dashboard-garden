
export interface Song {
  id: number;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  lyrics?: string;
  chords?: string;
  category: string;
  notes?: string;
  style?: string;
  timesPlayed?: number;
  lastPlayed?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
