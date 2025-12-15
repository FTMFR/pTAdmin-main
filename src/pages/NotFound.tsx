// 404 Not Found Page

import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9] dark:bg-[#1A222C] px-4" dir="rtl">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#3C50E0] dark:text-[#3C50E0]">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-[#1C2434] dark:text-white">صفحه مورد نظر یافت نشد</h2>
        <p className="mt-2 text-[#64748B] dark:text-[#8A99AF]">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-[#3C50E0] px-6 py-3 font-medium text-white transition-colors hover:bg-[#3C50E0]/90"
          >
            <Home className="w-5 h-5" />
            بازگشت به داشبورد
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] px-6 py-3 font-medium text-[#1C2434] dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-[#313D4A]"
          >
            <ArrowRight className="w-5 h-5" />
            بازگشت به صفحه قبل
          </button>
        </div>
      </div>
    </div>
  );
}

