"use client";

import { useTranslations } from "next-intl";
import { useRouter ,usePathname} from "next/navigation";

export default function GiftPictures() {
  const t = useTranslations("gifts");
  const pathname = usePathname();
  const router = useRouter();
// Get current locale dynamically from URL or default to "en"
const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en"
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="relative bg-white h-[250px] shadow-lg rounded-[20px] overflow-hidden">
          <img
            src="/Assets/Gifts/static1.png"
            alt={t("awesomeGifts")}
            className="w-full h-full object-cover hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer"
          />
          <div className="absolute w-[200px]  top-9 end-6 text-end">
            <p className="text-custom-pink py-3 font-inter text-[16px] uppercase font-[400]">
              {t("giftsBox")}
            </p>
            <h3 className="text-custom-blue text-end text-[20px] font-inter font-[600]">
              {t("awesomeGifts")}
            </h3>
            <button
              className="mt-4 px-4 py-3 mb-5 bg-custom-pink text-white font-semibold rounded-[20px] shadow-lg hover:bg-pink-600 transition duration-300"
              onClick={() => router.push(`/${currentLocale}/AllCategories`)}
            >
              {t("shopNow")}
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative bg-white h-[250px] shadow-lg rounded-[20px] overflow-hidden">
          <img
            src="/Assets/Gifts/static2.png"
            alt={t("bestOccasions")}
            className="w-full h-full object-cover hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer"
          />
          <div className="absolute w-[200px] top-9 end-6 text-end">
            <p className="text-custom-pink  py-3 font-inter text-[16px] uppercase font-[400]">
              {t("occasionsGifts")}
            </p>
            <h3 className="text-custom-blue text-end text-[20px] font-inter font-[600]">
              {t("bestOccasions")}
            </h3>
            <button
              className="mt-4 px-4 py-3 mb-5 bg-custom-pink text-white font-semibold rounded-[20px] shadow-lg hover:bg-pink-600 transition duration-300"
              onClick={() => router.push(`/${currentLocale}/AllCategories`)}
            >
              {t("discoverNow")}
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative bg-white h-[250px] shadow-lg rounded-[20px] overflow-hidden">
          <img
            src="/Assets/Gifts/static3.png"
            alt={t("comboSet")}
            className="w-full h-full object-cover hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer"
          />
          <div className="absolute w-[200px] top-9 end-6 text-end">
            <p className="text-white  py-3 font-inter text-[16px] uppercase font-[400]">
              {t("occasionsGifts")}
            </p>
            <h3 className="text-custom-blue text-end text-[20px] font-inter font-[600]">
              {t("comboSet")}
            </h3>
            <button
              className="mt-4 px-4 py-3 mb-5 bg-custom-pink text-white font-semibold rounded-[20px] shadow-lg hover:bg-pink-600 transition duration-300"
              onClick={() => router.push(`/${currentLocale}/AllCategories`)}
            >
              {t("shopNow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
