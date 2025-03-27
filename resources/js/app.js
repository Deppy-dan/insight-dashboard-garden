
import './bootstrap';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './src/App';
import './src/index.css';

// Initialize the React application
if (document.getElementById('root')) {
    createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
