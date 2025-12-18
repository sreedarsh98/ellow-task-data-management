import { useState, useMemo, useCallback, useEffect } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { DataRecord, SortConfig, FilterConfig } from '../types/data';
import {
  searchRecords,
  sortRecords,
  filterRecords,
  paginateRecords,
  getTotalPages,
} from '../utils/dataUtils';
import { debounce } from '../utils/debounce';
import { SearchBar } from './SearchBar';
import { MultiSelect } from './MultiSelect';
import { Pagination } from './Pagination';

interface DataTableProps {
  data: DataRecord[];
  isLoading?: boolean;
}

const PAGE_SIZE = 20;

export function DataTable({ data, isLoading = false }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<FilterConfig>({
    categories: [],
    statuses: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  /* -------------------- Debounced Search -------------------- */
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
        setCurrentPage(1);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchTerm);
  }, [searchTerm, debouncedSetSearch]);

  /* -------------------- Filter Options -------------------- */
  const availableCategories = useMemo(() => {
    return Array.from(new Set(data.map(r => r.category))).sort();
  }, [data]);

  const availableStatuses = useMemo(() => {
    return Array.from(new Set(data.map(r => r.status))).sort();
  }, [data]);

  /* -------------------- Data Processing -------------------- */
  const processedData = useMemo(() => {
    let result = data;
    result = searchRecords(result, debouncedSearchTerm);
    result = filterRecords(result, filters);
    result = sortRecords(result, sortConfig);
    return result;
  }, [data, debouncedSearchTerm, filters, sortConfig]);

  const paginatedData = useMemo(
    () => paginateRecords(processedData, currentPage, PAGE_SIZE),
    [processedData, currentPage]
  );

  const totalPages = getTotalPages(processedData.length, PAGE_SIZE);

  /* -------------------- Handlers -------------------- */
  const handleSort = useCallback((key: keyof DataRecord) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        return null;
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const handleCategoryFilterChange = useCallback((selected: string[]) => {
    setFilters(prev => ({ ...prev, categories: selected }));
    setCurrentPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((selected: string[]) => {
    setFilters(prev => ({ ...prev, statuses: selected }));
    setCurrentPage(1);
  }, []);

  /* -------------------- Helpers -------------------- */
  const getSortIcon = (columnKey: keyof DataRecord) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /* -------------------- Loading -------------------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  /* -------------------- Render -------------------- */
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Top Controls */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name, category, status, ID..."
            />
          </div>
          <div className="flex gap-3">
            <div className="w-48">
              <MultiSelect
                label="Category"
                options={availableCategories}
                selected={filters.categories}
                onChange={handleCategoryFilterChange}
              />
            </div>
            <div className="w-48">
              <MultiSelect
                label="Status"
                options={availableStatuses}
                selected={filters.statuses}
                onChange={handleStatusFilterChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {/* Serial Number */}
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                #
              </th>

              <th
                onClick={() => handleSort('id')}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  ID {getSortIcon('id')}
                </div>
              </th>

              <th
                onClick={() => handleSort('name')}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Name {getSortIcon('name')}
                </div>
              </th>

              <th
                onClick={() => handleSort('category')}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Category {getSortIcon('category')}
                </div>
              </th>

              <th
                onClick={() => handleSort('status')}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Status {getSortIcon('status')}
                </div>
              </th>

              <th
                onClick={() => handleSort('createdAt')}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Created At {getSortIcon('createdAt')}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <p className="text-gray-500 text-lg font-medium">
                    No results found
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your search or filters
                  </p>
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  {/* Serial Number */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {record.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {record.category}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {record.createdAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginatedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalRecords={processedData.length}
          pageSize={PAGE_SIZE}
        />
      )}
    </div>
  );
}
