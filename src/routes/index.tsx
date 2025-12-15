// Route definitions

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { NotFound } from '../pages/NotFound';

// Lazy load components
const Dashboard = lazy(() => import('../components/Dashboard').then(m => ({ default: m.Dashboard })));
const ProfilePage = lazy(() => import('../components/ProfilePage').then(m => ({ default: m.ProfilePage })));

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
        path="/profile"
        element={
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <ProfilePage />
            </Suspense>
          </MainLayout>
        }
      />  
              
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

