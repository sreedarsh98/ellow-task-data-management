export interface DataRecord {
  id: string;
  name: string;
  category: string;
  status: string;
  createdAt: string;
}

export interface SortConfig {
  key: keyof DataRecord;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  categories: string[];
  statuses: string[];
}
