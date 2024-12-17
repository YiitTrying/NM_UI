import type { Article, BookmarkGroup, NewsFilters } from '@/types';
import { mockArticles, mockBookmarkGroups } from './mock-data';

const API_BASE = '/news_manager';
const IS_MOCK = true; // Toggle this to switch between mock and real API

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown error');
    throw new Error(error);
  }
  return response.json();
}

export async function fetchBookmarkGroups(): Promise<BookmarkGroup[]> {
  if (IS_MOCK) {
    return Promise.resolve(mockBookmarkGroups);
  }

  const response = await fetch(`${API_BASE}/api/bookmark-groups/`);
  return handleResponse<BookmarkGroup[]>(response);
}

export async function bookmarkArticle(articleId: string, groupId: string): Promise<void> {
  if (IS_MOCK) {
    return Promise.resolve();
  }

  const response = await fetch(`${API_BASE}/bookmark_article/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articleId, groupId }),
  });
  return handleResponse<void>(response);
}

export async function fetchNews(filters: NewsFilters): Promise<Article[]> {
  if (IS_MOCK) {
    // Simulate filtering
    return Promise.resolve(mockArticles.filter(article => {
      if (filters.keywords && !article.title.toLowerCase().includes(filters.keywords.toLowerCase())) {
        return false;
      }
      if (filters.dateFrom && article.publishedDate < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && article.publishedDate > filters.dateTo) {
        return false;
      }
      return true;
    }));
  }

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  
  const response = await fetch(`${API_BASE}/fetch-news/?${params}`);
  return handleResponse<Article[]>(response);
}

export async function createBookmarkGroup(name: string): Promise<BookmarkGroup> {
  if (IS_MOCK) {
    const newGroup: BookmarkGroup = {
      id: String(mockBookmarkGroups.length + 1),
      name,
    };
    mockBookmarkGroups.push(newGroup);
    return Promise.resolve(newGroup);
  }

  const response = await fetch(`${API_BASE}/create-group/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return handleResponse<BookmarkGroup>(response);
}