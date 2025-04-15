
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import { getCurrentUser, login as loginService, logout as logoutService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAdmin: boolean;
}

// Define default context values to avoid undefined
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {
    throw new Error('login not implemented');
  },
  logout: () => {},
  isAdmin: false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário já logado
    const fetchedUser = getCurrentUser();
    setUser(fetchedUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await loginService(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  const value = {
    user, 
    loading, 
    login, 
    logout, 
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
