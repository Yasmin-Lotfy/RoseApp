import { FaCarSide } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import { FaRegSquare } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function StaticBar() {
  const t = useTranslations("StaticBar");

  return (
    <div className="bg-custom-pink-light px-5 py-5 rounded-xl">
      <div className="container mx-auto flex flex-wrap gap-6 justify-center md:justify-between items-center">
        {/* Free Delivery */}
        <div className="flex flex-col sm:flex-row items-center cursor-pointer gap-3 text-center sm:text-left w-full sm:w-auto">
          <div className="flex items-center justify-center w-14 h-14 bg-custom-pink text-white rounded-full shadow-md">
            <FaCarSide className="w-7 h-7" />
          </div>
          <div>
            <p className="font-semibold text-lg sm:text-xl text-custom-blue">{t("freeDelivery")}</p>
            <p className="text-custom-gray text-sm sm:text-base">{t("deliveryOver")}</p>
          </div>
        </div>

        {/* Get Refund */}
        <div className="flex flex-col sm:flex-row items-center cursor-pointer gap-3 text-center sm:text-left w-full sm:w-auto">
          <div className="flex items-center justify-center w-14 h-14 bg-custom-pink text-white rounded-full shadow-md">
            <VscDebugRestart className="w-7 h-7" />
          </div>
          <div>
            <p className="font-semibold text-lg sm:text-xl text-custom-blue">{t("getRefund")}</p>
            <p className="text-custom-gray text-sm sm:text-base">{t("refundWithin")}</p>
          </div>
        </div>

        {/* Safe Payment */}
        <div className="flex flex-col sm:flex-row items-center cursor-pointer gap-3 text-center sm:text-left w-full sm:w-auto">
          <div className="flex items-center justify-center w-14 h-14 bg-custom-pink text-white rounded-full shadow-md">
            <FaRegSquare className="w-7 h-7" />
          </div>
          <div>
            <p className="font-semibold text-lg sm:text-xl text-custom-blue">{t("safePayment")}</p>
            <p className="text-custom-gray text-sm sm:text-base">{t("securePayment")}</p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="flex flex-col sm:flex-row items-center cursor-pointer gap-3 text-center sm:text-left w-full sm:w-auto">
          <div className="flex items-center justify-center w-14 h-14 bg-custom-pink text-white rounded-full shadow-md">
            <FaHeadphonesAlt className="w-7 h-7" />
          </div>
          <div>
            <p className="font-semibold text-lg sm:text-xl text-custom-blue">{t("support")}</p>
            <p className="text-custom-gray text-sm sm:text-base">{t("callUs")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
