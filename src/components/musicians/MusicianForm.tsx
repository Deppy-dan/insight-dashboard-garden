
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { createMusician, updateMusician } from '@/services/musicianService';
import { Musician } from '@/types/musician';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// List of common instruments
const INSTRUMENTS = [
  'Violão', 'Guitarra', 'Baixo', 'Bateria', 'Piano', 'Teclado', 
  'Violino', 'Contrabaixo', 'Flauta', 'Saxofone', 'Trompete',
  'Vocal/Canto', 'Outros'
];

// List of days of the week
const DAYS = [
  'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
];

// List of periods
const PERIODS = ['Manhã', 'Tarde', 'Noite'];

// List of skill levels
const SKILL_LEVELS = ['Iniciante', 'Intermediário', 'Avançado', 'Profissional'];

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Telefone deve ter pelo menos 8 dígitos'),
  instruments: z.array(z.string()).min(1, 'Selecione pelo menos um instrumento'),
  availability: z.array(z.object({
    day: z.string(),
    period: z.string()
  })).optional(),
  skillLevel: z.string().min(1, 'Selecione o nível de habilidade'),
  joined: z.date().optional()
});

interface MusicianFormProps {
  musician?: Musician;
  onSuccess: () => void;
}

const MusicianForm: React.FC<MusicianFormProps> = ({ musician, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: musician ? {
      ...musician,
      joined: musician.joined ? new Date(musician.joined) : undefined,
      // Ensure availability is in the correct format
      availability: musician.availability || []
    } : {
      name: '',
      email: '',
      phone: '',
      instruments: [],
      availability: [],
      skillLevel: '',
      joined: new Date()
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (musician) {
        await updateMusician(musician.id, data);
        toast.success('Músico atualizado com sucesso');
      } else {
        await createMusician(data);
        toast.success('Músico adicionado com sucesso');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar músico:', error);
      toast.error('Erro ao salvar músico');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do músico" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="Telefone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="instruments"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Instrumentos</FormLabel>
                <FormDescription>
                  Selecione todos os instrumentos que o músico toca
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {INSTRUMENTS.map((instrument) => (
                  <FormField
                    key={instrument}
                    control={form.control}
                    name="instruments"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={instrument}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(instrument)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, instrument])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== instrument
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {instrument}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skillLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nível de Habilidade</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SKILL_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
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
          name="joined"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Entrada</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Data em que o músico entrou no ministério
              </FormDescription>
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
            {musician ? 'Atualizar' : 'Adicionar'} Músico
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MusicianForm;
