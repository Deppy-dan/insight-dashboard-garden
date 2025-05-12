
import React, { useState } from 'react';
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { PlusCircle } from "lucide-react";
import { toast } from "../../hooks/use-toast";

const musicKeys = [
  'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 
  'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'
];

const musicStyles = [
  'Adoração', 'Louvor', 'Congregacional', 'Contemporâneo', 
  'Tradicional', 'Gospel', 'Outro'
];

const AddSongDialog = ({ onAddSong }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    key: '',
    style: '',
    lyrics: '',
    chords: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would send the formData to your API
      // const response = await addSong(formData);
      
      // For now, simulate a successful response
      setTimeout(() => {
        if (onAddSong) {
          onAddSong({
            id: Date.now().toString(),
            ...formData
          });
        }
        
        toast({
          title: "Música adicionada!",
          description: `${formData.title} foi adicionada com sucesso.`,
        });
        
        setFormData({
          title: '',
          artist: '',
          key: '',
          style: '',
          lyrics: '',
          chords: '',
          notes: ''
        });
        
        setOpen(false);
      }, 500);
      
    } catch (error) {
      console.error('Error adding song:', error);
      toast({
        variant: "destructive",
        title: "Erro ao adicionar música",
        description: "Ocorreu um erro ao adicionar a música. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex gap-2 items-center">
          <PlusCircle className="h-4 w-4" /> Adicionar música
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar nova música</DialogTitle>
            <DialogDescription>
              Preencha os dados da música para adicionar ao repertório.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist">Artista/Autor</Label>
                <Input
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="key">Tonalidade</Label>
                <Select name="key" value={formData.key} onValueChange={(value) => handleSelectChange('key', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a tonalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {musicKeys.map((key) => (
                      <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="style">Estilo</Label>
                <Select name="style" value={formData.style} onValueChange={(value) => handleSelectChange('style', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    {musicStyles.map((style) => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lyrics">Letra</Label>
              <Textarea
                id="lyrics"
                name="lyrics"
                value={formData.lyrics}
                onChange={handleChange}
                placeholder="Letra da música"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chords">Cifra</Label>
              <Textarea
                id="chords"
                name="chords"
                value={formData.chords}
                onChange={handleChange}
                placeholder="Cifra da música"
                className="min-h-[100px] font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notas adicionais sobre a música"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adicionando..." : "Adicionar música"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
