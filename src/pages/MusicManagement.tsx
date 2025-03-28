import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Globe, Music, UserPlus, Users } from 'lucide-react';
import { getAllSchedules, getScheduleById, createSchedule, updateSchedule, deleteSchedule } from '@/services/scheduleService';
import { getAllMusicians } from '@/services/musicianService';
import { Song } from '@/types/song';
import { Musician } from '@/types/musician';
import { Schedule } from '@/types/schedule';
import { createSong, updateSong, getAllSongs } from '@/services/songService';

const MusicManagement = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [newSong, setNewSong] = useState<Omit<Song, 'id'>>({
    title: '',
    artist: '',
    key: '',
    tempo: 120,
    category: '',
    lyrics: '',
    chords: '',
  });

  useEffect(() => {
    const loadData = async () => {
      const schedulesData = await getAllSchedules();
      setSchedules(schedulesData);

      const musiciansData = await getAllMusicians();
      setMusicians(musiciansData);

      const songsData = await getAllSongs();
      setSongs(songsData);
    };

    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSong(prevSong => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handleCreateSong = async () => {
    await createSong(newSong);
    const updatedSongs = await getAllSongs();
    setSongs(updatedSongs);
    setNewSong({
      title: '',
      artist: '',
      key: '',
      tempo: 120,
      category: '',
      lyrics: '',
      chords: '',
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Gerenciamento de Música | MúsicaIgreja</title>
      </Helmet>

      <div className="container mx-auto py-10">
        <Tabs defaultValue="songs" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="songs">Músicas</TabsTrigger>
            <TabsTrigger value="schedules">Escalas</TabsTrigger>
            <TabsTrigger value="musicians">Músicos</TabsTrigger>
          </TabsList>
          <TabsContent value="songs">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Nova Música</CardTitle>
                <CardDescription>Preencha os detalhes da música para adicionar ao repertório.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input type="text" id="title" name="title" value={newSong.title} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="artist">Artista</Label>
                  <Input type="text" id="artist" name="artist" value={newSong.artist} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="key">Tom</Label>
                  <Input type="text" id="key" name="key" value={newSong.key} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tempo">Tempo (BPM)</Label>
                  <Input type="number" id="tempo" name="tempo" value={newSong.tempo} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input type="text" id="category" name="category" value={newSong.category} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lyrics">Letra</Label>
                  <Input type="text" id="lyrics" name="lyrics" value={newSong.lyrics} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="chords">Cifras</Label>
                  <Input type="text" id="chords" name="chords" value={newSong.chords} onChange={handleInputChange} />
                </div>
                <Button onClick={handleCreateSong}>Adicionar Música</Button>
              </CardContent>
            </Card>
            <ul>
              {songs.map(song => (
                <li key={song.id}>{song.title} - {song.artist}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="schedules">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Escalas</CardTitle>
                <CardDescription>Visualize e gerencie as escalas de música.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <ul>
                  {schedules.map(schedule => (
                    <li key={schedule.id}>{schedule.title} - {schedule.date}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="musicians">
            <Card>
              <CardHeader>
                <CardTitle>Músicos</CardTitle>
                <CardDescription>Gerencie os músicos da igreja.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <ul>
                  {musicians.map(musician => (
                    <li key={musician.id}>{musician.name} - {musician.instruments.join(', ')}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MusicManagement;
