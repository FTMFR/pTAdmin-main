// Tables API

import apiClient from './client';
import { ApiResponse, PaginatedResponse, PaginationParams } from '../types/api/common';
import { TableRow, TableFilters } from '../../types/tables/tableData';

export const tablesApi = {
  // Get table data
  getTableData: async (
    endpoint: string,
    params?: PaginationParams & TableFilters
  ): Promise<ApiResponse<PaginatedResponse<TableRow>>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<TableRow>>>(endpoint, {
      params,
    });
    return response.data;
  },

  // Get single row
  getTableRow: async (endpoint: string, id: string): Promise<ApiResponse<TableRow>> => {
    const response = await apiClient.get<ApiResponse<TableRow>>(`${endpoint}/${id}`);
    return response.data;
  },

  // Create row
  createTableRow: async (endpoint: string, data: Partial<TableRow>): Promise<ApiResponse<TableRow>> => {
    const response = await apiClient.post<ApiResponse<TableRow>>(endpoint, data);
    return response.data;
  },

  // Update row
  updateTableRow: async (
    endpoint: string,
    id: string,
    data: Partial<TableRow>
  ): Promise<ApiResponse<TableRow>> => {
    const response = await apiClient.put<ApiResponse<TableRow>>(`${endpoint}/${id}`, data);
    return response.data;
  },

  // Delete row
  deleteTableRow: async (endpoint: string, id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`${endpoint}/${id}`);
    return response.data;
  },
};

