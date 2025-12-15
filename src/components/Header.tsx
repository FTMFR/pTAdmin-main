import { Search, Bell, MessageSquare, ChevronDown, Sun, Moon, User, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeProvider';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const currentTheme = theme || 'light';

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('خروج با موفقیت انجام شد');
      navigate('/auth/login');
    } catch (error: any) {
      toast.error(error.message || 'خطا در خروج');
    }
  };

  const notifications = [
    {
      name: 'تری فرانک',
      avatar: 'ت',
      message: 'درخواست مجوز تغییر پروژه - Nganter App',
      category: 'پروژه',
      time: '۵ دقیقه پیش',
      unread: true,
    },
    {
      name: 'آلنا فرانک',
      avatar: 'آ',
      message: 'درخواست مجوز تغییر پروژه - Nganter App',
      category: 'پروژه',
      time: '۸ دقیقه پیش',
      unread: true,
    },
    {
      name: 'جوسلین کنتر',
      avatar: 'ج',
      message: 'درخواست مجوز تغییر پروژه - Nganter App',
      category: 'پروژه',
      time: '۱۵ دقیقه پیش',
      unread: false,
    },
    {
      name: 'براندون فیلیپس',
      avatar: 'ب',
      message: 'درخواست مجوز تغییر پروژه - Nganter App',
      category: 'پروژه',
      time: '۱ ساعت پیش',
      unread: false,
    },
  ];

  const messages = [
    {
      name: 'مریم نصیری',
      message: 'سلام! چطور می‌تونم کمکتون کنم؟',
      time: '۵ دقیقه',
      avatar: 'م',
      online: true,
    },
    {
      name: 'حسین کریمی',
      message: 'لورم ایپسوم متن ساختگی',
      time: '۱۵ دقیقه',
      avatar: 'ح',
      online: false,
    },
    {
      name: 'زهرا احمدی',
      message: 'ممنون از پیگیری شما',
      time: '۳۰ دقیقه',
      avatar: 'ز',
      online: true,
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex w-full bg-white dark:bg-[#24303F] border-b border-stroke dark:border-[#313D4A]">
      <div className="flex flex-grow items-center justify-between px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4">
        {/* Left Section - Hamburger Toggle & Search */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hamburger Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-stroke dark:border-[#313D4A] text-[#64748B] dark:text-[#8A99AF] lg:h-11 lg:w-11 transition-colors ${
              sidebarOpen ? 'lg:bg-transparent dark:lg:bg-transparent bg-gray-100 dark:bg-[#313D4A]' : 'bg-white dark:bg-[#24303F] hover:bg-gray-100 dark:hover:bg-[#313D4A]'
            }`}
            aria-label="باز/بسته کردن منو"
          >
            {/* Desktop Icon - Hamburger */}
            <svg
              className="hidden fill-current lg:block"
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                fill="currentColor"
              />
            </svg>

            {/* Mobile Icon - Hamburger */}
            <svg
              className={`fill-current lg:hidden ${sidebarOpen ? 'hidden' : 'block'}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25L20 5.25C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75L4 6.75C3.58579 6.75 3.25 6.41422 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25L20 17.25C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75L4 18.75C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L12 12.75C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25L4 11.25Z"
                fill="currentColor"
              />
            </svg>

            {/* Mobile Icon - Close */}
            <svg
              className={`fill-current lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Search Box - Desktop Only */}
          <div className="hidden lg:block">
            <form>
              <div className="relative">
                <span className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none z-10">
                  <Search
                    className="w-5 h-5 fill-[#64748B] dark:fill-[#8A99AF]"
                  />
                </span>
                <input
                  type="text"
                  placeholder="جستجو یا تایپ دستور..."
                  id="search-input"
                  className="h-11 w-full rounded-lg border border-stroke dark:border-[#313D4A] bg-transparent py-2.5 pr-12 pl-12 text-sm text-[#1C2434] dark:text-white placeholder:text-[#64748B] dark:placeholder:text-[#8A99AF]/30 focus:border-[#3C50E0] focus:ring-3 focus:ring-[#3C50E0]/10 dark:focus:border-[#3C50E0] dark:focus:ring-[#3C50E0]/20 focus:outline-none transition-all lg:w-[350px] xl:w-[430px] dark:bg-white/[0.03]"
                />
                <button
                  id="search-button"
                  type="button"
                  className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-stroke dark:border-[#313D4A] bg-gray-50 dark:bg-white/[0.03] px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-[#64748B] dark:text-[#8A99AF]"
                >
                  <span> ⌘ </span>
                  <span> K </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 2xl:gap-7">
          <ul className="flex items-center gap-2 2xl:gap-4">
            {/* Dark Mode Toggle */}
            <li>
              <button
                onClick={() => {
                  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
                }}
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-stroke dark:border-[#313D4A] bg-gray dark:bg-[#313D4A] hover:bg-gray-2 dark:hover:bg-[#404D5E]"
                aria-label="تغییر تم"
              >
                {currentTheme === 'dark' ? (
                  <Sun className="w-5 h-5 dark:text-white" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </li>

            {/* Notification Dropdown */}
            <li className="relative">
              <button
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setMessageOpen(false);
                  setProfileOpen(false);
                }}
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-stroke dark:border-[#313D4A] bg-gray dark:bg-[#313D4A] hover:bg-gray-2 dark:hover:bg-[#404D5E]"
              >
                <span className="absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-red-500">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                </span>
                <Bell className="w-5 h-5 dark:text-white" />
              </button>

              {notificationOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationOpen(false)}
                  ></div>
                  <div className="absolute -right-16 sm:right-0 mt-2.5 flex w-75 sm:w-80 flex-col rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] shadow-lg z-50">
                    <div className="flex items-center justify-between px-4.5 py-3 border-b border-stroke dark:border-[#313D4A]">
                      <h5 className="text-sm font-medium text-[#1C2434] dark:text-white">
                        اعلان‌ها
                      </h5>
                      <button
                        onClick={() => setNotificationOpen(false)}
                        className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <ul className="flex flex-col overflow-y-auto max-h-90">
                      {notifications.map((notif, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="flex gap-3 border-b border-stroke dark:border-[#313D4A] px-4.5 py-3 hover:bg-gray-2 dark:hover:bg-[#313D4A]"
                          >
                            <div className="h-12 w-12 rounded-full bg-[#3C50E0] flex items-center justify-center text-white flex-shrink-0">
                              {notif.unread && (
                                <span className="absolute top-3 right-11 h-2 w-2 rounded-full border border-white bg-[#3C50E0]"></span>
                              )}
                              <span className="text-sm">{notif.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm mb-1">
                                <span className="text-[#1C2434] dark:text-white font-medium">{notif.name}</span>{' '}
                                <span className="text-[#64748B] dark:text-[#8A99AF]">{notif.message}</span>
                              </p>
                              <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">{notif.category} • {notif.time}</p>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-stroke dark:border-[#313D4A] px-4.5 py-3">
                      <button className="text-sm text-[#3C50E0] hover:underline w-full text-center">
                        مشاهده همه اعلان‌ها
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>

            {/* Message Dropdown */}
            <li className="relative">
              <button
                onClick={() => {
                  setMessageOpen(!messageOpen);
                  setNotificationOpen(false);
                  setProfileOpen(false);
                }}
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-stroke dark:border-[#313D4A] bg-gray dark:bg-[#313D4A] hover:bg-gray-2 dark:hover:bg-[#404D5E]"
              >
                <span className="absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-red-500">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                </span>
                <MessageSquare className="w-5 h-5 dark:text-white" />
              </button>

              {messageOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMessageOpen(false)}
                  ></div>
                  <div className="absolute -right-16 sm:right-0 mt-2.5 flex w-75 sm:w-80 flex-col rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] shadow-lg z-50">
                    <div className="px-4.5 py-3 border-b border-stroke dark:border-[#313D4A]">
                      <h5 className="text-sm font-medium text-[#1C2434] dark:text-white">
                        پیام‌ها
                      </h5>
                    </div>
                    <ul className="flex flex-col overflow-y-auto max-h-90">
                      {messages.map((msg, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="flex gap-4 border-b border-stroke dark:border-[#313D4A] px-4.5 py-3 hover:bg-gray-2 dark:hover:bg-[#313D4A]"
                          >
                            <div className="relative h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                              {msg.online && (
                                <span className="absolute -right-0.5 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                              )}
                              <span>{msg.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <h6 className="text-sm font-medium text-[#1C2434] dark:text-white mb-1">
                                {msg.name}
                              </h6>
                              <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">
                                {msg.message}
                              </p>
                              <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mt-1">
                                {msg.time}
                              </p>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </li>
          </ul>

          {/* User Area */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
                setMessageOpen(false);
              }}
              className="flex items-center gap-4"
            >
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-[#1C2434] dark:text-white">
                  {user?.fullName || 'کاربر'}
                </span>
                <span className="block text-xs text-[#64748B] dark:text-[#8A99AF]">
                  {user?.role === 'admin' ? 'مدیر سیستم' : 'کاربر'}
                </span>
              </span>

              <span className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <span>{user?.avatar || user?.fullName?.[0] || 'ک'}</span>
              </span>

              <ChevronDown className="hidden sm:block w-4 h-4 dark:text-white" />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                ></div>
                <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] shadow-lg z-50">
                  <div className="px-6 py-4 border-b border-stroke dark:border-[#313D4A]">
                    <p className="text-sm font-medium text-[#1C2434] dark:text-white">{user?.fullName || 'کاربر'}</p>
                    <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mt-0.5">{user?.email || ''}</p>
                  </div>
                  <ul className="flex flex-col py-2">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3.5 px-6 py-3 text-sm font-medium duration-300 ease-in-out hover:bg-gray-2 dark:hover:bg-[#313D4A] text-[#1C2434] dark:text-white"
                      >
                        <User className="w-5 h-5" />
                        ویرایش پروفایل
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3.5 px-6 py-3 text-sm font-medium duration-300 ease-in-out hover:bg-gray-2 dark:hover:bg-[#313D4A] text-[#1C2434] dark:text-white"
                      >
                        <Settings className="w-5 h-5" />
                        تنظیمات حساب
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-3.5 px-6 py-3 text-sm font-medium duration-300 ease-in-out hover:bg-gray-2 dark:hover:bg-[#313D4A] text-[#1C2434] dark:text-white"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        پشتیبانی
                      </a>
                    </li>
                  </ul>
                  <div className="border-t border-stroke dark:border-[#313D4A]">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3.5 px-6 py-3 text-sm font-medium duration-300 ease-in-out hover:bg-gray-2 dark:hover:bg-[#313D4A] text-[#1C2434] dark:text-white w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      خروج
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}