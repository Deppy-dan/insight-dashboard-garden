
import './bootstrap';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './src/App';
import './src/index.css';

// Inicializa a aplicação React
if (document.getElementById('root')) {
    createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
