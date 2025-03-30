
import './bootstrap';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App'; // Note que estamos importando do caminho local, não de src
import './index.css'; // Ajuste o caminho se necessário

// Garante que o elemento root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);
}

// Inicializa a aplicação React
createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
