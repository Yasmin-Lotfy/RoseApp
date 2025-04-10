"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import bgImg from "@/../public/Assets/logo2.png";

export default function Footer() {
  const router = useRouter();
  const pathName = usePathname();
  const locale = useLocale();
  const t = useTranslations("Footer"); // Get translations

  const handleNavigation = (path: string): void => {
    router.push(`/${locale}/${path}`);
  };

  return (
    <footer
      className="bg-footer bg-cover bg-center bg-no-repeat font-bold text-custom-blue py-16"
      style={{ backgroundImage: `url(${bgImg.src})` }}
    >
      {/* Navigation Links */}
      <div className="container mx-auto flex flex-wrap justify-center gap-6 text-md">
        {["about-us", "store-location", "contact", "delivery", "policy", "faqs"].map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item)}
            className={`hover:text-custom-pink transition duration-300 ${
              pathName === `/${locale}/${item}` ? "text-custom-pink" : "text-custom-blue"
            } `}
          >
            {t(item)}
          </button>
        ))}
      </div>

      {/* Subscription Section */}
      <div className="text-center py-5 text-custom-blue">
        <p className="text-[30px] font-bold">
          {t("discountText")} <span className="text-custom-pink">20%</span> {t("discountCoupon")}
        </p>
        <p className="text-custom-gray text-[20px] font-medium py-3">{t("subscribeText")}</p>
      </div>

      {/* Email Subscription Input */}
      <div className="flex items-center justify-center">
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden w-[350px]">
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            className="w-full font-normal px-4 py-2 text-gray-600 focus:outline-none"
          />
          <button className="bg-custom-pink text-white font-semibold px-6 py-2 rounded-full hover:bg-custom-pink-100 flex items-center gap-2 transition">
            {t("subscribeButton")} <span className="text-xl">➜</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
