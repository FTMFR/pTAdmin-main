// Dashboard types

export interface DashboardStats {
  totalViews: number;
  totalProfit: number;
  totalProducts: number;
  totalUsers: number;
  viewsChange: number;
  profitChange: number;
  productsChange: number;
  usersChange: number;
}

export interface SalesData {
  date: string;
  sales: number;
  target: number;
}

export interface ChartData {
  labels: string[];
  series: number[];
  categories?: string[];
}

export interface DashboardData {
  stats: DashboardStats;
  salesChart: SalesData[];
  revenueChart: ChartData;
  userChart: ChartData;
}

