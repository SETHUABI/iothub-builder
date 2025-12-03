export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  lastSeen: Date;
  token: string;
  organizationId: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export type DeviceType = 
  | 'esp32' 
  | 'esp8266' 
  | 'arduino' 
  | 'raspberry-pi' 
  | 'stm32' 
  | 'custom';

export type DeviceStatus = 'online' | 'offline' | 'warning' | 'error';

export interface TelemetryData {
  deviceId: string;
  timestamp: Date;
  key: string;
  value: number | string | boolean;
  unit?: string;
}

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  deviceId: string;
  dataKey: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  config: WidgetConfig;
}

export type WidgetType = 
  | 'gauge' 
  | 'chart' 
  | 'value' 
  | 'switch' 
  | 'slider' 
  | 'status' 
  | 'map' 
  | 'table';

export interface WidgetConfig {
  min?: number;
  max?: number;
  unit?: string;
  color?: string;
  thresholds?: Threshold[];
  chartType?: 'line' | 'bar' | 'area';
  timeRange?: string;
}

export interface Threshold {
  value: number;
  color: string;
  label?: string;
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  widgets: Widget[];
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Command {
  id: string;
  deviceId: string;
  type: 'http' | 'mqtt';
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  payload?: Record<string, unknown>;
  headers?: Record<string, string>;
  status: CommandStatus;
  attempts: number;
  maxRetries: number;
  createdAt: Date;
  executedAt?: Date;
  acknowledgedAt?: Date;
}

export type CommandStatus = 
  | 'pending' 
  | 'sent' 
  | 'acknowledged' 
  | 'failed' 
  | 'timeout';

export interface Rule {
  id: string;
  name: string;
  enabled: boolean;
  trigger: RuleTrigger;
  conditions: RuleCondition[];
  actions: RuleAction[];
  organizationId: string;
}

export interface RuleTrigger {
  type: 'telemetry' | 'schedule' | 'webhook' | 'device_status';
  config: Record<string, unknown>;
}

export interface RuleCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains';
  value: unknown;
}

export interface RuleAction {
  type: 'mqtt_publish' | 'http_command' | 'email' | 'webhook' | 'alert';
  config: Record<string, unknown>;
}

export interface Alert {
  id: string;
  deviceId: string;
  ruleId: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  acknowledged: boolean;
  createdAt: Date;
  acknowledgedAt?: Date;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'pro' | 'enterprise';
  settings: OrganizationSettings;
}

export interface OrganizationSettings {
  theme?: string;
  customDomain?: string;
  retentionDays: number;
}
