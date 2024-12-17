import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { NewsFilters as NewsFiltersType } from '@/types';

interface NewsFiltersProps {
  onFilter: (filters: NewsFiltersType) => void;
  isLoading?: boolean;
}

export function NewsFilters({ onFilter, isLoading }: NewsFiltersProps) {
  const [filters, setFilters] = useState<NewsFiltersType>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={filters.companyName || ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, companyName: e.target.value }))
              }
              placeholder="Enter company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={filters.keywords || ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, keywords: e.target.value }))
              }
              placeholder="Enter keywords"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateFrom">Date From</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateTo">Date To</Label>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="excludedKeywords">Excluded Keywords</Label>
            <Input
              id="excludedKeywords"
              value={filters.excludedKeywords || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  excludedKeywords: e.target.value,
                }))
              }
              placeholder="Enter keywords to exclude"
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Filtering...' : 'Apply Filters'}
        </Button>
      </form>
    </Card>
  );
}