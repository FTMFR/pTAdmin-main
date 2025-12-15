// Main Layout with Sidebar and Header

import { useState, useEffect, ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true);

  // تنظیم sidebarOpen بر اساس اندازه صفحه در mount و resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // در desktop، اگر منو بسته است و قبلاً باز بوده، بازش کن
        // اما اگر کاربر عمداً بسته باشد، باز نکن
        const saved = localStorage.getItem('sidebarOpen');
        if (saved === null) {
          // اگر هیچ مقداری ذخیره نشده، به صورت پیش‌فرض باز باشد
          setSidebarOpen(true);
        }
        // اگر saved === 'true' یا 'false' باشد، همان مقدار را نگه دار
      } else {
        // در mobile، همیشه بسته باشد
        setSidebarOpen(false);
      }
    };

    // فقط در mount اولیه تنظیم کن
    if (window.innerWidth >= 1024) {
      const saved = localStorage.getItem('sidebarOpen');
      if (saved === null) {
        setSidebarOpen(true);
      }
    } else {
      setSidebarOpen(false);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  return (
    <div className="bg-[#F1F5F9] dark:bg-[#1A222C] min-h-screen flex overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div
        className={`relative flex flex-1 flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:mr-72 lg:ml-4' : 'lg:mr-0 lg:ml-0'
        }`}
      >
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

