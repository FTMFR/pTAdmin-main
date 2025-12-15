import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  User,
  FileText,
  Table,
  Settings,
  ChevronDown,
  ChevronRight,
  Grid,
  LogIn,
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface MenuItem {
  label: string;
  icon: any;
  badge?: string;
  submenu?: { label: string; href: string }[];
  href?: string;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      label: 'منو',
      icon: null,
      submenu: undefined,
    },
    {
      label: 'داشبورد',
      icon: LayoutDashboard,
      href: '/dashboard',
      submenu: [
        { label: 'تجارت الکترونیک', href: '/dashboard' },
        { label: 'تحلیلی', href: '/analytics' },
      ],
    },
    {
      label: 'تقویم',
      icon: Calendar,
      href: '/calendar',
    },
    {
      label: 'پروفایل',
      icon: User,
      href: '/profile',
    },
    {
      label: 'فرم‌ها',
      icon: FileText,
      href: '/forms',
      submenu: [
        { label: 'المان‌های فرم', href: '/forms' },
        { label: 'فرم پیشرفته', href: '/forms/advanced' },
      ],
    },
    {
      label: 'جداول',
      icon: Table,
      href: '/tables',
    },
    {
      label: 'UI Elements',
      icon: Grid,
      href: '/ui-elements',
    },
    {
      label: 'تنظیمات',
      icon: Settings,
      href: '/settings',
    },
    {
      label: 'صفحات',
      icon: null,
      submenu: undefined,
    },
    {
      label: 'احراز هویت',
      icon: LogIn,
      href: '/auth/login',
    },
  ];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-[#1C2434] dark:bg-[#1C2434] duration-300 ease-linear ${
          sidebarOpen 
            ? 'translate-x-0 lg:static lg:z-auto lg:border-l lg:border-[#313D4A]' 
            : 'translate-x-full lg:hidden'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">ت</span>
            </div>
            <span className="text-white text-xl font-bold">TailAdmin</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="block lg:hidden text-white"
            aria-label="بستن منو"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="px-4 py-4 lg:px-6">
            <div>
              {menuItems.map((item, index) => {
                if (!item.icon) {
                  return (
                    <h3
                      key={index}
                      className="mb-4 mr-4 text-sm font-semibold text-[#8A99AF]"
                    >
                      {item.label}
                    </h3>
                  );
                }

                const Icon = item.icon;
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isOpen = openSubmenu === item.label;
                const isActive = location.pathname === item.href || (item.submenu?.some(sub => location.pathname === sub.href));

                return (
                  <div key={index} className="mb-1.5">
                    {hasSubmenu ? (
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleSubmenu(item.label);
                          }
                        }}
                        aria-expanded={isOpen}
                        className={`group relative flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium duration-300 ease-in-out ${
                          isActive
                            ? 'bg-[#333A48] text-white'
                            : 'text-[#DEE4EE] hover:bg-[#333A48]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-right">{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={item.href || '#'}
                        onClick={(e) => {
                          // فقط در mobile منو را ببند
                          if (window.innerWidth < 1024) {
                            setSidebarOpen(false);
                          }
                        }}
                        className={({ isActive }) =>
                          `group relative flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium duration-300 ease-in-out ${
                            isActive
                              ? 'bg-[#333A48] text-white'
                              : 'text-[#DEE4EE] hover:bg-[#333A48]'
                          }`
                        }
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-right">{item.label}</span>
                      </NavLink>
                    )}

                    {/* Submenu */}
                    {hasSubmenu && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <ul className="mt-2 mr-6 space-y-2">
                          {item.submenu!.map((subitem, subIndex) => (
                            <li key={subIndex}>
                              <NavLink
                                to={subitem.href}
                                onClick={(e) => {
                                  // فقط در mobile منو را ببند
                                  if (window.innerWidth < 1024) {
                                    setSidebarOpen(false);
                                  }
                                }}
                                className={({ isActive }) =>
                                  `block w-full text-right rounded-lg px-4 py-2 text-sm transition-colors ${
                                    isActive
                                      ? 'bg-[#333A48] text-white'
                                      : 'text-[#DEE4EE] hover:bg-[#333A48]'
                                  }`
                                }
                              >
                                {subitem.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Additional Menu Group */}
            <div className="mt-8">
              <h3 className="mb-4 mr-4 text-sm font-semibold text-[#8A99AF]">
                سایر
              </h3>
              <button className="group relative flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="flex-1 text-right">نمودار</span>
              </button>

              <button className="group relative flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] mt-1.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span className="flex-1 text-right">رابط کاربری</span>
              </button>

              <button className="group relative flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] mt-1.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="flex-1 text-right">احراز هویت</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}