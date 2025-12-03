import { Alert } from '@/types/iot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Bell, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledge?: (alertId: string) => void;
  onDismiss?: (alertId: string) => void;
}

export function AlertsPanel({ alerts, onAcknowledge, onDismiss }: AlertsPanelProps) {
  const activeAlerts = alerts.filter((a) => !a.acknowledged);

  const severityConfig = {
    info: {
      icon: Bell,
      color: 'primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
    },
    warning: {
      icon: AlertTriangle,
      color: 'warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30',
    },
    critical: {
      icon: AlertTriangle,
      color: 'destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30',
    },
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card variant="glass">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Active Alerts
          </CardTitle>
          {activeAlerts.length > 0 && (
            <Badge variant="destructive" className="text-xs">
              {activeAlerts.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <CheckCircle className="w-12 h-12 mb-3 text-success" />
            <p className="font-medium">All Clear</p>
            <p className="text-sm">No active alerts</p>
          </div>
        ) : (
          activeAlerts.map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg border animate-fade-in',
                  config.bgColor,
                  config.borderColor
                )}
              >
                <div className={cn('p-2 rounded-lg', config.bgColor)}>
                  <Icon className={cn('w-4 h-4', `text-${config.color}`)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={cn('text-xs capitalize', `text-${config.color}`, config.borderColor)}
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(alert.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{alert.message}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onAcknowledge?.(alert.id)}
                    className="h-7 w-7"
                  >
                    <CheckCircle className="w-4 h-4 text-success" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDismiss?.(alert.id)}
                    className="h-7 w-7"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
