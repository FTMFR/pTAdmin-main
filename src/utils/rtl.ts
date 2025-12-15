/**
 * RTL Helper Functions
 * توابع کمکی برای مدیریت RTL
 */

/**
 * تبدیل کلاس‌های margin/padding از LTR به RTL
 * @param classes - کلاس‌های Tailwind
 * @returns کلاس‌های تبدیل شده به RTL
 */
export function convertToRTL(classes: string): string {
  const rtlMap: Record<string, string> = {
    'ml-': 'mr-',
    'mr-': 'ml-',
    'pl-': 'pr-',
    'pr-': 'pl-',
    'left-': 'right-',
    'right-': 'left-',
    'rounded-l': 'rounded-r',
    'rounded-r': 'rounded-l',
    'border-l': 'border-r',
    'border-r': 'border-l',
  };

  let result = classes;
  for (const [ltr, rtl] of Object.entries(rtlMap)) {
    result = result.replace(new RegExp(ltr, 'g'), rtl);
  }

  return result;
}

/**
 * بررسی اینکه آیا المان باید RTL باشد یا نه
 * @param element - المان HTML
 * @returns true اگر RTL باشد
 */
export function isRTL(element?: HTMLElement | null): boolean {
  if (!element) {
    return document.documentElement.dir === 'rtl';
  }
  return element.dir === 'rtl' || element.closest('[dir="rtl"]') !== null;
}

/**
 * دریافت کلاس‌های RTL برای flex direction
 */
export function getFlexDirectionRTL(): string {
  return 'flex-row-reverse';
}

/**
 * دریافت کلاس‌های RTL برای text alignment
 */
export function getTextAlignRTL(): string {
  return 'text-right';
}

