
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="text-muted-foreground">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          Voltar à página inicial
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
