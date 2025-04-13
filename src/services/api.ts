
import axios from 'axios';

// Configuração base do axios para o Laravel
const api = axios.create({
  baseURL: '/api', // URL base da API Laravel
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // Importante para autenticação com Laravel Sanctum
});

// Interceptor para incluir o token CSRF em cada requisição
api.interceptors.request.use(config => {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});

// Função de teste para verificar se a API está acessível
export const testApiConnection = async () => {
  try {
    const response = await api.get('/teste');
    console.log('Resposta da API de teste:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao conectar com a API:', error);
    throw error;
  }
};

export default api;
