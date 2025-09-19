"use client";

import { CartoonButton } from "@/components/ui/cartoon-button";
import { useRouter } from "next/navigation";

export default function Pools() {
  const router = useRouter();

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Investor Pools
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
          <div className="flex flex-col md:flex-row lg:flex-col backdrop-blur-2xl xl:flex-row rounded-[20px] p-4 sm:p-5 lg:p-6 gap-4 sm:gap-5 lg:gap-6 bg-translucent-dark-12 border-2 border-translucent-light-4 cartoon-boxshadow hover:scale-102 transition-transform duration-300">
            <img
              src="/flip-coin.png"
              className="w-full md:w-[140px] lg:w-full xl:w-[180px] h-40 md:h-[140px] lg:h-48 xl:h-[180px] rounded-2xl border-2 border-translucent-light-4 aspect-square object-cover flex-shrink-0"
              alt="Coin flip"
            />
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 flex-1">
              <div className="flex flex-col gap-2">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px] text-light-primary font-semibold leading-tight">
                  Coin Flip Pool
                </p>
                <p className="font-pally text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed text-translucent-light-64">
                  Heads or Butts, the thrill never
                  <br /> fails, every flip could change your fate.
                </p>
              </div>
              <CartoonButton
                size={"md"}
                variant={"primary"}
                onClick={() => router.push("/pools/flip")}
              >
                <p className="text-dark-primary">Invest now!</p>
              </CartoonButton>
            </div>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-col backdrop-blur-2xl xl:flex-row rounded-[20px] p-4 sm:p-5 lg:p-6 gap-4 sm:gap-5 lg:gap-6 bg-translucent-dark-12 border-2 border-translucent-light-4 cartoon-boxshadow">
            <div className="w-full bg-gradient-to-b bg-translucent-light-12 md:w-[140px] lg:w-full xl:w-[180px] h-40 md:h-[140px] lg:h-48 xl:h-[180px] rounded-2xl relative border-2 border-translucent-light-4 aspect-square flex-shrink-0">
              <img
                src="/mine.svg"
                className="w-full md:w-[140px] lg:w-full xl:w-[180px] h-40 md:h-[140px] lg:h-48 xl:h-[180px] rounded-2xl border-2 border-translucent-light-4 aspect-square object-cover flex-shrink-0"
                alt="Mines game"
              />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 flex-1">
              <div className="flex flex-col gap-2">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px] text-light-primary font-semibold leading-tight">
                  Mines Pool
                </p>
                <p className="font-pally text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed text-translucent-light-64">
                  Step carefully, think wisely,
                  <br /> one wrong move and it&apos;s game over.
                </p>
              </div>
              <button
                disabled
                className="!bg-translucent-light-8 w-fit cartoon-boxshadow disabled:cursor-not-allowed border-translucent-light-4 border-2 rounded-2xl py-2.5 sm:py-3 px-4 sm:px-6 !text-light-primary font-semibold opacity-80 text-sm sm:text-base"
              >
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
