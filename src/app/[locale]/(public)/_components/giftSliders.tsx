"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { useTranslations } from "next-intl";
import { useRouter ,usePathname} from "next/navigation";

export default function GiftSliders() {
  const t = useTranslations("GiftSliders");
  const router = useRouter();
  const pathname = usePathname();
  // Get current locale dynamically from URL or default to "en"
const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";

  return (
    <>
      <div className="container mx-auto mb-8">
        <div className="flex flex-col md:flex-row w-full mt-6 gap-4">
          {/* Left Static Image (30%) */}
          <div className="w-full relative md:w-1/3 flex items-start justify-center bg-gray-100 rounded-[14px] shadow-lg">
            <img
              src="/Assets/Gifts/gift1.png"
              alt={t("specialGiftBoxAlt")}
              className="w-full h-full object-cover rounded-[14px] "
            />
            <div className="absolute bottom-0 left-4">
              <p className="text-custom-pink my-4 font-bold text-[16.77px] leading-[30.2px] tracking-[4.66px] align-middle uppercase">
                {t("priceStart")}
              </p>
              <h3 className="w-[230px] font-inter mb-4 text-custom-blue font-semibold text-[26.09px] leading-[31.31px] tracking-[0] align-middle">
                {t("specialGiftBoxTitle")}
              </h3>
              <button className="mt-4 px-4 py-3 mb-5 bg-pink-500 text-white font-semibold rounded-[20px] shadow-lg hover:bg-pink-600 transition duration-300"
              onClick={() => router.push(`/${currentLocale}/AllCategories`)}>
                {t("shopNow")} →
              </button>
            </div>
          </div>

          {/* Right Swiper Slider (70%) */}
          <div className="w-full md:w-[70%] relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              pagination={{ clickable: true, el: ".custom-pagination" }}
              autoplay={{ delay: 3000 }}
              className="rounded-[14px] shadow-lg"
            >
              {[2, 4, 5].map((num) => (
                <SwiperSlide key={num}>
                  <div className="w-full relative h-64 md:h-96 flex flex-col items-center justify-center text-center bg-pink-200 rounded-lg">
                    <img
                      src={`/Assets/Gifts/gift${num}.jpg`}
                      alt={t("giftCollectionAlt")}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 text-start left-4 z-10">
                      <p className="text-custom-pink my-4 font-bold text-[20px] leading-[24.6px] tracking-[3.73px] uppercase">
                        {t("bestGiftShop")}
                      </p>
                      <h2 className="md:text-4xl font-inter w-[450px] font-bold my-6 text-custom-blue text-[45px] leading-[50px] tracking-[3.73px] uppercase">
                        {t("choosePerfectGifts")}
                      </h2>

                      <button className="mt-4 px-4 py-3 mb-5 bg-pink-500 text-white font-semibold rounded-[20px] shadow-lg hover:bg-pink-600 transition duration-300"
                      onClick={() => router.push(`/${currentLocale}/AllCategories`)}
                      >
                        {t("shopNow")} →
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="absolute custom-pagination .swiper-static bottom-6 right-28 flex flex-row-reverse items-center justify-center bg-white rounded-full shadow-lg p-2">
              <button className="custom-prev bg-white swiper-button-prev">
                <RiArrowLeftSLine className="text-black" />
              </button>
            </div>
            <div className="absolute bottom-6 right-2 flex custom-pagination flex-row-reverse items-center justify-center bg-white rounded-full shadow-lg p-2">
              <button className="custom-next bg-white swiper-button-next mx">
                <RiArrowRightSLine className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
