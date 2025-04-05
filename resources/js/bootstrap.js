
/**
 * Bootstrap Frontend
 * 
 * This script sets up base configurations for the frontend
 */

import axios from 'axios';

console.log('Bootstrap.js carregado');

// Configure axios to include CSRF token in all requests
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add CSRF token from the meta tag if available
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    console.log('CSRF token configurado');
} else {
    console.error('CSRF token not found');
}

// Uncomment this line if using Laravel Sanctum for authentication
window.axios.defaults.withCredentials = true;
