// Dashboard API

import apiClient from './client';
import { ApiResponse } from '../types/api/common';
import { DashboardData, DashboardStats } from '../../types/api/dashboard';
import { USE_MOCK_DATA, mockApi } from '../mock/mockData';

export const dashboardApi = {
  // Get dashboard stats
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    if (USE_MOCK_DATA) {
      return await mockApi.getStats();
    }
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data;
  },

  // Get dashboard data
  getDashboardData: async (): Promise<ApiResponse<DashboardData>> => {
    if (USE_MOCK_DATA) {
      return await mockApi.getDashboardData();
    }
    const response = await apiClient.get<ApiResponse<DashboardData>>('/dashboard');
    return response.data;
  },

  // Get sales chart data
  getSalesChart: async (period: 'day' | 'week' | 'month' = 'month'): Promise<ApiResponse<any>> => {
    if (USE_MOCK_DATA) {
      return { success: true, data: { period, data: [] } };
    }
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/sales-chart', {
      params: { period },
    });
    return response.data;
  },
};

