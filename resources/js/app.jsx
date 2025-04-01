
import './bootstrap';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';

// Ensure the root element exists
document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        const rootDiv = document.createElement('div');
        rootDiv.id = 'root';
        document.body.appendChild(rootDiv);
    }

    // Initialize the React application
    createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});
