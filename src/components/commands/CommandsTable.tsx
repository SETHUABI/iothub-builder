import { Command } from '@/types/iot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RefreshCw, CheckCircle, Clock, XCircle, Loader2, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandsTableProps {
  commands: Command[];
  onRetry?: (commandId: string) => void;
}

interface StatusConfig {
  icon: typeof Clock;
  color: string;
  label: string;
  bgColor: string;
  animate?: boolean;
}

export function CommandsTable({ commands, onRetry }: CommandsTableProps) {
  const statusConfig: Record<string, StatusConfig> = {
    pending: {
      icon: Clock,
      color: 'muted-foreground',
      label: 'Pending',
      bgColor: 'bg-muted/50',
    },
    sent: {
      icon: Loader2,
      color: 'primary',
      label: 'Sent',
      bgColor: 'bg-primary/10',
      animate: true,
    },
    acknowledged: {
      icon: CheckCircle,
      color: 'success',
      label: 'Acknowledged',
      bgColor: 'bg-success/10',
    },
    failed: {
      icon: XCircle,
      color: 'destructive',
      label: 'Failed',
      bgColor: 'bg-destructive/10',
    },
    timeout: {
      icon: Clock,
      color: 'warning',
      label: 'Timeout',
      bgColor: 'bg-warning/10',
    },
  };

  const formatTime = (date?: Date) => {
    if (!date) return '-';
    return new Date(date).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          Recent Commands
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-muted-foreground">Device</TableHead>
              <TableHead className="text-muted-foreground">Method</TableHead>
              <TableHead className="text-muted-foreground">Endpoint</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Attempts</TableHead>
              <TableHead className="text-muted-foreground">Created</TableHead>
              <TableHead className="text-muted-foreground w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commands.map((command) => {
              const config = statusConfig[command.status];
              const Icon = config.icon;

              return (
                <TableRow key={command.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-mono text-sm">
                    {command.deviceId}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {command.method}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground max-w-[200px] truncate">
                    {command.endpoint}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs gap-1',
                          `text-${config.color}`,
                          config.bgColor
                        )}
                      >
                        <Icon
                          className={cn(
                            'w-3 h-3',
                            config.animate && 'animate-spin'
                          )}
                        />
                        {config.label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {command.attempts}/{command.maxRetries}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatTime(command.createdAt)}
                  </TableCell>
                  <TableCell>
                    {(command.status === 'failed' || command.status === 'timeout') && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onRetry?.(command.id)}
                        className="h-7 w-7"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
