import { useEffect, useState } from 'react';
import { NewsFilters } from '@/components/NewsFilters';
import { ArticleCard } from '@/components/ArticleCard';
import { fetchBookmarkGroups, fetchNews } from '@/lib/api-client';
import { useAsync } from '@/hooks/use-async';
import type { Article, BookmarkGroup, NewsFilters as NewsFiltersType } from '@/types';

export function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [bookmarkGroups, setBookmarkGroups] = useState<BookmarkGroup[]>([]);

  const { execute: loadGroups } = useAsync(fetchBookmarkGroups, {
    onSuccess: setBookmarkGroups,
    errorMessage: 'Failed to load bookmark groups',
  });

  const { execute: loadArticles, isLoading } = useAsync(fetchNews, {
    onSuccess: setArticles,
    errorMessage: 'Failed to load articles',
  });

  useEffect(() => {
    loadGroups();
    loadArticles({});
  }, [loadGroups, loadArticles]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">News Dashboard</h1>
      <NewsFilters onFilter={loadArticles} isLoading={isLoading} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            bookmarkGroups={bookmarkGroups}
            onBookmarkAdded={loadGroups}
          />
        ))}
      </div>
      {articles.length === 0 && !isLoading && (
        <p className="text-center text-muted-foreground">
          No articles found. Try adjusting your filters.
        </p>
      )}
    </div>
  );
}