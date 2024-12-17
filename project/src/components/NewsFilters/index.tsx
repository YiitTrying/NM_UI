import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { KeywordInput } from './KeywordInput';
import { LocationSelect } from './LocationSelect';
import { LanguageSelect } from './LanguageSelect';
import { DateRangeInput } from './DateRangeInput';
import type { NewsFilters as NewsFiltersType } from '@/types';

interface NewsFiltersProps {
  onFilter: (filters: NewsFiltersType) => void;
  isLoading?: boolean;
}

export function NewsFilters({ onFilter, isLoading }: NewsFiltersProps) {
  const [filters, setFilters] = useState<NewsFiltersType>({
    companyName: '',
    keywords: [''],
    excludedKeywords: '',
    dateFrom: '',
    dateTo: '',
    allTime: false,
    depth: false,
    geo: 'US',
    language: 'en',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      ...filters,
      dateFrom: filters.allTime ? undefined : filters.dateFrom,
      dateTo: filters.allTime ? undefined : filters.dateTo,
    });
  };

  const handleReset = () => {
    setFilters({
      companyName: '',
      keywords: [''],
      excludedKeywords: '',
      dateFrom: '',
      dateTo: '',
      allTime: false,
      depth: false,
      geo: 'US',
      language: 'en',
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={filters.companyName}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, companyName: e.target.value }))
              }
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excludedKeywords">Excluded Keywords</Label>
            <Input
              id="excludedKeywords"
              value={filters.excludedKeywords}
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

        <KeywordInput
          keywords={filters.keywords || ['']}
          onChange={(keywords) => setFilters((prev) => ({ ...prev, keywords }))}
        />

        <DateRangeInput
          dateFrom={filters.dateFrom || ''}
          dateTo={filters.dateTo || ''}
          allTime={filters.allTime || false}
          onDateFromChange={(dateFrom) =>
            setFilters((prev) => ({ ...prev, dateFrom }))
          }
          onDateToChange={(dateTo) =>
            setFilters((prev) => ({ ...prev, dateTo }))
          }
          onAllTimeChange={(allTime) =>
            setFilters((prev) => ({ ...prev, allTime }))
          }
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <LocationSelect
            value={filters.geo || 'US'}
            onChange={(geo) => setFilters((prev) => ({ ...prev, geo }))}
          />

          <LanguageSelect
            value={filters.language || 'en'}
            onChange={(language) =>
              setFilters((prev) => ({ ...prev, language }))
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="depth"
            checked={filters.depth}
            onCheckedChange={(checked) =>
              setFilters((prev) => ({ ...prev, depth: !!checked }))
            }
          />
          <Label htmlFor="depth">Enable deeper search</Label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? 'Filtering...' : 'Apply Filters'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}