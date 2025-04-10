"use client";

import { useFetch } from "@/hooks/useFetch";
import { getCart, removeCart, updateCart } from "@/lib/Redux/cartSlice";
import { AppDispatch, RootState } from "@/lib/Redux/store";
import { Category } from "@/lib/types/category";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { LuLoader } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Cart() {
  const t = useTranslations("Cart");
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const pathname = usePathname();
  const { data: session } = useSession();

  const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";
  const { data } = useFetch<Category>("categories");
  const router = useRouter();

  function getSpeceficCat(detailsId: string) {
    let targetCat = data?.categories?.filter((cat) => cat._id === detailsId);
    return targetCat;
  }
  //  function to remove product from cart
  function removeItem(productId: string | undefined) {
    if (!productId || !session?.accessToken) return;

    dispatch(removeCart({ productId: productId, token: session.accessToken }));
  }
  //  function to update product from cart
  function updateproductsItems(
    productId: string | undefined,
    quantity: number
  ) {
    if (!productId || !session?.accessToken) return;

    dispatch(
      updateCart({
        productId: productId,
        quantity: quantity,
        token: session.accessToken,
      })
    );
  }

  useEffect(() => {
    if (session?.accessToken) {
      dispatch(getCart({ token: session.accessToken }));
    }
  }, [dispatch, session?.accessToken]);
  function handleDecrease(itemId: string | undefined, quantity: number) {
    if (!itemId) return;

    if (quantity - 1 === 0) {
      removeItem(itemId);
    } else {
      updateproductsItems(itemId, quantity - 1);
    }
  }
  return (
    <>
      {cart ? (
        <div className="container mx-auto px-4 py-8">
          {cart.cartItems.length <= 0 ? (
            <p className="text-custom-pink  flex justify-center items-center text-center py-5">
              Your Cart is Empty
            </p>
          ) : (
            <>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-pink-50 text-sm text-left">
                      <tr>
                        <th className="p-4">{t("image")}</th>
                        <th className="p-4">{t("productName")}</th>
                        <th className="p-4">{t("price")}</th>
                        <th className="p-4">{t("quantity")}</th>
                        <th className="p-4">{t("subtotal")}</th>
                        <th className="p-4">{t("removeProduct")}</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {cart.cartItems.map((item, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="p-4">
                            <img
                              src={item?.product?.imgCover}
                              alt="Product"
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="p-4">
                            <div className="font-semibold">
                              {item?.product.title}
                            </div>
                            <div className="text-xs text-gray-500 text-capitalize">
                              {t("type")}:{" "}
                              {getSpeceficCat(item?.product?.category)?.[0]
                                ?.name ?? "N/A"}
                            </div>
                          </td>
                          <td className="p-4">
                            {item?.product.priceAfterDiscount} EGP
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                className="qty-btn bg-custom-pink-light text-black w-5 h-5 rounded-full"
                                onClick={() =>
                                  handleDecrease(
                                    item?.product._id,
                                    item?.quantity
                                  )
                                }
                              >
                                −
                              </button>
                              <span className="px-2 ">{item.quantity}</span>
                              <button
                                className="qty-btn bg-custom-pink-light text-black w-5 h-5 rounded-full"
                                onClick={() =>
                                  updateproductsItems(
                                    item?.product._id,
                                    item?.quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="p-4 ">
                            {item?.product.priceAfterDiscount * item.quantity}{" "}
                            EGP
                          </td>
                          <td className="p-4">
                            <button
                              className="text-gray-400 hover:text-red-500 text-lg cursor-pointer"
                              onClick={() => removeItem(item?.product._id)}
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Coupon & Buttons */}

                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <div className="flex w-full sm:w-auto gap-2">
                      <input
                        type="text"
                        placeholder={t("couponPlaceholder")}
                        className="input-style placeholder:text-gray-600 w-full sm:w-64 border-1 border-gray-800 rounded-[40px]"
                      />
                      <button className="rounded-[10px] bg-custom-pink px-3 py-2 text-white">
                        {t("applyCoupon")}
                      </button>
                    </div>
                    <button
                      className="rounded-[10px] bg-custom-pink px-3 py-2 text-white"
                      onClick={() =>
                        router.push(`/${currentLocale}/AllCategories`)
                      }
                    >
                      {t("continueShopping")}
                    </button>
                  </div>
                </div>

                {/* Right Section: Summary */}
                <div className="w-full lg:w-1/3 bg-custom-pink-light p-6 rounded-lg shadow h-fit">
                  <h3 className="text-lg font-semibold mb-4">
                    {t("cartSummary")}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>{t("subtotalLabel")}</span>{" "}
                      <span>{cart.totalPrice} EGP</span>
                    </li>

                    <li className="flex justify-between">
                      <span>{t("discountLabel")}</span>{" "}
                      <span>{cart.discount / 10}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("shipping")}</span> <span>{t("free")}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("taxes")}</span> <span>{t("free")}</span>
                    </li>
                    <li className="flex justify-between font-bold text-pink-600 mt-2">
                      <span>{t("total")}</span>{" "}
                      <span>{cart.totalPriceAfterDiscount} EGP</span>
                    </li>
                  </ul>
                  <div className="text-end">
                    <button
                      className="rounded-[20px] bg-custom-pink px-3 py-2 text-white mt-6"
                      onClick={() => router.push(`/${currentLocale}/checkout`)}
                    >
                      {t("checkout")}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
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
