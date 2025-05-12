
import React, { createContext, useState, useContext, useEffect } from 'react';

// Simple mock of authService
const getCurrentUser = () => {
  const userString = localStorage.getItem('currentUser');
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};

const login = async (email, password) => {
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
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Não devemos incluir a senha na resposta
        const { password, ...userWithoutPassword } = user;
        
        // Armazenar o usuário no localStorage
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        resolve(userWithoutPassword);
      } else {
        reject(new Error('Credenciais inválidas'));
      }
    }, 300); // Reduce delay to make login faster
  });
};

const logout = () => {
  localStorage.removeItem('currentUser');
};

// Define default context values
const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {
    throw new Error('login not implemented');
  },
  logout: () => {},
  isAdmin: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

  const handleLogin = async (email, password) => {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
