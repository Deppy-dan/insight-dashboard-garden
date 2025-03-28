
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
  createdAt?: string;
  updatedAt?: string;
}
