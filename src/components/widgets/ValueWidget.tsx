import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValueWidgetProps {
  title: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  icon?: React.ReactNode;
}

export function ValueWidget({
  title,
  value,
  unit = '',
  trend = 'stable',
  trendValue,
  icon,
}: ValueWidgetProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <Card variant="glass" className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-foreground">
            {value.toFixed(1)}
          </span>
          <span className="text-lg text-muted-foreground">{unit}</span>
        </div>
        {trendValue !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 mt-2 text-sm',
              trend === 'up' && 'text-success',
              trend === 'down' && 'text-destructive',
              trend === 'stable' && 'text-muted-foreground'
            )}
          >
            <TrendIcon className="w-4 h-4" />
            <span>{trendValue > 0 ? '+' : ''}{trendValue.toFixed(1)}%</span>
            <span className="text-muted-foreground ml-1">vs last hour</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
