
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '@/types/user.js';
import { getCurrentUser, login as loginService, logout as logoutService } from '@/services/authService.js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAdmin: boolean;
}

// Define default context values
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
    const checkUser = async () => {
      try {
        // Verificar se há um usuário já logado
        const fetchedUser = getCurrentUser();
        if (fetchedUser) {
          console.log("Usuário recuperado do localStorage:", fetchedUser);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Erro ao recuperar usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const loggedInUser = await loginService(email, password);
      console.log("Login bem-sucedido, atualizando estado do usuário:", loggedInUser);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      logoutService();
      setUser(null);
      console.log("Logout realizado com sucesso");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const value = {
    user, 
    loading, 
    login, 
    logout, 
    isAdmin: user?.role === 'admin'
  };

  console.log("AuthContext state:", { user, loading, isAdmin: value.isAdmin });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
