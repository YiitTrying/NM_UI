export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedDate: string;
  is_old?: boolean;
}

export interface BookmarkGroup {
  id: string;
  name: string;
}

export interface NewsFilters {
  companyName?: string;
  keywords?: string[];
  excludedKeywords?: string;
  dateFrom?: string;
  dateTo?: string;
  allTime?: boolean;
  depth?: boolean;
  geo?: string;
  language?: string;
  page?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}