import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CardTemplate: React.FC = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold tracking-tight">Templates de Cartões</h1>
        <p className="text-muted-foreground mt-1">Exemplos de diferentes estilos de cartões para dashboards e interfaces</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 24.420,00</div>
            <p className="text-sm text-muted-foreground mt-1">
              +180,1% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-sm text-muted-foreground mt-1">
              +19% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+721</div>
            <p className="text-sm text-muted-foreground mt-1">
              +3% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>
              Você teve um aumento de 12% nas vendas este mês.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart className="h-[220px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próxima Reunião</CardTitle>
            <CardDescription>
              Reunião de planejamento estratégico
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span className="font-medium">Selecione uma data...</span>
                )}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 opacity-70" />
              <span>14:00 - 15:00</span>
            </div>
          </CardContent>
          <CardFooter className="pl-6">
            <Calendar 
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Perfil do Usuário</CardTitle>
            <CardDescription>
              Informações e estatísticas do usuário
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/images/avatars/01.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Carlos Novak</p>
                <p className="text-sm text-muted-foreground">
                  carlos.novak@example.com
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Total de Pontos</p>
                <Badge variant="secondary">3200</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Nível</p>
                <Badge variant="outline">Avançado</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Ver Perfil</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default CardTemplate;

import {
  Card as CardM,
  CardContent as CardContentM,
  CardDescription as CardDescriptionM,
  CardFooter as CardFooterM,
  CardHeader as CardHeaderM,
  CardTitle as CardTitleM,
} from "@/components/ui/card"
import { BarChart, Bell, CreditCard } from 'lucide-react';
import { format } from "date-fns"
