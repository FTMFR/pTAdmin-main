// Dashboard Page Component

import { CardDataStats } from "./CardDataStats";
import { Eye, ShoppingCart, ShoppingBag, Users } from "lucide-react";
import { toPersianNumber } from "../utils/numbers";

export function Dashboard() {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="کل بازدید"
          total={`$${toPersianNumber("3.456")}`}
          rate={`${toPersianNumber("0.43")}%`}
          levelUp
        >
          <Eye className="fill-[#3C50E0] text-[#3C50E0]" />
        </CardDataStats>
        <CardDataStats
          title="کل سود"
          total={`$${toPersianNumber("45.2")}`}
          rate={`${toPersianNumber("4.35")}%`}
          levelUp
        >
          <ShoppingCart className="fill-[#3C50E0] text-[#3C50E0]" />
        </CardDataStats>
        <CardDataStats
          title="کل محصول"
          total={`${toPersianNumber("2.450")}`}
          rate={`${toPersianNumber("2.59")}%`}
          levelUp
        >
          <ShoppingBag className="fill-[#3C50E0] text-[#3C50E0]" />
        </CardDataStats>
        <CardDataStats
          title="کل کاربران"
          total={`${toPersianNumber("3.456")}`}
          rate={`${toPersianNumber("0.95")}%`}
          levelDown
        >
          <Users className="fill-[#3C50E0] text-[#3C50E0]" />
        </CardDataStats>
      </div>

      {/* Charts Section */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] py-6 px-7.5 shadow-sm dark:shadow-none xl:col-span-4">
          <h4 className="mb-2 text-xl font-semibold text-[#1C2434] dark:text-white">
            منطقه بازدیدکنندگان
          </h4>
          <div className="h-90 bg-[#F1F5F9] dark:bg-[#313D4A] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-20 h-20 mx-auto mb-4 text-[#3C50E0]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-[#64748B] dark:text-[#8A99AF]">
                نقشه جغرافیایی
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
