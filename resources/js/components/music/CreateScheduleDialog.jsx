
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
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "../../hooks/use-toast";

const CreateScheduleDialog = ({ onCreateSchedule }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: null,
    time: '',
    location: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.date) {
      toast({
        variant: "destructive",
        title: "Data é obrigatória",
        description: "Por favor, selecione uma data para o evento.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would send the formData to your API
      // const response = await createSchedule(formData);
      
      // For now, simulate a successful response
      setTimeout(() => {
        if (onCreateSchedule) {
          onCreateSchedule({
            id: Date.now().toString(),
            ...formData
          });
        }
        
        toast({
          title: "Agenda criada!",
          description: `Evento "${formData.title}" agendado para ${format(formData.date, "dd/MM/yyyy")}`,
        });
        
        setFormData({
          title: '',
          date: null,
          time: '',
          location: '',
          notes: '',
        });
        
        setOpen(false);
      }, 500);
      
    } catch (error) {
      console.error('Error creating schedule:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar agenda",
        description: "Ocorreu um erro ao criar a agenda. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          <PlusCircle className="h-4 w-4" /> Criar agenda
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar nova agenda</DialogTitle>
            <DialogDescription>
              Adicione um novo evento ao calendário da equipe.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do evento</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="ex: Culto de Domingo"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(formData.date, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateChange}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Local</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="ex: Templo Principal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notas adicionais sobre o evento"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar agenda"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScheduleDialog;
