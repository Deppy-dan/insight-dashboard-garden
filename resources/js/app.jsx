
import './bootstrap';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { AuthProvider } from '../src/contexts/AuthContext';
import Login from '../src/pages/Login';
import NotFound from '../src/pages/NotFound';
import MusicGroupManagement from '../src/pages/MusicGroupManagement';
import UserProfile from '../src/pages/UserProfile';
import AdminDashboard from '../src/pages/AdminDashboard';
import MusicManagement from '../src/pages/MusicManagement';
import SongManagement from '../src/pages/SongManagement';
import ScheduleManagement from '../src/pages/ScheduleManagement';
import { Helmet } from 'react-helmet';
import '../src/index.css';

console.log('React app.jsx está sendo carregado');

// Create a new QueryClient with configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Define the AppRoutes component that includes all routes
const AppRoutes = () => {
  // useAuth hook needs to be inside a component that's within AuthProvider
  const { useAuth } = require('../src/contexts/AuthContext');
  const { user, isAdmin } = useAuth();

  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={user ? <UserProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/music-management"
          element={user ? <MusicGroupManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/musicians"
          element={user ? <MusicManagement /> : <Navigate to="/login" />}
        />
        <Route 
          path="/songs" 
          element={user ? <SongManagement /> : <Navigate to="/login" />} 
        />
        <Route
          path="/schedules"
          element={user ? <ScheduleManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={
            user && isAdmin
              ? <AdminDashboard />
              : <Navigate to={user ? "/music-management" : "/login"} />
          }
        />
        <Route
          path="/"
          element={<Navigate to={user ? "/music-management" : "/login"} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

// Define the main App component
const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Helmet
              titleTemplate="%s | Música Igreja"
              defaultTitle="Sistema de Gestão Musical"
            >
              <meta
                name="description"
                content="Sistema de gerenciamento de música para igrejas"
              />
            </Helmet>
            <Toaster />
            <Sonner />
            <Router>
              <AppRoutes />
            </Router>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

// Function to initialize React
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
    createRoot(document.getElementById('root')).render(<App />);
    console.log('React renderizado com sucesso');
  } catch (error) {
    console.error('Erro ao renderizar o React:', error);
  }
});
