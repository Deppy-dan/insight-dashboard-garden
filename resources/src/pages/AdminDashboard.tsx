
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout/Layout';

const AdminDashboard = () => {
  return (
    <Layout>
      <Helmet>
        <title>Painel Administrativo | MúsicaIgreja</title>
      </Helmet>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <p>Área restrita para administradores.</p>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
