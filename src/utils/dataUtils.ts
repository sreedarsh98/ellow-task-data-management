import { DataRecord, SortConfig, FilterConfig } from '../types/data';

export function searchRecords(
  records: DataRecord[],
  searchTerm: string
): DataRecord[] {
  if (!searchTerm.trim()) {
    return records;
  }

  const lowerSearch = searchTerm.toLowerCase();

  return records.filter((record) => {
    return (
      record.name.toLowerCase().includes(lowerSearch) ||
      record.category.toLowerCase().includes(lowerSearch) ||
      record.status.toLowerCase().includes(lowerSearch) ||
      record.id.toLowerCase().includes(lowerSearch) ||
      record.createdAt.toLowerCase().includes(lowerSearch)
    );
  });
}

export function sortRecords(
  records: DataRecord[],
  sortConfig: SortConfig | null
): DataRecord[] {
  if (!sortConfig) {
    return records;
  }

  const sorted = [...records].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return sorted;
}

export function filterRecords(
  records: DataRecord[],
  filters: FilterConfig
): DataRecord[] {
  let filtered = records;

  if (filters.categories.length > 0) {
    filtered = filtered.filter((record) =>
      filters.categories.includes(record.category)
    );
  }

  if (filters.statuses.length > 0) {
    filtered = filtered.filter((record) =>
      filters.statuses.includes(record.status)
    );
  }

  return filtered;
}

export function paginateRecords(
  records: DataRecord[],
  currentPage: number,
  pageSize: number
): DataRecord[] {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return records.slice(startIndex, endIndex);
}

export function getTotalPages(totalRecords: number, pageSize: number): number {
  return Math.ceil(totalRecords / pageSize);
}
