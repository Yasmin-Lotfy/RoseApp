"use client";

import { useFetch } from "@/hooks/useFetch";
import { Product } from "@/lib/types/category";
import { useRouter, usePathname } from "next/navigation";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import { IoBagHandleOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { useState, MouseEvent, useContext } from "react";
import "@smastrom/react-rating/style.css";
import { useAuthModal } from "@/lib/context/AuthModalContext";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/Redux/cartSlice";
import { AppDispatch, RootState } from "@/lib/Redux/store";
import { toast } from "react-toastify";

export default function HomeProducts() {
  const { data, error, isLoading } = useFetch<Product>("home");
  const router = useRouter(); // Initialize Next.js router
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const t = useTranslations("HomeProducts");
  const { openLogin } = useAuthModal();
  const { data: session } = useSession();
  console.log(session, "session");
  let { cart } = useSelector((state: RootState) => state);
  console.log(cart);

  // Get current locale dynamically from URL or default to "en"
  const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";

  // Add to cart
  const handleAddToCart = async (
    e: MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the parent

    if (!session) {
      router.push(`/${currentLocale}`);
      openLogin();
      return;
    }

    try {
      // Dispatch the addToCart action with the correct payload
      toast.success(t("addedToCart"));
      let res = await dispatch(
        addToCart({
          product: productId,
          quantity: 1,
          token: session?.accessToken,
        })
      );
    } catch (error) {
      toast.error(t("failedToAddToCart"));
      console.error("Failed to add to cart:", error);
    }
  };
  // Add to wishlist
  const handleAddToWishList = (productId: string) => {
    if (!session) {
      router.push(`/${currentLocale}`);
      openLogin();
    } else {
      console.log(`Added product ${productId} to wishlist`);

      // perform add to wish list logic here
    }
  };

  return (
    <>
      <div>
        <h2 className="text-xl sm:text-2xl relative after:absolute after:bg-custom-pink after:h-[2px] after:w-[40px] after:bottom-[-5px]  after:start-0 font-bold text-start text-custom-blue my-6">
          {t("popularItems")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.products &&
            data.products.map((product) => (
              <div
                key={product.id}
                className="relative bg-pink-100 p-6 rounded-lg shadow-md text-center min-h-[250px]"
              >
                {product.quantity ? null : (
                  <span className="absolute z-10 top-3 right-3 bg-[#F05454] text-white text-xs font-medium uppercase px-2 py-1 rounded-full">
                    {t("outOfStock")}
                  </span>
                )}

                <div className="relative">
                  <img
                    src={product.imgCover}
                    alt={product.title}
                    className="w-full h-[180px] object-cover rounded-[20px]"
                  />
                  <div className="absolute flex justify-center items-center bg-[#F82BA9B2] opacity-0 hover:opacity-100 transition duration-1000 top-0 rounded-[20px] right-0 left-0 bottom-0 w-full h-full">
                    <div className="details-btn flex cursor-pointer justify-center items-center w-8 h-8 bg-custom-pink mx-1 rounded-full">
                      <FaRegEye
                        className="text-white w-5 h-5"
                        onClick={() =>
                          router.push(
                            `/${currentLocale}/AllCategories/${product.id}`
                          )
                        }
                      />
                    </div>
                    <div
                      className="wish-btn cursor-pointer flex justify-center items-center w-8 h-8 mx-1 bg-custom-pink rounded-full"
                      onClick={() => handleAddToWishList(product.id)}
                    >
                      <FaRegHeart className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="text-start px-10">
                  <h3 className="mt-4 text-lg font-semibold text-custom-blue">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <Rating
                    value={product.rateAvg}
                    items={5}
                    style={{ maxWidth: 80 }}
                    readOnly
                  />
                  <p className="text-pink-500 font-medium text-md">
                    ${product.price}{" "}
                    <span className="text-md text-gray-400 line-through">
                      ${product.priceAfterDiscount}
                    </span>
                  </p>
                  <button
                    className="absolute bottom-4 right-4 bg-purple-500 text-white p-2 rounded-full shadow-md hover:bg-purple-600 transition"
                    onClick={(e) => handleAddToCart(e, product.id)}
                  >
                    <IoBagHandleOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
