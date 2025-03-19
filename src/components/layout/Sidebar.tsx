
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BarChart4, 
  PieChart, 
  Table, 
  CreditCard, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

type SidebarItem = {
  title: string;
  path: string;
  icon: React.ElementType;
};

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', path: '/', icon: LayoutDashboard },
  { title: 'Tabela', path: '/table-template', icon: Table },
  { title: 'Gráficos', path: '/chart-template', icon: BarChart4 },
  { title: 'Cartões', path: '/card-template', icon: CreditCard },
  { title: 'Estatísticas', path: '/stat-template', icon: PieChart },
  { title: 'Relatórios', path: '/reports', icon: FileText },
  { title: 'Configurações', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

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
            Admin<span className="text-primary">Pro</span>
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
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
          {sidebarItems.map((item) => {
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
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Administrador</p>
              <p className="text-xs text-muted-foreground">admin@exemplo.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
