// Table data hook

import { useState, useEffect } from 'react';
import { tablesApi } from '../services/api/tables';
import { TableRow, TableFilters } from '../types/tables/tableData';
import { PaginationParams, PaginatedResponse, LoadingState } from '../types/api/common';

interface UseTableDataOptions {
  endpoint: string;
  initialFilters?: TableFilters;
  initialPage?: number;
  initialLimit?: number;
}

export function useTableData(options: UseTableDataOptions) {
  const { endpoint, initialFilters = {}, initialPage = 1, initialLimit = 10 } = options;

  const [data, setData] = useState<TableRow[]>([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<TableFilters>(initialFilters);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (params?: PaginationParams & TableFilters) => {
    setLoading('loading');
    setError(null);
    try {
      const response = await tablesApi.getTableData(endpoint, {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
        ...params,
      });

      if (response.success && response.data) {
        setData(response.data.data);
        setPagination(response.data.pagination);
        setLoading('success');
      } else {
        throw new Error(response.message || 'خطا در دریافت اطلاعات');
      }
    } catch (err: any) {
      setError(err.message || 'خطا در دریافت اطلاعات جدول');
      setLoading('error');
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, pagination.page, pagination.limit]);

  const updateFilters = (newFilters: TableFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const changePage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const changeLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  return {
    data,
    pagination,
    filters,
    loading,
    error,
    refetch: fetchData,
    updateFilters,
    changePage,
    changeLimit,
  };
}

