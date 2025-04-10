"use client";

import { RootState } from "@/lib/Redux/store";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { LuLoader } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
//  just to get the object for 
// checkout details waiting the other componenet to see if visa or cash


const shippingSchema = z.object({
  street: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  lat: z.string().min(1, "Required"),
  long: z.string().min(1, "Required"),
});

type ShippingForm = z.infer<typeof shippingSchema>;

export default function CheckoutCart() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("CheckoutCart");

  const { cart } = useSelector((state: RootState) => state.cart);
  const { data: session } = useSession();
  const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
  });

  const onSubmit = (data: ShippingForm) => {
    const payload = {
      street: data.street,
      phone: data.phone,
      city: data.city,
      lat: data.lat,
      long: data.long,
    };

    console.log("Submitting to API:", payload);
    // i will save the shiping details to local storage 
    localStorage.setItem("shippingData", JSON.stringify(payload));
  router.push(`/${currentLocale}/payment`);
  };

  return (
    <>
      {cart ? (
        <div className="container mx-auto px-4 py-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Left Section */}
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow">
              <h2 className="text-pink-600 font-semibold text-lg mb-4">
                {t("billingTitle")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("street")}
                  placeholder={t("address1")}
                  className="input-style"
                />
                <input
                  {...register("phone")}
                  placeholder={t("phone")}
                  className="input-style"
                />
                <input
                  {...register("city")}
                  placeholder={t("city")}
                  className="input-style"
                />
                <input
                  {...register("lat")}
                  placeholder="Latitude"
                  className="input-style"
                />
                <input
                  {...register("long")}
                  placeholder="Longitude"
                  className="input-style"
                />
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="text-red-500 mt-2">
                  {Object.entries(errors).map(([key, err]) => (
                    <p key={key}>{err?.message}</p>
                  ))}
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button type="button" className="btn-primary">
                  {t("backToCart")}
                </button>
                <button type="submit" className="btn-primary">
                  {t("nextStep")}
                </button>
              </div>
            </div>

            {/* Right Section: Summary */}
            <div className="w-full lg:w-1/3 bg-custom-pink-light p-6 rounded-lg shadow h-fit">
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
                <button type="submit" className="btn-primary mt-6">{t("checkoutNow")}</button>
              </div>
            </div>
          </form>
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
