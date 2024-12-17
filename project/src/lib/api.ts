import { Article, BookmarkGroup, NewsFilters } from '@/types';

const API_BASE = '/news_manager';

export async function fetchBookmarkGroups(): Promise<BookmarkGroup[]> {
  const response = await fetch(`${API_BASE}/api/bookmark-groups/`);
  if (!response.ok) throw new Error('Failed to fetch bookmark groups');
  return response.json();
}

export async function bookmarkArticle(articleId: string, groupId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/bookmark_article/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articleId, groupId }),
  });
  if (!response.ok) throw new Error('Failed to bookmark article');
}

export async function fetchNews(filters: NewsFilters): Promise<Article[]> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  
  const response = await fetch(`${API_BASE}/fetch-news/?${params}`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

export async function createBookmarkGroup(name: string): Promise<BookmarkGroup> {
  const response = await fetch(`${API_BASE}/create-group/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error('Failed to create bookmark group');
  return response.json();
}