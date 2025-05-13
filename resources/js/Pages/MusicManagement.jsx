
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout/Layout';

const MusicManagement = () => {
  return (
    <Layout>
      <Helmet>
        <title>Gerenciamento de Músicos | MúsicaIgreja</title>
      </Helmet>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold">Gerenciamento de Músicos</h1>
        <p className="text-muted-foreground">Página em construção...</p>
      </div>
    </Layout>
  );
};

export default MusicManagement;
