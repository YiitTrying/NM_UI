import { useState } from 'react';
import { BookmarkIcon, ClockIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { bookmarkArticle } from '@/lib/api-client';
import type { Article, BookmarkGroup } from '@/types';

interface ArticleCardProps {
  article: Article;
  bookmarkGroups: BookmarkGroup[];
  onBookmarkAdded?: () => void;
}

export function ArticleCard({
  article,
  bookmarkGroups,
  onBookmarkAdded,
}: ArticleCardProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [isBookmarking, setIsBookmarking] = useState(false);
  const { toast } = useToast();

  const handleBookmark = async () => {
    if (!selectedGroup) {
      toast({
        title: 'Error',
        description: 'Please select a bookmark group',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsBookmarking(true);
      await bookmarkArticle(article.id, selectedGroup);
      toast({
        title: 'Success',
        description: 'Article bookmarked successfully',
      });
      onBookmarkAdded?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to bookmark article',
        variant: 'destructive',
      });
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {article.title}
            </a>
          </CardTitle>
          {article.is_old && (
            <Badge variant="secondary" className="shrink-0">
              <ClockIcon className="mr-1 h-3 w-3" />
              Old
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{article.source || 'Unknown'}</span>
            <time>
              {format(new Date(article.publishedDate), 'MMM d, yyyy')}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={selectedGroup}
              onValueChange={setSelectedGroup}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                {bookmarkGroups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmark}
              disabled={isBookmarking}
            >
              <BookmarkIcon className="mr-2 h-4 w-4" />
              {isBookmarking ? 'Bookmarking...' : 'Bookmark'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}