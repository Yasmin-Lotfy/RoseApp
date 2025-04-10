"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuLoader } from "react-icons/lu";
import { useRouter ,usePathname} from "next/navigation";
import { useBestSeller } from "@/hooks/use-best-seller";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useTranslations } from "next-intl";
import { useAuthModal } from "@/lib/context/AuthModalContext";
import { useSession } from "next-auth/react";
import { useState, MouseEvent } from "react";
import { addToCart } from "@/lib/Redux/cartSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/Redux/store";
export default function BestSeller() {
  const { data, error, isLoading } = useBestSeller();
  const router = useRouter();
   const pathname = usePathname();
     const dispatch = useDispatch<AppDispatch>();
   
    const { openLogin } = useAuthModal();
         const { data: session } = useSession();
  const t = useTranslations("bestSeller");
// Get current locale dynamically from URL or default to "en"
const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";
let { cart } = useSelector((state: RootState) => state
);
  // console.log(cart);
  if (isLoading)
    return (
      <p className="text-custom-pink flex justify-center items-center text-center py-5">
        <LuLoader className="w-8 animate-spin h-8" />
      </p>
    );

  if (error)
    return <p className="text-red-500 text-center">{t("error")}: {error.message}</p>;

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
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 text-center md:text-left">
          <p className="text-pink-500 uppercase font-bold my-5 text-lg tracking-wide">
            {t("premiumGifts")}
          </p>
          <h2 className="text-3xl font-bold text-gray-800">
            {t("title")}
          </h2>
          <p className="text-gray-600 mt-4">{t("description")}</p>
          <button className="mt-4 px-4 py-3 mb-5 bg-custom-pink text-white font-semibold rounded-xl shadow-lg hover:bg-pink-600 transition duration-300"
          onClick={() => router.push(`/${currentLocale}/AllCategories`)}>
            {t("exploreMore")} →
          </button>
        </div>

        {/* Swiper Slider */}
        <div className="md:w-2/3 relative overflow-hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            className="overflow-hidden w-[300px] sm:w-[400px] md:w-full"
          >
            {data?.bestSeller &&
              data.bestSeller.map((best) => (
                <SwiperSlide key={best.id} className="w-full max-w-xs mx-auto">
                  <div className="relative bg-pink-100 p-6 rounded-lg shadow-md text-center min-h-[250px]">
                    {best.quantity ? null : (
                      <span className="absolute z-10 top-3 right-3 bg-[#F05454] text-white text-xs font-medium uppercase px-2 py-1 rounded-full">
                        {t("outOfStock")}
                      </span>
                    )}

                    <div className="relative ">
                      <img
                        src={best.imgCover}
                        alt="Gift Box"
                        className="w-full h-[180px] object-cover rounded-[20px]"
                      />
                      <div className="absolute flex justify-center items-center bg-[#F82BA9B2] opacity-0 hover:opacity-100 transition duration-1000 top-0 rounded-[20px] right-0 left-0 bottom-0 w-full h-full">
                        <div className="details-btn flex cursor-pointer justify-center items-center w-8 h-8 bg-custom-pink mx-1 rounded-full">
                          <FaRegEye className="text-white w-5 h-5"
                          onClick={() => router.push(`/${currentLocale}/AllCategories/${best.id}`)}/>
                    
                        </div>
                        <div className="wish-btn cursor-pointer flex justify-center items-center w-8 h-8 mx-1 bg-custom-pink rounded-full"
                          onClick={() => handleAddToWishList(best.id)}
                        >
                          <FaRegHeart className="text-white w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="text-start px-10">
                      <h3 className="mt-4 text-lg font-semibold text-custom-blue">
                        {best.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <Rating
                        value={best.rateAvg}
                        items={5}
                        style={{ maxWidth: 80 }}
                        readOnly
                      />
                      <p className="text-pink-500 font-medium text-md">
                        ${best.price}{" "}
                        <span className="text-md text-gray-400 line-through">
                          ${best.priceAfterDiscount}
                        </span>
                      </p>
                      <button className="absolute bottom-4 right-4 bg-purple-500 text-white p-2 rounded-full shadow-md hover:bg-purple-600 transition"
                       onClick={(e) => handleAddToCart(e, best.id)}
                      >
                        <IoBagHandleOutline />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="custom-prev swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-custom-pink p-3 rounded-full shadow-md hover:bg-custom-pink-100 transition">
            <RiArrowLeftSLine className="text-white" />
          </button>
          <button className="custom-next swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-custom-pink p-3 rounded-full shadow-md hover:bg-custom-pink-100 transition">
            <RiArrowRightSLine className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
