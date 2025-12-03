import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Cpu,
  Activity,
  Zap,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Workflow,
  Users,
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboards', href: '/' },
  { icon: Cpu, label: 'Devices', href: '/devices' },
  { icon: Activity, label: 'Telemetry', href: '/telemetry' },
  { icon: Terminal, label: 'Commands', href: '/commands' },
  { icon: Workflow, label: 'Rules', href: '/rules' },
  { icon: Bell, label: 'Alerts', href: '/alerts', badge: 2 },
];

const bottomNavItems: NavItem[] = [
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
          <Zap className="w-5 h-5 text-primary" />
          <div className="absolute inset-0 rounded-lg animate-pulse-glow" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-semibold text-foreground tracking-tight">IoT Cloud</span>
            <span className="text-xs text-muted-foreground">Dashboard Builder</span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  isActive && 'scale-110'
                )}
              />
              {!collapsed && (
                <>
                  <span className="flex-1 font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="flex items-center justify-center w-5 h-5 text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute left-10 flex items-center justify-center w-4 h-4 text-[10px] font-medium bg-destructive text-destructive-foreground rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-2 py-4 border-t border-sidebar-border space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-border bg-background shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </Button>
    </aside>
  );
}
