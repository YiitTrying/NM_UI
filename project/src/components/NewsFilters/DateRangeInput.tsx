import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface DateRangeInputProps {
  dateFrom: string;
  dateTo: string;
  allTime: boolean;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onAllTimeChange: (checked: boolean) => void;
}

export function DateRangeInput({
  dateFrom,
  dateTo,
  allTime,
  onDateFromChange,
  onDateToChange,
  onAllTimeChange,
}: DateRangeInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="allTime"
          checked={allTime}
          onCheckedChange={onAllTimeChange}
        />
        <Label htmlFor="allTime">All Time</Label>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dateFrom">From</Label>
          <Input
            id="dateFrom"
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            disabled={allTime}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateTo">To</Label>
          <Input
            id="dateTo"
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            disabled={allTime}
          />
        </div>
      </div>
    </div>
  );
}