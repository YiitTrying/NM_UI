import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { LOCATIONS } from '@/lib/constants';

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationSelect({ value, onChange }: LocationSelectProps) {
  return (
    <div className="space-y-2">
      <Label>Geographic Location</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {LOCATIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}