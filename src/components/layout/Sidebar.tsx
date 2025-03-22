import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Music, 
  ListMusic, 
  CalendarDays, 
  Users, 
  Headphones, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type SidebarItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
};

const sidebarItems: SidebarItem[] = [
  { title: 'Meu Perfil', path: '/profile', icon: UserCircle },
  { title: 'Grupo de Música', path: '/music-management', icon: Music },
  { title: 'Músicos', path: '/musicians', icon: Users },
  { title: 'Repertório', path: '/songs', icon: ListMusic },
  { title: 'Escalas', path: '/schedules', icon: CalendarDays },
  { title: 'Ensaios', path: '/rehearsals', icon: Headphones },
  { title: 'Painel Admin', path: '/admin', icon: LayoutDashboard, adminOnly: true },
  { title: 'Configurações', path: '/settings', icon: Settings, adminOnly: true },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const toggleCollapsed = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    window.dispatchEvent(
      new CustomEvent('sidebarStateChange', { detail: { collapsed: newCollapsedState } })
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredItems = sidebarItems.filter(item => 
    !item.adminOnly || (item.adminOnly && isAdmin)
  );

  return (
    <aside
      className={cn(
        "h-screen fixed left-0 top-0 z-10 flex flex-col bg-sidebar text-sidebar-foreground border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-border">
        {!collapsed && (
          <h1 className="text-xl font-display font-semibold animate-fade-in">
            Música<span className="text-primary">Igreja</span>
          </h1>
        )}
        <button
          onClick={toggleCollapsed}
          className={cn(
            "p-2 rounded-full text-sidebar-foreground hover:bg-sidebar-accent transition-all",
            collapsed && "mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.title}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      "flex-shrink-0",
                      !isActive && "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                    )}
                  />
                  {!collapsed && (
                    <span className="ml-3 text-sm font-medium">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "px-2"
          )}
        >
          <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            {user?.name?.charAt(0) || 'U'}
          </div>
          {!collapsed && (
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-muted-foreground">{user?.email || 'usuario@igreja.com'}</p>
            </div>
          )}
          {!collapsed && (
            <button 
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Sair"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
        {collapsed && (
          <button
            onClick={handleLogout}
            className="mt-4 flex justify-center w-full text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Sair"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
