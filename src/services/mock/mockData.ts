// Mock Data for Development

import { DashboardStats, DashboardData } from '../../types/api/dashboard';
import { User } from '../../types/api/auth';
import { ApiResponse } from '../../types/api/common';
import { BasicFormData } from '../../types/forms/formElements';
import { AdvancedFormData } from '../../types/forms/advancedForm';

// Mock delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalViews: 3456,
  totalProfit: 45200,
  totalProducts: 2450,
  totalUsers: 3456,
  viewsChange: 0.43,
  profitChange: 4.35,
  productsChange: 2.59,
  usersChange: -0.95,
};

// Mock Dashboard Data
export const mockDashboardData: DashboardData = {
  stats: mockDashboardStats,
  salesChart: [
    { date: '2024-01', sales: 150, target: 180 },
    { date: '2024-02', sales: 350, target: 200 },
    { date: '2024-03', sales: 180, target: 170 },
    { date: '2024-04', sales: 250, target: 190 },
    { date: '2024-05', sales: 150, target: 180 },
    { date: '2024-06', sales: 180, target: 170 },
    { date: '2024-07', sales: 250, target: 190 },
  ],
  revenueChart: {
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
    series: [100, 200, 150, 250, 180, 220],
  },
  userChart: {
    labels: ['موبایل', 'دسکتاپ', 'تبلت'],
    series: [12, 65, 23],
  },
};

// Mock User
export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  fullName: 'علی احمدی',
  phone: '09123456789',
  avatar: 'ع',
  role: 'admin',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock API Functions
export const mockApi = {
  // Mock login
  login: async (email: string, password: string): Promise<ApiResponse<any>> => {
    await delay(1000);
    if (email === 'user@example.com' && password === 'password') {
      return {
        success: true,
        data: {
          user: mockUser,
          token: 'mock_token_' + Date.now(),
        },
        message: 'ورود با موفقیت انجام شد',
      };
    }
    throw {
      message: 'ایمیل یا رمز عبور اشتباه است',
      statusCode: 401,
    };
  },

  // Mock signup
  signup: async (data: any): Promise<ApiResponse<any>> => {
    await delay(1000);
    return {
      success: true,
      data: {
        user: { ...mockUser, email: data.email, fullName: data.fullName },
        token: 'mock_token_' + Date.now(),
      },
      message: 'ثبت‌نام با موفقیت انجام شد',
    };
  },

  // Mock get dashboard data
  getDashboardData: async (): Promise<ApiResponse<DashboardData>> => {
    await delay(800);
    return {
      success: true,
      data: mockDashboardData,
    };
  },

  // Mock get stats
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay(500);
    return {
      success: true,
      data: mockDashboardStats,
    };
  },
};

// Mock Forms API
export const mockFormsApi = {
  submitBasicForm: async (data: BasicFormData): Promise<ApiResponse<any>> => {
    await delay(1000);
    return {
      success: true,
      message: 'فرم با موفقیت ارسال شد',
      data: data,
    };
  },

  submitAdvancedForm: async (data: AdvancedFormData): Promise<ApiResponse<any>> => {
    await delay(1500);
    return {
      success: true,
      message: 'فرم پیشرفته با موفقیت ارسال شد',
      data: data,
    };
  },
};

// Check if we should use mock data
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || !import.meta.env.VITE_API_BASE_URL;

