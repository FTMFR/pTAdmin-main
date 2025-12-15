// Route definitions

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { NotFound } from '../pages/NotFound';

// Lazy load components
const Dashboard = lazy(() => import('../components/Dashboard').then(m => ({ default: m.Dashboard })));
const AnalyticsDashboard = lazy(() => import('../components/AnalyticsDashboard').then(m => ({ default: m.AnalyticsDashboard })));
const CalendarPage = lazy(() => import('../components/CalendarPage').then(m => ({ default: m.CalendarPage })));
const ProfilePage = lazy(() => import('../components/ProfilePage').then(m => ({ default: m.ProfilePage })));
const FormElementsPage = lazy(() => import('../components/FormElementsPage').then(m => ({ default: m.FormElementsPage })));
const AdvancedFormPage = lazy(() => import('../components/AdvancedFormPage').then(m => ({ default: m.AdvancedFormPage })));
const TablesPage = lazy(() => import('../components/TablesPage').then(m => ({ default: m.TablesPage })));
const UIElementsPage = lazy(() => import('../components/UIElementsPage').then(m => ({ default: m.UIElementsPage })));
const SettingsPage = lazy(() => import('../components/SettingsPage').then(m => ({ default: m.SettingsPage })));
const AuthPage = lazy(() => import('../components/AuthPage').then(m => ({ default: m.AuthPage })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-12">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3C50E0] border-t-transparent"></div>
  </div>
);

export function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Auth routes */}
      <Route
        path="/auth"
        element={
          <AuthLayout>
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3C50E0] to-[#6366F1]">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                </div>
              }
            >
              <AuthPage />
            </Suspense>
          </AuthLayout>
        }
      />
      <Route
        path="/auth/login"
        element={
          <AuthLayout>
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3C50E0] to-[#6366F1]">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                </div>
              }
            >
              <AuthPage />
            </Suspense>
          </AuthLayout>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <AuthLayout>
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3C50E0] to-[#6366F1]">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                </div>
              }
            >
              <AuthPage />
            </Suspense>
          </AuthLayout>
        }
      />

      {/* Main routes - بدون نیاز به authentication در development */}
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <AnalyticsDashboard />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/calendar"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <CalendarPage />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <ProfilePage />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/forms"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <FormElementsPage />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/forms/advanced"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <AdvancedFormPage />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/tables"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <TablesPage />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/ui-elements"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <UIElementsPage />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <SettingsPage />
            </Suspense>
          </MainLayout>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

