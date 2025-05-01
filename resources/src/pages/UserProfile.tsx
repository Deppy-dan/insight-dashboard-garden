
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Helmet>
        <title>Meu Perfil | MúsicaIgreja</title>
      </Helmet>

      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
        
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Função</p>
              <p className="font-medium capitalize">{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserProfile;
