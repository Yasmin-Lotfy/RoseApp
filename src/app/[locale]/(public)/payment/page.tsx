"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/Redux/store";
import { useSession } from "next-auth/react";
import { LuLoader } from "react-icons/lu";
import { FaCcVisa } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { cashCheckout, visaCheckout } from "@/lib/Redux/paymentSlice";
import { toast } from "react-toastify";

export default function CheckoutPayment() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [shippingData, setShippingData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("CheckoutCart");
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { data: session } = useSession();
  const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";

  useEffect(() => {
    const savedData = localStorage.getItem("shippingData");
    if (savedData) {
      setShippingData(JSON.parse(savedData));
    }
  }, []);

  const handlePayment = async () => {
    if (!shippingData) return alert("Shipping data missing");
    const token = session?.accessToken;

    if (!token) return alert("No token found");

    if (paymentMethod === "card") {
      const res = await dispatch(
        visaCheckout({ shippingAddress: shippingData, token }) as any
      );

      const payload = res.payload;
      if (res.meta.requestStatus === "fulfilled" && payload?.session?.url) {
        window.location.href = payload.session.url;
      } else {
        alert("Failed to create visa checkout session.");
      }
    } else {
      const res = await dispatch(
        cashCheckout({ shippingAddress: shippingData, token }) as any
      );

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Order placed successfully (Cash)")
        router.push(`/${currentLocale}/allOrders`);
      } else {
        toast.error("Cash order failed")

      }
    }
  };

  return (
    <>
      {cart ? (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section */}
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow">
              <div className="pb-4">
                <h2 className="text-lg font-semibold mb-2 text-custom-pink">
                  Your Payment Info
                </h2>
                <div className="flex items-center gap-4 flex-wrap">
                  <div
                    className={`text-center cursor-pointer border rounded-[20px] px-3 py-5 ${
                      paymentMethod === "cash"
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("cash")}
                  >
                    <SiCashapp className="text-center m-auto" size={40} />
                    <p className="text-sm font-medium">Cash On Delivery</p>
                  </div>
                  <div
                    className={`text-center cursor-pointer border rounded-[20px] px-3 py-5 ${
                      paymentMethod === "card"
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <FaCcVisa className="text-center m-auto" size={50} />
                    <p className="text-sm font-medium text-pink-600">
                      Pay With Credit Card
                    </p>
                  </div>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardName">Card Holder Name</label>
                    <Input
                      id="cardName"
                      className="input-style mt-2"
                      placeholder="Name on Card"
                    />
                  </div>
                  <div>
                    <label htmlFor="CardNumber">Card Number</label>
                    <Input
                      id="CardNumber"
                      className="input-style mt-2"
                      placeholder="Your Card Number"
                    />
                  </div>
                  <div>
                    <label htmlFor="Expire">Expire Date</label>
                    <Input
                      id="Expire"
                      className="input-style mt-2"
                      placeholder="Expire"
                    />
                  </div>
                  <div>
                    <label htmlFor="CCV">CCV</label>
                    <Input
                      id="CCV"
                      className="input-style mt-2"
                      placeholder="CCV"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6 flex-wrap gap-4">
                <Button
                  className="btn-primary hover:bg-custom-pink mt-6"
                  onClick={() => router.push(`/${currentLocale}/checkout`)}
                >
                  Previous
                </Button>
                <Button
                  className="btn-primary hover:bg-custom-pink mt-6"
                  onClick={handlePayment}
                >
                  Pay Now
                </Button>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/3 bg-custom-pink-light p-6 rounded-lg shadow h-fit">
              <h3 className="text-lg font-semibold mb-4">
                {t("cartSummary")}
              </h3>
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
                  onClick={handlePayment}
                >
                  {t("checkoutNow")}
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
