import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DeviceCard } from '@/components/devices/DeviceCard';
import { DeviceStats } from '@/components/devices/DeviceStats';
import { mockDevices } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import { useState } from 'react';

const Devices = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredDevices = mockDevices.filter((device) => {
    const matchesFilter = filter === 'all' || device.status === filter;
    const matchesSearch = device.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      title="Devices"
      subtitle={`${mockDevices.length} devices registered`}
    >
      <div className="space-y-6 animate-slide-up">
        {/* Stats */}
        <DeviceStats devices={mockDevices} />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search devices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary border-transparent"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px] bg-secondary border-transparent">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <div className="flex border border-border rounded-lg p-1 bg-secondary">
              <Button
                variant={view === 'grid' ? 'default' : 'ghost'}
                size="icon-sm"
                onClick={() => setView('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="icon-sm"
                onClick={() => setView('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Device
            </Button>
          </div>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">No devices found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Devices;
