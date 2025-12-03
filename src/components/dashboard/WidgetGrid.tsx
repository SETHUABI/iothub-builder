import { useState, useEffect } from 'react';
import { GaugeWidget } from '@/components/widgets/GaugeWidget';
import { ChartWidget } from '@/components/widgets/ChartWidget';
import { ValueWidget } from '@/components/widgets/ValueWidget';
import { StatusWidget } from '@/components/widgets/StatusWidget';
import { SwitchWidget } from '@/components/widgets/SwitchWidget';
import { generateTelemetryData, mockDevices } from '@/data/mockData';
import { Droplets, Thermometer } from 'lucide-react';

export function WidgetGrid() {
  const [temperature, setTemperature] = useState(24.5);
  const [humidity, setHumidity] = useState(58);
  const [telemetryData, setTelemetryData] = useState(
    generateTelemetryData('dev-001', 'temperature', 30)
  );

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update temperature with small random changes
      setTemperature((prev) => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(15, Math.min(35, prev + change));
      });

      // Update humidity
      setHumidity((prev) => {
        const change = (Math.random() - 0.5) * 3;
        return Math.max(30, Math.min(80, prev + change));
      });

      // Add new telemetry point
      setTelemetryData((prev) => {
        const newData = [...prev.slice(1), {
          deviceId: 'dev-001',
          timestamp: new Date(),
          key: 'temperature',
          value: temperature + (Math.random() - 0.5) * 2,
          unit: '°C',
        }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [temperature]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* Temperature Gauge - spans 2 columns */}
      <div className="lg:col-span-2">
        <GaugeWidget
          title="Temperature"
          value={temperature}
          min={0}
          max={50}
          unit="°C"
          thresholds={[
            { value: 25, color: 'success' },
            { value: 35, color: 'warning' },
            { value: 50, color: 'destructive' },
          ]}
        />
      </div>

      {/* Temperature Chart - spans 4 columns */}
      <div className="lg:col-span-4">
        <ChartWidget
          title="Temperature History (Last 30 min)"
          data={telemetryData}
        />
      </div>

      {/* Humidity Value */}
      <div className="lg:col-span-2">
        <ValueWidget
          title="Humidity"
          value={humidity}
          unit="%"
          trend={humidity > 60 ? 'up' : humidity < 50 ? 'down' : 'stable'}
          trendValue={2.5}
          icon={<Droplets className="w-5 h-5" />}
        />
      </div>

      {/* Device Status */}
      <div className="lg:col-span-2">
        <StatusWidget
          title="Motion Sensor"
          status={mockDevices[2].status}
          lastSeen={mockDevices[2].lastSeen}
          deviceName={mockDevices[2].name}
        />
      </div>

      {/* Relay Control */}
      <div className="lg:col-span-2">
        <SwitchWidget
          title="Relay Control"
          deviceId="dev-002"
          initialState={false}
        />
      </div>

      {/* Additional metrics row */}
      <div className="lg:col-span-2">
        <ValueWidget
          title="Power Consumption"
          value={145.8}
          unit="W"
          trend="down"
          trendValue={-5.2}
          icon={<Thermometer className="w-5 h-5" />}
        />
      </div>

      <div className="lg:col-span-2">
        <StatusWidget
          title="Power Monitor"
          status={mockDevices[3].status}
          lastSeen={mockDevices[3].lastSeen}
          deviceName={mockDevices[3].name}
        />
      </div>

      <div className="lg:col-span-2">
        <SwitchWidget
          title="HVAC Control"
          deviceId="dev-005"
          initialState={true}
        />
      </div>
    </div>
  );
}
