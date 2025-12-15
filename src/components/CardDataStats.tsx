import { LucideIcon } from 'lucide-react';
import { toPersianNumber } from '../utils/numbers';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: React.ReactNode;
}

export function CardDataStats({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}: CardDataStatsProps) {
  return (
    <div className="rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] px-7.5 py-6 shadow-sm dark:shadow-none">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] dark:bg-[#313D4A]">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white mb-2">
            {total}
          </h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp ? 'text-[#10B981]' : levelDown ? 'text-[#F87171]' : ''
          }`}
        >
          {rate}

          {levelUp && (
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 10 11"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill="currentColor"
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 10 11"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill="currentColor"
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
}