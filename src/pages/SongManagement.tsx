
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import SongList from '@/components/songs/SongList';
import { Button } from '@/components/ui/button';
import { Music, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SongManagement = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>Gerenciamento de Repertório | MúsicaIgreja</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Repertório</h1>
            <p className="text-muted-foreground">
              Adicione, edite e organize o repertório musical da igreja
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Button 
              onClick={() => navigate('/music-management')} 
              variant="outline" 
              size="sm"
            >
              <ChevronRight className="mr-2 h-4 w-4" />
              Voltar para Escalas
            </Button>
          </div>
        </div>

        <SongList />
      </div>
    </Layout>
  );
};

export default SongManagement;
