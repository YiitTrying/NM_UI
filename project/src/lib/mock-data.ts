import type { Article, BookmarkGroup } from '@/types';

export const mockBookmarkGroups: BookmarkGroup[] = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Business' },
  { id: '3', name: 'Science' },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in 2024',
    url: 'https://example.com/ai-future',
    source: 'Tech Daily',
    publishedDate: '2024-03-15',
  },
  {
    id: '2',
    title: 'New Breakthrough in Quantum Computing',
    url: 'https://example.com/quantum',
    source: 'Science Weekly',
    publishedDate: '2024-03-14',
  },
  {
    id: '3',
    title: 'Global Market Trends Analysis',
    url: 'https://example.com/market-trends',
    source: 'Business Insider',
    publishedDate: '2024-03-13',
  },
];