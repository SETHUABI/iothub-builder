import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { DeviceStatus } from '@/types/iot';
import { cn } from '@/lib/utils';

interface StatusWidgetProps {
  title: string;
  status: DeviceStatus;
  lastSeen?: Date;
  deviceName?: string;
}

export function StatusWidget({ title, status, lastSeen, deviceName }: StatusWidgetProps) {
  const statusConfig = {
    online: {
      icon: Wifi,
      label: 'Online',
      color: 'success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30',
    },
    offline: {
      icon: WifiOff,
      label: 'Offline',
      color: 'destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30',
    },
    warning: {
      icon: AlertTriangle,
      label: 'Warning',
      color: 'warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30',
    },
    error: {
      icon: AlertTriangle,
      label: 'Error',
      color: 'destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const formatLastSeen = (date?: Date) => {
    if (!date) return 'Unknown';
    const diff = Date.now() - date.getTime();
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <Card variant="glass" className={cn('h-full border', config.borderColor)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'relative flex items-center justify-center w-10 h-10 rounded-full',
              config.bgColor
            )}
          >
            <Icon className={cn('w-5 h-5', `text-${config.color}`)} />
            {status === 'online' && (
              <span className="absolute inset-0 rounded-full animate-ping bg-success/30" />
            )}
          </div>
          <div>
            <p className={cn('font-semibold', `text-${config.color}`)}>
              {config.label}
            </p>
            {deviceName && (
              <p className="text-xs text-muted-foreground">{deviceName}</p>
            )}
          </div>
        </div>
        {lastSeen && (
          <p className="mt-3 text-xs text-muted-foreground">
            Last seen: {formatLastSeen(lastSeen)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
