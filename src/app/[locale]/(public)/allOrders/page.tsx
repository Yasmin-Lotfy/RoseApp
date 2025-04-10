"use client";
import { AppDispatch, RootState } from "@/lib/Redux/store";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LuLoader } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { getCart } from "@/lib/Redux/cartSlice";

export default function AllOrders() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("CheckoutCart");
  const dispatch = useDispatch<AppDispatch>();

  const { cart } = useSelector((state: RootState) => state.cart);
  const { data: session } = useSession();
  const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";

   useEffect(() => {
      if (session?.accessToken) {
        dispatch(getCart({ token: session.accessToken }));
      }
    }, [dispatch, session?.accessToken]);
  return (
    <>
      {cart ? (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col  gap-8">
            <div className="w-full  bg-white p-6 rounded-[20px]  border-4 border-custom-pink shadow">
              <div className="flex justify-center items-center">
                <FaCheck size={20} className="text-green-600 " />
                <p className="px-4"> Your Order Is Confirmed</p>
              </div>
            </div>

            {/* Right Section: Cart Summary */}
            <div className="w-full  bg-custom-pink-light p-6 rounded-lg shadow h-fit">
              <h3 className="text-lg font-semibold mb-4">{t("cartSummary")}</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>{t("subTotal")}:</span>{" "}
                  <span>{cart.totalPrice} EGP</span>
                </li>
                <li className="flex justify-between">
                  <span>{t("discount")}:</span>{" "}
                  <span>{cart.discount / 10}%</span>
                </li>
                <li className="flex justify-between">
                  <span>{t("shipping")}:</span> <span>{t("free")}</span>
                </li>
                <li className="flex justify-between">
                  <span>{t("taxes")}:</span> <span>{t("free")}</span>
                </li>
                <li className="flex justify-between font-bold text-pink-600 mt-2">
                  <span>{t("total")}:</span>{" "}
                  <span>{cart.totalPriceAfterDiscount} EGP</span>
                </li>
              </ul>
              <div className="text-end">
                <button
                  className="btn-primary mt-6"
                  onClick={() => router.push(`/${currentLocale}/AllCategories`)}
                >
                  {t("allCategory")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-custom-pink flex justify-center items-center text-center py-5">
          <LuLoader className="w-8 animate-spin h-8" />
          <span className="ml-2">{t("loading")}</span>
        </p>
      )}
    </>
  );
}
