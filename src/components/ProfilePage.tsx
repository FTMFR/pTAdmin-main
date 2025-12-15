import { useState } from 'react';
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Edit,
} from 'lucide-react';
import { toPersianNumber } from '../utils/numbers';

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');

  const userInfo = {
    name: 'علی محمدی',
    role: 'توسعه‌دهنده فول‌استک',
    bio: 'توسعه‌دهنده با تجربه با بیش از ۵ سال سابقه کار در حوزه وب. علاقه‌مند به یادگیری تکنولوژی‌های جدید و کار تیمی.',
    avatar: '',
    coverImage: '',
    email: 'ali.mohammadi@example.com',
    phone: '+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹',
    location: 'تهران، ایران',
    company: 'شرکت فناوری نوآور',
    joinDate: '۱۴۰۱/۰۳/۱۵',
    website: 'www.alimohammadi.ir',
    social: {
      instagram: '@ali_mohammadi',
      linkedin: 'ali-mohammadi',
      twitter: '@alimohammadi',
    },
  };

  const stats = [
    { label: 'پروژه‌های تکمیل شده', value: '۴۲' },
    { label: 'مشتریان راضی', value: '۳۵' },
    { label: 'ساعات کاری', value: '۱۲۰۰+' },
    { label: 'امتیاز رضایت', value: '۹۸%' },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'پروژه جدید اضافه کرد',
      project: 'داشبورد فروشگاه',
      time: '۲ ساعت پیش',
    },
    {
      id: 2,
      action: 'نظر جدیدی دریافت کرد',
      project: 'وب‌سایت شرکتی',
      time: '۵ ساعت پیش',
    },
    {
      id: 3,
      action: 'پروفایل را به‌روزرسانی کرد',
      project: '',
      time: 'دیروز',
    },
    {
      id: 4,
      action: 'پروژه را تکمیل کرد',
      project: 'اپلیکیشن موبایل',
      time: '۳ روز پیش',
    },
  ];

  const skills = [
    'React',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'Next.js',
    'PostgreSQL',
    'GraphQL',
    'Docker',
  ];

  return (
    <div className="space-y-6">
      {/* Cover & Avatar Section */}
      <div className="rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] shadow-sm dark:shadow-none overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-[#3C50E0] to-[#6366F1]">
          
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white dark:border-[#24303F] bg-[#F1F5F9] dark:bg-[#313D4A] text-4xl font-semibold text-[#3C50E0]">
                {userInfo.avatar ? (
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  userInfo.name.charAt(0)
                )}
              </div>
              <button className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#3C50E0] text-white hover:bg-[#3C50E0]/90 transition-colors" aria-label="تغییر تصویر پروفایل">
                <Camera className="h-5 w-5" />
              </button>
            </div>

            {/* Edit Button */}
            <button className="flex h-11 items-center gap-2 rounded-md border border-stroke dark:border-[#313D4A] px-6 text-sm font-medium text-[#1C2434] dark:text-white hover:border-[#3C50E0] hover:bg-[#3C50E0]/5 transition-colors">
              <Edit className="h-4 w-4" />
              ویرایش پروفایل
            </button>
          </div>

          {/* User Details */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white mb-1">{userInfo.name}</h2>
            <p className="text-[#64748B] dark:text-[#8A99AF] mb-3">{userInfo.role}</p>
            <p className="text-[#1C2434] dark:text-white leading-relaxed max-w-3xl">{userInfo.bio}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg border border-stroke dark:border-[#313D4A] p-4 text-center">
                <p className="text-2xl font-bold text-[#3C50E0] mb-1">
                  {toPersianNumber(stat.value)}
                </p>
                <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3C50E0]/10">
                <Mail className="h-5 w-5 text-[#3C50E0]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mb-0.5">ایمیل</p>
                <p className="text-sm font-medium text-[#1C2434] dark:text-white truncate">{userInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3C50E0]/10">
                <Phone className="h-5 w-5 text-[#3C50E0]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mb-0.5">تلفن</p>
                <p className="text-sm font-medium text-[#1C2434] dark:text-white">{userInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3C50E0]/10">
                <MapPin className="h-5 w-5 text-[#3C50E0]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mb-0.5">موقعیت</p>
                <p className="text-sm font-medium text-[#1C2434] dark:text-white">{userInfo.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3C50E0]/10">
                <Briefcase className="h-5 w-5 text-[#3C50E0]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mb-0.5">شرکت</p>
                <p className="text-sm font-medium text-[#1C2434] dark:text-white">{userInfo.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3C50E0]/10">
                <Calendar className="h-5 w-5 text-[#3C50E0]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mb-0.5">تاریخ عضویت</p>
                <p className="text-sm font-medium text-[#1C2434] dark:text-white">
                  {toPersianNumber(userInfo.joinDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3C50E0]/10">
                <Globe className="h-5 w-5 text-[#3C50E0]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mb-0.5">وب‌سایت</p>
                <p className="text-sm font-medium text-[#1C2434] dark:text-white truncate">{userInfo.website}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] shadow-sm dark:shadow-none">
            <div className="border-b border-stroke dark:border-[#313D4A] px-6 py-4">
              <h3 className="font-semibold text-[#1C2434] dark:text-white">فعالیت‌های اخیر</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 rounded-lg border border-stroke dark:border-[#313D4A] p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3C50E0]/10">
                      <div className="h-2 w-2 rounded-full bg-[#3C50E0]"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#1C2434] dark:text-white mb-1">
                        <span className="font-medium">{activity.action}</span>
                        {activity.project && (
                          <span className="text-[#64748B] dark:text-[#8A99AF]"> - {activity.project}</span>
                        )}
                      </p>
                      <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Social */}
        <div className="space-y-6">
          {/* Skills */}
          <div className="rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] shadow-sm dark:shadow-none">
            <div className="border-b border-stroke dark:border-[#313D4A] px-6 py-4">
              <h3 className="font-semibold text-[#1C2434] dark:text-white">مهارت‌ها</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-[#3C50E0] bg-[#3C50E0]/5 px-4 py-1.5 text-sm font-medium text-[#3C50E0]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] shadow-sm dark:shadow-none">
            <div className="border-b border-stroke dark:border-[#313D4A] px-6 py-4">
              <h3 className="font-semibold text-[#1C2434] dark:text-white">شبکه‌های اجتماعی</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] p-3 hover:border-[#3C50E0] hover:bg-[#3C50E0]/5 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-[#E4405F]" />
                  <span className="text-sm text-[#1C2434] dark:text-white">{userInfo.social.instagram}</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] p-3 hover:border-[#3C50E0] hover:bg-[#3C50E0]/5 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                  <span className="text-sm text-[#1C2434] dark:text-white">{userInfo.social.linkedin}</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg border border-stroke dark:border-[#313D4A] p-3 hover:border-[#3C50E0] hover:bg-[#3C50E0]/5 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                  <span className="text-sm text-[#1C2434] dark:text-white">{userInfo.social.twitter}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
