import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CommandsTable } from '@/components/commands/CommandsTable';
import { mockCommands, mockDevices } from '@/data/mockData';
import { Send, Terminal, Zap, Shield, Clock, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Commands = () => {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [method, setMethod] = useState('POST');
  const [endpoint, setEndpoint] = useState('/api/v1/control');
  const [payload, setPayload] = useState('{\n  "action": "toggle",\n  "value": true\n}');
  const [sending, setSending] = useState(false);

  const handleSendCommand = async () => {
    if (!selectedDevice) {
      toast.error('Please select a device');
      return;
    }

    setSending(true);
    
    // Simulate sending command
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSending(false);
    toast.success('Command sent successfully', {
      description: `${method} request sent to ${selectedDevice}`,
    });
  };

  const stats = [
    { label: 'Commands Today', value: '156', icon: Terminal, color: 'primary' },
    { label: 'Success Rate', value: '98.2%', icon: Zap, color: 'success' },
    { label: 'Avg. Latency', value: '45ms', icon: Clock, color: 'warning' },
    { label: 'Active Retries', value: '3', icon: RefreshCw, color: 'destructive' },
  ];

  return (
    <DashboardLayout
      title="Commands"
      subtitle="Send HTTP/HTTPS trigger commands to devices"
    >
      <div className="space-y-6 animate-slide-up">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} variant="glass">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold font-mono text-${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Command Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glow" className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Send className="w-4 h-4 text-primary" />
                Send Command
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Target Device</Label>
                <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                  <SelectTrigger className="bg-secondary border-transparent">
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDevices
                      .filter((d) => d.status === 'online')
                      .map((device) => (
                        <SelectItem key={device.id} value={device.id}>
                          {device.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1 space-y-2">
                  <Label>Method</Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger className="bg-secondary border-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Endpoint</Label>
                  <Input
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="bg-secondary border-transparent font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payload (JSON)</Label>
                <Textarea
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="bg-secondary border-transparent font-mono text-sm min-h-[120px]"
                />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/30">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  HMAC-SHA256 signature will be added automatically
                </span>
              </div>

              <Button
                className="w-full gap-2"
                onClick={handleSendCommand}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Command
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <CommandsTable commands={mockCommands} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Commands;
