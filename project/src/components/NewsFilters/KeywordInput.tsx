import { PlusIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface KeywordInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
  maxKeywords?: number;
}

export function KeywordInput({ keywords, onChange, maxKeywords = 5 }: KeywordInputProps) {
  const addKeyword = () => {
    if (keywords.length < maxKeywords) {
      onChange([...keywords, '']);
    }
  };

  const removeKeyword = (index: number) => {
    onChange(keywords.filter((_, i) => i !== index));
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    onChange(newKeywords);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Keywords</Label>
        {keywords.length < maxKeywords && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addKeyword}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Keyword
          </Button>
        )}
      </div>
      {keywords.map((keyword, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={keyword}
            onChange={(e) => updateKeyword(index, e.target.value)}
            placeholder={`Keyword ${index + 1}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeKeyword(index)}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}