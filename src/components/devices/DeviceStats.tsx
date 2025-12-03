import { Device } from '@/types/iot';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Wifi, WifiOff, AlertTriangle, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeviceStatsProps {
  devices: Device[];
}

export function DeviceStats({ devices }: DeviceStatsProps) {
  const stats = {
    total: devices.length,
    online: devices.filter((d) => d.status === 'online').length,
    offline: devices.filter((d) => d.status === 'offline').length,
    warning: devices.filter((d) => d.status === 'warning' || d.status === 'error').length,
  };

  const statItems = [
    {
      label: 'Total Devices',
      value: stats.total,
      icon: Cpu,
      color: 'primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Online',
      value: stats.online,
      icon: Wifi,
      color: 'success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Offline',
      value: stats.offline,
      icon: WifiOff,
      color: 'destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      label: 'Issues',
      value: stats.warning,
      icon: AlertTriangle,
      color: 'warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card key={item.label} variant="glass" className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className={cn('text-3xl font-bold font-mono', `text-${item.color}`)}>
                  {item.value}
                </p>
              </div>
              <div className={cn('p-3 rounded-lg', item.bgColor)}>
                <item.icon className={cn('w-6 h-6', `text-${item.color}`)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
