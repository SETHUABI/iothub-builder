import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Power } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SwitchWidgetProps {
  title: string;
  deviceId: string;
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}

export function SwitchWidget({
  title,
  deviceId,
  initialState = false,
  onToggle,
}: SwitchWidgetProps) {
  const [isOn, setIsOn] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    
    // Simulate command sending
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setIsOn(checked);
    setIsLoading(false);
    onToggle?.(checked);
    
    toast.success(`Command sent`, {
      description: `Relay ${checked ? 'activated' : 'deactivated'} for device ${deviceId}`,
    });
  };

  return (
    <Card
      variant="glass"
      className={cn(
        'h-full transition-all duration-300',
        isOn && 'border-primary/50 shadow-lg shadow-primary/10'
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300',
                isOn ? 'bg-primary/20' : 'bg-muted'
              )}
            >
              <Power
                className={cn(
                  'w-5 h-5 transition-colors duration-300',
                  isOn ? 'text-primary' : 'text-muted-foreground'
                )}
              />
            </div>
            <div>
              <p className={cn('font-semibold', isOn ? 'text-primary' : 'text-foreground')}>
                {isOn ? 'ON' : 'OFF'}
              </p>
              <p className="text-xs text-muted-foreground">Relay Control</p>
            </div>
          </div>
          <Switch
            checked={isOn}
            onCheckedChange={handleToggle}
            disabled={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
