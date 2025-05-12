
// Simple auth service for the resources path

export const getCurrentUser = () => {
  const userString = localStorage.getItem('currentUser');
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};

export const login = async (email, password) => {
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

export const logout = () => {
  localStorage.removeItem('currentUser');
};
