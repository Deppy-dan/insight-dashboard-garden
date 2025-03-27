
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

export default api;
