import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';
import { toast } from 'sonner';

type AuthMode = 'login' | 'signup';

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isAuthenticated } = useAuth();
  const [mode, setMode] = useState<AuthMode>(location.pathname.includes('signup') ? 'signup' : 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    acceptTerms: false,
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (mode === 'signup') {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'نام کامل الزامی است';
      }
      if (formData.password.length < 8) {
        newErrors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'رمز عبور و تکرار آن باید یکسان باشند';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'لطفاً قوانین و مقررات را بپذیرید';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'ایمیل معتبر نیست';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'رمز عبور الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password, formData.rememberMe);
        toast.success('ورود با موفقیت انجام شد');
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        await signup(
          formData.email,
          formData.password,
          formData.confirmPassword,
          formData.fullName,
          formData.phone || undefined
        );
        toast.success('ثبت‌نام با موفقیت انجام شد');
        navigate('/dashboard', { replace: true });
      }
    } catch (error: any) {
      const errorMessage = error.message || 'خطایی رخ داد. لطفاً دوباره تلاش کنید';
      toast.error(errorMessage);
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3C50E0] to-[#6366F1] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-[#24303F] shadow-lg">
            <span className="text-3xl font-bold text-[#3C50E0]">ت</span>
          </div>
          <h1 className="text-3xl font-bold text-white">TailAdmin</h1>
          <p className="mt-2 text-sm text-white/80">
            {mode === 'login'
              ? 'به داشبورد خود خوش آمدید'
              : 'ایجاد حساب کاربری جدید'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl bg-white dark:bg-[#24303F] p-8 shadow-2xl">
          {/* Tabs */}
          <div className="mb-8 flex rounded-lg bg-[#F1F5F9] p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-[#24303F] text-[#1C2434] dark:text-white shadow-sm'
                  : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:text-white'
              }`}
            >
              ورود
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-[#24303F] text-[#1C2434] dark:text-white shadow-sm'
                  : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:text-white'
              }`}
            >
              ثبت‌نام
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Signup Only Fields */}
            {mode === 'signup' && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">
                    نام کامل
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="نام و نام خانوادگی"
                      className={`w-full rounded-lg border ${
                        errors.fullName ? 'border-red-500' : 'border-stroke dark:border-[#313D4A]'
                      } bg-transparent py-3 pl-12 pr-4 text-[#1C2434] dark:text-white outline-none transition focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/20`}
                      required
                    />
                    {errors.fullName && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4" />
                        {errors.fullName}
                      </p>
                    )}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF]">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">
                    شماره تلفن
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
                      className="w-full rounded-lg border border-stroke dark:border-[#313D4A] bg-transparent py-3 pl-12 pr-4 text-[#1C2434] dark:text-white outline-none transition focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/20"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF]">
                      <Phone className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">
                ایمیل
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="example@domain.com"
                  className={`w-full rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-stroke dark:border-[#313D4A]'
                  } bg-transparent py-3 pl-12 pr-4 text-[#1C2434] dark:text-white outline-none transition focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/20`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF]">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">
                رمز عبور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="حداقل ۸ کاراکتر"
                  className={`w-full rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-stroke dark:border-[#313D4A]'
                  } bg-transparent py-3 pl-12 pr-12 text-[#1C2434] dark:text-white outline-none transition focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/20`}
                  required
                />
                {errors.password && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF]">
                  <Lock className="h-5 w-5" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0] transition-colors"
                  aria-label={showPassword ? 'مخفی کردن رمز عبور' : 'نمایش رمز عبور'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Signup Only) */}
            {mode === 'signup' && (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">
                  تکرار رمز عبور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    placeholder="رمز عبور را تکرار کنید"
                    className={`w-full rounded-lg border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-stroke dark:border-[#313D4A]'
                    } bg-transparent py-3 pl-12 pr-4 text-[#1C2434] dark:text-white outline-none transition focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/20`}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                      <AlertCircle className="h-4 w-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF]">
                    <Lock className="h-5 w-5" />
                  </div>
                </div>
              </div>
            )}

            {/* Remember Me / Accept Terms */}
            {mode === 'login' ? (
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      setFormData({ ...formData, rememberMe: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-stroke text-[#3C50E0] focus:ring-[#3C50E0]"
                  />
                  <span className="text-sm text-[#64748B] dark:text-[#8A99AF]">مرا به خاطر بسپار</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-[#3C50E0] hover:underline transition-colors"
                >
                  فراموشی رمز عبور؟
                </a>
              </div>
            ) : (
              <div>
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) =>
                      setFormData({ ...formData, acceptTerms: e.target.checked })
                    }
                    className="mt-0.5 h-4 w-4 rounded border-stroke text-[#3C50E0] focus:ring-[#3C50E0]"
                    required
                  />
                  <span className="text-sm text-[#64748B] dark:text-[#8A99AF]">
                    <a href="#" className="text-[#3C50E0] hover:underline">
                      قوانین و مقررات
                    </a>{' '}
                    را مطالعه کرده و می‌پذیرم
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors.acceptTerms}
                  </p>
                )}
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="rounded-lg border border-red-500 bg-red-50 dark:bg-red-900/20 p-3">
                <p className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#3C50E0] py-3 font-medium text-white shadow-lg shadow-[#3C50E0]/25 transition-all hover:bg-[#3C50E0]/90 hover:shadow-xl hover:shadow-[#3C50E0]/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="text-white" />
                  <span>در حال پردازش...</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'ورود به حساب کاربری' : 'ایجاد حساب کاربری'}</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-stroke"></div>
            <span className="text-sm text-[#64748B] dark:text-[#8A99AF]">یا</span>
            <div className="h-px flex-1 bg-stroke"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] py-3 font-medium text-[#1C2434] dark:text-white transition-all hover:border-[#3C50E0] hover:bg-[#3C50E0]/5">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              ادامه با گوگل
            </button>

            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] py-3 font-medium text-[#1C2434] dark:text-white transition-all hover:border-[#3C50E0] hover:bg-[#3C50E0]/5">
              <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              ادامه با فیسبوک
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-[#64748B] dark:text-[#8A99AF]">
            {mode === 'login' ? (
              <>
                حساب کاربری ندارید؟{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-[#3C50E0] hover:underline font-medium"
                >
                  ثبت‌نام کنید
                </button>
              </>
            ) : (
              <>
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#3C50E0] hover:underline font-medium"
                >
                  وارد شوید
                </button>
              </>
            )}
          </p>
        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} TailAdmin. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
  );
}
