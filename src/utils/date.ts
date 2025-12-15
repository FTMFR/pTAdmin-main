/**
 * Persian Date Utilities
 * توابع کمکی برای کار با تاریخ شمسی
 */

/**
 * تبدیل تاریخ میلادی به شمسی (ساده - بدون کتابخانه)
 * @param date - تاریخ میلادی (Date object یا string)
 * @returns تاریخ شمسی به فرمت YYYY/MM/DD
 */
export function toPersianDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // الگوریتم تبدیل میلادی به شمسی
  const gYear = d.getFullYear();
  const gMonth = d.getMonth() + 1;
  const gDay = d.getDate();

  const gy2 = gYear - 1600;
  const gm2 = gMonth - 1;
  const gd2 = gDay - 1;

  const gDayNo = 365 * gy2 + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd2 + (367 * gm2 - 362) / 12 + (gm2 <= 2 ? 0 : (gy2 % 4 === 0 && gy2 % 100 !== 0) || gy2 % 400 === 0 ? -1 : -2);

  const jDayNo = gDayNo - 79;
  const jNp = Math.floor(jDayNo / 12053);
  let jy = 979 + 33 * jNp + 4 * Math.floor((jDayNo - 33 * jNp * 12053) / 1461);
  let jDayNo2 = jDayNo - 33 * jNp * 12053 - 1461 * Math.floor((jDayNo - 33 * jNp * 12053) / 1461);

  if (jDayNo2 >= 366) {
    jy += Math.floor((jDayNo2 - 1) / 365);
    jDayNo2 = (jDayNo2 - 1) % 365;
  }

  let jm = 1;
  if (jDayNo2 < 186) {
    jm = 1 + Math.floor(jDayNo2 / 31);
  } else {
    jm = 7 + Math.floor((jDayNo2 - 186) / 30);
  }

  const jd = 1 + (jDayNo2 % 31 === 0 ? 31 : jDayNo2 % 31);

  return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
}

/**
 * فرمت‌دهی تاریخ شمسی
 * @param date - تاریخ میلادی
 * @param format - فرمت مورد نظر (default: 'YYYY/MM/DD')
 * @returns تاریخ فرمت شده
 */
export function formatPersianDate(date: Date | string, format: string = 'YYYY/MM/DD'): string {
  const persianDate = toPersianDate(date);
  const [year, month, day] = persianDate.split('/');

  const persianMonths = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];

  const persianDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

  let result = format;
  result = result.replace('YYYY', year);
  result = result.replace('MM', month);
  result = result.replace('DD', day);
  result = result.replace('MMMM', persianMonths[parseInt(month) - 1]);
  result = result.replace('MMM', persianMonths[parseInt(month) - 1].substring(0, 3));

  const d = typeof date === 'string' ? new Date(date) : date;
  const dayOfWeek = d.getDay();
  result = result.replace('dddd', persianDays[dayOfWeek === 6 ? 0 : dayOfWeek + 1]);

  return result;
}

/**
 * دریافت تاریخ امروز به شمسی
 * @returns تاریخ امروز به فرمت YYYY/MM/DD
 */
export function getTodayPersian(): string {
  return toPersianDate(new Date());
}

/**
 * تبدیل تاریخ شمسی به میلادی (ساده)
 * @param persianDate - تاریخ شمسی به فرمت YYYY/MM/DD
 * @returns تاریخ میلادی
 */
export function persianToGregorian(persianDate: string): Date {
  const [year, month, day] = persianDate.split('/').map(Number);

  const jy = year - 979;
  const jm = month - 1;
  const jd = day - 1;

  let jDayNo = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4) + jd + (jm < 7 ? jm * 31 : (jm - 7) * 30 + 186);
  const gDayNo = jDayNo + 79;

  let gy = 1600 + 400 * Math.floor(gDayNo / 146097);
  let gDayNo2 = gDayNo % 146097;

  let leap = true;
  if (gDayNo2 >= 36525) {
    gDayNo2--;
    gy += 100 * Math.floor(gDayNo2 / 36524);
    gDayNo2 = gDayNo2 % 36524;
    if (gDayNo2 >= 365) {
      gDayNo2++;
    } else {
      leap = false;
    }
  }

  gy += 4 * Math.floor(gDayNo2 / 1461);
  gDayNo2 %= 1461;

  if (gDayNo2 >= 366) {
    leap = false;
    gDayNo2--;
    gy += Math.floor(gDayNo2 / 365);
    gDayNo2 = gDayNo2 % 365;
  }

  let gd = gDayNo2 + 1;
  const sal_a = [0, 31, (leap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gm = 1;
  for (let i = 0; i < 13 && gd > sal_a[i]; i++) {
    gd -= sal_a[i];
    gm++;
  }

  return new Date(gy, gm - 1, gd);
}

