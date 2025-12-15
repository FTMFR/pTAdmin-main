// Error Fallback Component

import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9] dark:bg-[#1A222C] px-4" dir="rtl">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="mb-2 text-2xl font-semibold text-[#1C2434] dark:text-white">خطایی رخ داد</h1>
        <p className="mb-4 text-[#64748B] dark:text-[#8A99AF]">
          {error?.message || 'متأسفانه خطایی در سیستم رخ داده است.'}
        </p>
        <div className="flex justify-center gap-3">
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="flex items-center gap-2 rounded-lg bg-[#3C50E0] px-4 py-2 font-medium text-white transition-colors hover:bg-[#3C50E0]/90"
            >
              <RefreshCw className="w-4 h-4" />
              تلاش مجدد
            </button>
          )}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] px-4 py-2 font-medium text-[#1C2434] dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-[#313D4A]"
          >
            <Home className="w-4 h-4" />
            بازگشت به داشبورد
          </Link>
        </div>
      </div>
    </div>
  );
}

