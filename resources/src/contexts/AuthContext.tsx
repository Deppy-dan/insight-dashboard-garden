
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types/user';

// Simple mock of authService for the resources/src path
const getCurrentUser = () => {
  const userString = localStorage.getItem('currentUser');
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};

const login = async (email: string, password: string) => {
  // Simulação de um banco de dados com usuários
  const users = [
    {
      id: 1,
      email: "admin@igreja.com",
      password: "admin123",
      name: "Administrador",
      role: "admin"
    },
    {
      id: 2,
      email: "usuario@igreja.com",
      password: "usuario123",
      name: "Usuário Padrão",
      role: "user"
    }
  ];
  
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Não devemos incluir a senha na resposta
        const { password, ...userWithoutPassword } = user;
        
        // Armazenar o usuário no localStorage
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        resolve(userWithoutPassword as User);
      } else {
        reject(new Error('Credenciais inválidas'));
      }
    }, 500); // Delay de 500ms para simular a latência da rede
  });
};

const logout = () => {
  localStorage.removeItem('currentUser');
};

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

  const handleLogin = async (email: string, password: string): Promise<User> => {
    try {
      const loggedInUser = await login(email, password);
      console.log("Login bem-sucedido, atualizando estado do usuário:", loggedInUser);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    try {
      logout();
      setUser(null);
      console.log("Logout realizado com sucesso");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const value = {
    user, 
    loading, 
    login: handleLogin, 
    logout: handleLogout, 
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
