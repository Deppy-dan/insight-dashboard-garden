
import React from 'react';
import { cn } from '@/lib/utils';
import { Bell, Moon, Search, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={cn(
      "h-16 border-b border-border bg-background/80 backdrop-blur-md fixed top-0 right-0 z-10 transition-all duration-300 flex items-center justify-between px-6",
      sidebarCollapsed ? "left-20" : "left-64"
    )}>
      <div className="flex-1 mr-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="search" 
            placeholder="Pesquisar..." 
            className="pl-10 bg-muted/50 border-none h-10 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <span className="h-10 w-10 rounded-full bg-muted/70 flex items-center justify-center text-sm font-medium">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 animate-scale-in">
            <DropdownMenuItem className="hover:cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer">Configurações da conta</DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:cursor-pointer text-destructive"
              onClick={handleLogout}
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
