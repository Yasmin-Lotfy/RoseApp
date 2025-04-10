// @ts-nocheck
"use client";

import { useParams } from "next/navigation";
import { useState, MouseEvent, useContext } from "react";
import { LuLoader } from "react-icons/lu";
import { useTranslations, useLocale } from "next-intl";
import { useFetchProductDetails } from "@/hooks/useProductDetails";
import { Category, Product, productResponse } from "@/lib/types/category";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import { IoBagHandleOutline } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useFetch } from "@/hooks/useFetch";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import "@smastrom/react-rating/style.css";
import SwiperCore from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/Redux/store";
import { toast } from "react-toastify";
import { addToCart } from "@/lib/Redux/cartSlice";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/lib/context/AuthModalContext";

export default function AllCatDetails() {
  const { id } = useParams();
  console.log(id);
  const { data, error, isLoading } = useFetchProductDetails<Product>(
    `products/${id}`
  );
  console.log(data, "deatils");
  const { data: Cat } = useFetch<Category>("categories");

  console.log(Cat);

  const t = useTranslations(); // Access translations
  const locale = useLocale() || navigator.language || "en";

  let targetCat = Cat?.categories?.filter((cat) => cat._id == data?.category);

  const { data: allProducts } = useFetch<productResponse>("products"); // Fetch all products
  let { cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  let relatedProducts = allProducts?.products?.filter(
    (product) => product.category === data?.product?.category
  );
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
 const { openLogin } = useAuthModal();
  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // Sample colors and sizes (you can fetch these from the API if available)
  const colors = ["#3B82F6", "#10B981", "#FBBF24", "#EF4444", "#A855F7"];
  const sizes = ["Small", "Medium", "Large"];

  // Get current locale dynamically from URL or default to "en"
  const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";

  if (isLoading)
    return (
      <p className="text-custom-pink flex justify-center items-center text-center py-5">
        <LuLoader className="w-8 animate-spin h-8" />
      </p>
    );

  if (error)
    return <p className="text-red-500 text-center">Error: {error.message}</p>;

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

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Swiper Slider */}
          <div className="w-full md:w-1/2">
            <Swiper
              // onSwiper={setSwiperRef}
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="w-full"
            >
              {data?.product?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${data?.product?.title} - ${index + 1}`}
                    className="w-full h-[400px] object-contain rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Thumbnail Images */}
            <div className="flex gap-4 mt-4 justify-center">
              {data?.product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-contain rounded-lg cursor-pointer border border-gray-300 hover:border-pink-500"
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full md:w-1/2">
            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-custom-blue mb-2">
              {locale === "ar" ? data?.product?.title : data?.product?.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-semibold text-pink-500">
                ${data?.product?.price}
              </span>
              {data?.product?.priceAfterDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  ${data?.product?.priceAfterDiscount}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              {locale === "ar"
                ? data?.product?.description
                : data?.product?.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Quantity Selector */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="text-gray-700 font-medium">
                  {t("quantity")}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-pink-200 rounded-full text-gray-700 hover:bg-pink-300 transition"
                  >
                    -
                  </button>
                  <span className="text-gray-700 text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-pink-200 rounded-full text-gray-700 hover:bg-pink-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Size Selector */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="text-gray-700 font-medium">{t("size")}</label>
                <select className="w-full sm:w-auto border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
                  <option value="">{t("chooseSize")}</option>
                  {sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {t(size)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Selector */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="text-gray-700 font-medium">
                  {t("color")}
                </label>
                <div className="flex gap-2 py-5">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-7 h-7 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stock, Category, Brand, Tags */}
            <div className="space-y-2 mb-6">
              <p className="text-gray-700">
                <span className="font-medium">{t("stock")}: </span>
                {data?.product?.quantity ? t("available") : t("outOfStock")} (
                {data?.product?.quantity || 0})
              </p>
              <p className="text-gray-700">
                <span className="font-medium">{t("category")}: </span>
                {locale === "ar" ? data?.product?.slug : data?.product?.slug}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">{t("brand")}: </span>
                {data?.product?.title || "Novak"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">{t("tags")}: </span>
                {data?.product?.title?.split(" ").join(" ") ||
                  "Gifts, Watch, Modern, Shop"}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => handleAddToCart(e, data?.product.id)}
              className="flex items-center gap-2 bg-custom-pink text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
            >
              <span>{t("addToCart")}</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4">
        <h2 className="text-xl sm:text-2xl relative after:absolute after:bg-custom-pink after:h-[2px] after:w-[40px] after:bottom-[-5px]  after:start-0 font-bold text-start text-custom-blue my-6">
          {t("relatedItems")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts &&
            relatedProducts?.map((product) => (
              <div
                key={product.id}
                className="relative bg-pink-100 p-6 rounded-lg shadow-md text-center min-h-[250px]"
              >
                {product?.quantity ? null : (
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
                    <div className="wish-btn cursor-pointer flex justify-center items-center w-8 h-8 mx-1 bg-custom-pink rounded-full">
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
