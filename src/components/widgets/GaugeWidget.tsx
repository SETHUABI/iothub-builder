import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GaugeWidgetProps {
  title: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  thresholds?: { value: number; color: string }[];
}

export function GaugeWidget({
  title,
  value,
  min = 0,
  max = 100,
  unit = '',
  thresholds = [
    { value: 30, color: 'success' },
    { value: 70, color: 'warning' },
    { value: 100, color: 'destructive' },
  ],
}: GaugeWidgetProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = ((animatedValue - min) / (max - min)) * 100;
  const rotation = (percentage / 100) * 180 - 90;

  const getColor = () => {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (percentage <= (thresholds[i].value / max) * 100) {
        return thresholds[i].color;
      }
    }
    return thresholds[thresholds.length - 1]?.color || 'primary';
  };

  const color = getColor();

  return (
    <Card variant="glass" className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-0">
        {/* Gauge SVG */}
        <div className="relative w-32 h-20 mb-2">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 10 55 A 40 40 0 0 1 90 55"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Value arc */}
            <path
              d="M 10 55 A 40 40 0 0 1 90 55"
              fill="none"
              stroke={`hsl(var(--${color}))`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 1.26} 126`}
              className="transition-all duration-700 ease-out"
              style={{
                filter: `drop-shadow(0 0 6px hsl(var(--${color}) / 0.5))`,
              }}
            />
            {/* Needle */}
            <g
              className="transition-transform duration-700 ease-out"
              style={{
                transformOrigin: '50px 55px',
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <line
                x1="50"
                y1="55"
                x2="50"
                y2="20"
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="50"
                cy="55"
                r="4"
                fill="hsl(var(--foreground))"
              />
            </g>
          </svg>
        </div>

        {/* Value Display */}
        <div className="text-center">
          <span className={cn(
            'text-3xl font-bold font-mono transition-colors duration-300',
            `text-${color}`
          )}>
            {animatedValue.toFixed(1)}
          </span>
          <span className="text-lg text-muted-foreground ml-1">{unit}</span>
        </div>

        {/* Range */}
        <div className="flex justify-between w-full mt-2 text-xs text-muted-foreground">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
