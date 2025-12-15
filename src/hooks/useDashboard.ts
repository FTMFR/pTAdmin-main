// Dashboard hook

import { useState, useEffect } from 'react';
import { dashboardApi } from '../services/api/dashboard';
import { DashboardData, DashboardStats } from '../types/api/dashboard';
import { LoadingState } from '../types/api/common';

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading('loading');
    setError(null);
    try {
      const response = await dashboardApi.getDashboardData();
      if (response.success && response.data) {
        setData(response.data);
        setLoading('success');
      } else {
        throw new Error(response.message || 'خطا در دریافت اطلاعات');
      }
    } catch (err: any) {
      setError(err.message || 'خطا در دریافت اطلاعات داشبورد');
      setLoading('error');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await dashboardApi.getStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (err: any) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchStats();
  }, []);

  return {
    data,
    stats,
    loading,
    error,
    refetch: fetchDashboardData,
  };
}

