
import { User } from "@/types/user";

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

// Em uma aplicação real, isso seria armazenado em um banco de dados SQL

export async function login(email: string, password: string): Promise<User> {
  // Simula uma chamada à API com um pequeno delay
  return new Promise((resolve, reject) => {
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
}

export function logout(): void {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser(): User | null {
  const userString = localStorage.getItem('currentUser');
  if (userString) {
    return JSON.parse(userString) as User;
  }
  return null;
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === 'admin';
}

// Em uma implementação real, você conectaria ao seu banco SQL aqui
// Exemplo de como seria com um ORM como Prisma:
// 
// import { prisma } from '@/lib/prisma';
// 
// export async function login(email: string, password: string): Promise<User> {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) throw new Error('Usuário não encontrado');
//   
//   const passwordValid = await comparePassword(password, user.passwordHash);
//   if (!passwordValid) throw new Error('Senha incorreta');
//   
//   const { passwordHash, ...userWithoutPassword } = user;
//   return userWithoutPassword;
// }
