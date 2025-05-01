
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout/Layout';

const SongManagement = () => {
  return (
    <Layout>
      <Helmet>
        <title>Gerenciamento de Repertório | MúsicaIgreja</title>
      </Helmet>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold">Gerenciamento de Repertório</h1>
        <p>Página em construção...</p>
      </div>
    </Layout>
  );
};

export default SongManagement;
