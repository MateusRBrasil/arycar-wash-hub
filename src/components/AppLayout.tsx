import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Users, Wrench, LogOut } from 'lucide-react';
import arycarLogo from '@/assets/arycar-logo.png';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/os/nova', label: 'Nova OS', icon: PlusCircle },
  { to: '#', label: 'Clientes', icon: Users, disabled: true },
  { to: '#', label: 'Serviços', icon: Wrench, disabled: true },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-[hsl(var(--sidebar-border))]">
          <img src={arycarLogo} alt="ARYCAR" className="h-8 w-auto" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
            return (
              <Link
                key={item.label}
                to={item.disabled ? '#' : item.to}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-primary))]'
                    : 'hover:bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))]',
                  item.disabled && 'opacity-40 pointer-events-none'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="border-t border-[hsl(var(--sidebar-border))] px-4 py-4">
          <div className="text-sm truncate mb-2 text-[hsl(var(--sidebar-foreground))]">{user?.name || user?.email}</div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-col flex-1">
        <header className="flex md:hidden items-center justify-between border-b bg-[hsl(var(--sidebar-background))] px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={arycarLogo} alt="ARYCAR" className="h-6 w-auto" />
          </div>
          <div className="flex gap-1">
            {navItems.filter((n) => !n.disabled).map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'p-2 rounded-md',
                  (item.to === '/' ? pathname === '/' : pathname.startsWith(item.to))
                    ? 'bg-[hsl(var(--sidebar-accent))]'
                    : ''
                )}
              >
                <item.icon className="h-4 w-4 text-[hsl(var(--sidebar-foreground))]" />
              </Link>
            ))}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={logout}>
              <LogOut className="h-4 w-4 text-[hsl(var(--sidebar-foreground))]" />
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
