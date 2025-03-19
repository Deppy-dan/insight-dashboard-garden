
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Effect to handle sidebar collapse state from the Sidebar component
  React.useEffect(() => {
    const handleSidebarChange = (e: CustomEvent) => {
      setSidebarCollapsed(e.detail.collapsed);
    };

    window.addEventListener('sidebarStateChange' as any, handleSidebarChange);
    return () => {
      window.removeEventListener('sidebarStateChange' as any, handleSidebarChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className={cn(
        "flex-1 transition-all duration-300",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        <Header sidebarCollapsed={sidebarCollapsed} />
        <main className="pt-16 pb-8 px-6 md:px-8 min-h-screen animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
