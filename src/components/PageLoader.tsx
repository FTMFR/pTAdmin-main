// Page Loader Component

import { LoadingSpinner } from './LoadingSpinner';

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9] dark:bg-[#1A222C]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-[#64748B] dark:text-[#8A99AF]">در حال بارگذاری...</p>
      </div>
    </div>
  );
}

