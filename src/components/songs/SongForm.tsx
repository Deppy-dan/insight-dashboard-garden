import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createSong, updateSong } from '../../services/songService';
import { Song } from '../../types/song';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

// List of musical keys
const MUSIC_KEYS = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
  'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm'
];

// List of song categories
const SONG_CATEGORIES = [
  'Louvor', 'Adoração', 'Congregacional', 'Contemporâneo', 'Hino Tradicional', 
  'Ceia', 'Ofertório', 'Abertura', 'Natal', 'Páscoa', 'Especial'
];

// Validation schema
const formSchema = z.object({
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  artist: z.string().min(2, 'Artista deve ter pelo menos 2 caracteres'),
  key: z.string().min(1, 'Selecione um tom'),
  tempo: z.coerce.number().min(40, 'Mínimo 40 BPM').max(240, 'Máximo 240 BPM'),
  lyrics: z.string().optional(),
  chords: z.string().optional(),
  category: z.string().min(1, 'Selecione uma categoria'),
  notes: z.string().optional()
});

interface SongFormProps {
  song?: Song;
  onSuccess: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ song, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: song ? {
      ...song
    } : {
      title: '',
      artist: '',
      key: '',
      tempo: 100,
      lyrics: '',
      chords: '',
      category: '',
      notes: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const songData = {
        title: data.title,
        artist: data.artist,
        key: data.key,
        tempo: data.tempo,
        category: data.category,
        lyrics: data.lyrics || '',
        chords: data.chords || '',
        style: 'Contemporâneo',
        lastPlayed: new Date().toISOString().split('T')[0],
        timesPlayed: 0,
        notes: data.notes || ''
      };
      
      if (song) {
        await updateSong(song.id, songData);
        toast.success('Música atualizada com sucesso');
      } else {
        await createSong(songData);
        toast.success('Música adicionada com sucesso');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar música:', error);
      toast.error('Erro ao salvar música');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título da música" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artista/Compositor</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do artista" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tom</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tom" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MUSIC_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tempo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Andamento (BPM)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={40} 
                    max={240} 
                    placeholder="100" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Entre 40 e 240 BPM
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SONG_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="lyrics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Letra</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Cole a letra da música aqui" 
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cifra</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Cole a cifra da música aqui" 
                  className="min-h-[200px] font-mono"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Observações sobre a música (arranjo, estrutura, etc)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess()}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {song ? 'Atualizar' : 'Adicionar'} Música
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SongForm;
