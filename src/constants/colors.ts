/**
 * TailAdmin Color Constants
 * رنگ‌های استاندارد TailAdmin برای استفاده در TypeScript
 */

export const TailAdminColors = {
  // Primary Colors
  primary: '#3C50E0',
  primaryDark: '#2E3FBF',
  primaryLight: '#5B6FE8',

  // Background Colors
  backgroundLight: '#F1F5F9',
  backgroundDark: '#1C2434',
  backgroundDarkSecondary: '#24303F',
  backgroundDarkTertiary: '#313D4A',
  backgroundDarkQuaternary: '#1A222C',

  // Text Colors
  textPrimary: '#1C2434',
  textSecondary: '#64748B',
  textTertiary: '#8A99AF',
  textLight: '#DEE4EE',

  // Border/Stroke Colors
  stroke: '#E2E8F0',
  strokeDark: '#313D4A',

  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3C50E0',

  // Chart Colors
  chartBlue: '#3C50E0',
  chartBlueLight: '#80CAEE',
  chartPurple: '#6577F3',
  chartCyan: '#8FD0EF',
  chartTeal: '#0FADCF',

  // Sidebar Colors
  sidebarBg: '#1C2434',
  sidebarHover: '#333A48',
  sidebarText: '#DEE4EE',
  sidebarTextSecondary: '#8A99AF',
} as const;

export type TailAdminColor = typeof TailAdminColors[keyof typeof TailAdminColors];

