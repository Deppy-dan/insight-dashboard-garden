
import React, { useEffect, useState } from 'react';
import { testApiConnection } from '@/services/api';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

const ApiTest = () => {
  const [apiStatus, setApiStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await testApiConnection();
      setApiStatus(response.status || 'API respondeu com sucesso!');
    } catch (error) {
      console.error('Erro ao testar API:', error);
      setError('Falha ao conectar com a API. Verifique o console para mais detalhes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Testar a API automaticamente quando o componente é montado
    testApi();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Teste de Conexão com API</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiStatus && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription>{apiStatus}</AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert className="bg-red-50 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Button 
          onClick={testApi} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Testando...' : 'Testar Conexão com API'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApiTest;
