
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import ScheduleList from '@/components/schedules/ScheduleList';
import { Button } from '@/components/ui/button';
import { ListMusic, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScheduleManagement = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>Gerenciamento de Escalas | MúsicaIgreja</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Escalas</h1>
            <p className="text-muted-foreground">
              Organize eventos e agende músicos para os cultos e celebrações
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Button 
              onClick={() => navigate('/songs')} 
              variant="outline" 
              size="sm"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Gerenciar Repertório
            </Button>
          </div>
        </div>

        <ScheduleList />
      </div>
    </Layout>
  );
};

export default ScheduleManagement;
