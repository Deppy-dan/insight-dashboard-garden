
import './bootstrap';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from '../src/App.js';
import '../src/index.css';

console.log('React app.jsx está sendo carregado');

// Ensure the root element exists
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando React');
    
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        console.error('Elemento root não encontrado, criando um novo');
        const rootDiv = document.createElement('div');
        rootDiv.id = 'root';
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
});
