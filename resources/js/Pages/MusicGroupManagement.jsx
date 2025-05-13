
import React from 'react';
import { Helmet } from 'react-helmet';
import { Music } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const MusicGroupManagement = () => {
  return (
    <Layout>
      <Helmet>
        <title>Gerenciamento de Grupo Musical | MúsicaIgreja</title>
      </Helmet>

      <div className="container mx-auto py-10">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold">Gerenciamento de Grupo Musical</h1>
            <p className="text-muted-foreground">
              Gerencie os grupos musicais da sua igreja
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-start space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" /> Grupos Ativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Você não possui grupos musicais cadastrados.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-start space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" /> Membros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nenhum membro cadastrado nos grupos musicais.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MusicGroupManagement;
