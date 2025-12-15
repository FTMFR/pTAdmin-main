// Main Layout with Sidebar and Header

import { useState, useEffect, useRef, ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  // مقدار اولیه بر اساس اندازه صفحه
  const getInitialSidebarState = () => {
    if (typeof window === "undefined") return false;
    const isDesktop = window.innerWidth >= 1024;
    return isDesktop;
  };

  const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>(
    "sidebarOpen",
    getInitialSidebarState()
  );
  const wasDesktopRef = useRef(window.innerWidth >= 1024);

  // تنظیم sidebarOpen بر اساس اندازه صفحه فقط در mount و resize
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;

      // فقط وقتی از desktop به mobile می‌رویم، sidebar را ببند
      if (!isDesktop && wasDesktopRef.current) {
        setSidebarOpen(false);
      }

      // وقتی از mobile به desktop می‌رویم، از localStorage استفاده کن
      if (isDesktop && !wasDesktopRef.current) {
        const saved = localStorage.getItem("sidebarOpen");
        if (saved === null) {
          setSidebarOpen(true);
        }
      }

      wasDesktopRef.current = isDesktop;
    };

    // تنظیم اولیه - فقط یک بار در mount
    const isDesktop = window.innerWidth >= 1024;
    wasDesktopRef.current = isDesktop;

    if (isDesktop) {
      const saved = localStorage.getItem("sidebarOpen");
      if (saved === null) {
        setSidebarOpen(true);
      }
    } else {
      // در mobile، اگر مقدار در localStorage وجود نداشته باشد، بسته باشد
      const saved = localStorage.getItem("sidebarOpen");
      if (saved === null) {
        setSidebarOpen(false);
      }
      // در غیر این صورت، مقدار از localStorage استفاده می‌شود
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // فقط یک بار در mount اجرا شود

  return (
    <div
      className="bg-[#F1F5F9] dark:bg-[#1A222C] min-h-screen flex overflow-hidden"
      dir="rtl"
    >
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div
        className={`relative flex flex-1 flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:mr-72 lg:ml-4" : "lg:mr-0 lg:ml-0"
        }`}
      >
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
