/**
 * Convert English numbers to Persian numbers
 * تبدیل اعداد انگلیسی به فارسی
 * @param num - عدد یا رشته عددی
 * @returns رشته با اعداد فارسی
 */
export function toPersianNumber(num: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const str = num.toString();
  return str.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

/**
 * Format large numbers with Persian separators and digits
 * فرمت‌دهی اعداد بزرگ با جداکننده فارسی
 * @param num - عدد
 * @returns رشته فرمت شده با اعداد فارسی
 */
export function formatPersianNumber(num: number): string {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '،');
  return toPersianNumber(parts.join('.'));
}

/**
 * Convert Persian numbers to English numbers
 * تبدیل اعداد فارسی به انگلیسی
 * @param persianNum - رشته با اعداد فارسی
 * @returns رشته با اعداد انگلیسی
 */
export function toEnglishNumber(persianNum: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = persianNum;
  persianDigits.forEach((persian, index) => {
    result = result.replace(new RegExp(persian, 'g'), englishDigits[index]);
  });
  
  return result;
}
