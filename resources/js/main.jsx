
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';
import './index.css';

console.log('React main.jsx está sendo carregado');

// Ensure the root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Elemento root não encontrado, criando um novo');
  const rootDiv = document.createElement("div");
  rootDiv.id = "root";
  document.body.appendChild(rootDiv);
}

try {
  // Initialize the React application
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React renderizado com sucesso');
} catch (error) {
  console.error('Erro ao renderizar o React:', error);
}
