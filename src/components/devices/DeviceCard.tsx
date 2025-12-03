import { Device } from '@/types/iot';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, MoreVertical, Activity, Clock, Key } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DeviceCardProps {
  device: Device;
  onClick?: () => void;
}

const deviceTypeIcons: Record<string, string> = {
  esp32: '🔌',
  esp8266: '📡',
  arduino: '🎛️',
  'raspberry-pi': '🍓',
  stm32: '⚡',
  custom: '🔧',
};

const statusConfig = {
  online: { color: 'success', label: 'Online' },
  offline: { color: 'destructive', label: 'Offline' },
  warning: { color: 'warning', label: 'Warning' },
  error: { color: 'destructive', label: 'Error' },
};

export function DeviceCard({ device, onClick }: DeviceCardProps) {
  const status = statusConfig[device.status];
  
  const formatLastSeen = (date: Date) => {
    const diff = Date.now() - date.getTime();
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <Card
      variant="glass"
      className={cn(
        'cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group',
        device.status === 'online' && 'border-success/20'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-xl">
              {deviceTypeIcons[device.type] || '🔧'}
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {device.name}
              </h3>
              <p className="text-xs text-muted-foreground capitalize">
                {device.type.replace('-', ' ')}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon-sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Device</DropdownMenuItem>
              <DropdownMenuItem>Send Command</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete Device
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Badge
            variant={device.status === 'online' ? 'default' : 'secondary'}
            className={cn(
              'text-xs',
              device.status === 'online' && 'bg-success/20 text-success border-success/30',
              device.status === 'offline' && 'bg-destructive/20 text-destructive border-destructive/30',
              device.status === 'warning' && 'bg-warning/20 text-warning border-warning/30'
            )}
          >
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full mr-1.5',
                device.status === 'online' && 'bg-success animate-pulse',
                device.status === 'offline' && 'bg-destructive',
                device.status === 'warning' && 'bg-warning animate-pulse'
              )}
            />
            {status.label}
          </Badge>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Last seen: {formatLastSeen(device.lastSeen)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Key className="w-3.5 h-3.5" />
            <span className="font-mono truncate">{device.token.slice(0, 16)}...</span>
          </div>
          {device.metadata?.location && (
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>{device.metadata.location as string}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
