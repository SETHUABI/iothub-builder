import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WidgetGrid } from '@/components/dashboard/WidgetGrid';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { CommandsTable } from '@/components/commands/CommandsTable';
import { mockAlerts, mockCommands } from '@/data/mockData';
import { useState } from 'react';

const Index = () => {
  const [alerts, setAlerts] = useState(mockAlerts);

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId ? { ...a, acknowledged: true, acknowledgedAt: new Date() } : a
      )
    );
  };

  return (
    <DashboardLayout
      title="Main Operations"
      subtitle="Real-time monitoring and control"
    >
      <div className="space-y-6 animate-slide-up">
        {/* Widget Grid */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Live Telemetry</h2>
          <WidgetGrid />
        </section>

        {/* Bottom Row: Alerts and Commands */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AlertsPanel alerts={alerts} onAcknowledge={handleAcknowledge} />
          </div>
          <div className="lg:col-span-2">
            <CommandsTable commands={mockCommands} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
