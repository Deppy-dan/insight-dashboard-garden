
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";
import { Song } from '@/types/musician';
import { createSong } from '@/services/songService';
import { format } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

const songFormSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  key: z.string().min(1, {
    message: "A tonalidade deve ter pelo menos 1 caractere.",
  }),
  style: z.string().min(2, {
    message: "O estilo deve ter pelo menos 2 caracteres.",
  }),
  timesPlayed: z.number().optional(),
  lastPlayed: z.date().optional(),
});

type SongDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AddSongDialog: React.FC<SongDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const songForm = useForm<z.infer<typeof songFormSchema>>({
    resolver: zodResolver(songFormSchema),
    defaultValues: {
      title: "",
      key: "",
      style: "",
    },
  });

  const addSongMutation = useMutation({
    mutationFn: (formData: z.infer<typeof songFormSchema>) => {
      const newSong: Omit<Song, 'id'> = {
        title: formData.title || "",
        key: formData.key || "",
        artist: "Desconhecido",
        tempo: 0,
        category: "Geral",
        style: formData.style || "",
        timesPlayed: formData.timesPlayed || 0,
        lastPlayed: formData.lastPlayed ? format(formData.lastPlayed, 'yyyy-MM-dd') : null
      };
      return createSong(newSong);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      songForm.reset();
      onOpenChange(false);
      toast({
        title: "Música adicionada",
        description: "A música foi adicionada com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao adicionar música",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleAddSong = async (values: z.infer<typeof songFormSchema>) => {
    addSongMutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Música
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Música</DialogTitle>
          <DialogDescription>
            Adicione uma nova música ao repertório da igreja.
          </DialogDescription>
        </DialogHeader>
        <Form {...songForm}>
          <form onSubmit={songForm.handleSubmit(handleAddSong)} className="space-y-4">
            <FormField
              control={songForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da música" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={songForm.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tonalidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Tom da música" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={songForm.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estilo</FormLabel>
                  <FormControl>
                    <Input placeholder="Estilo da música" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Adicionar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
