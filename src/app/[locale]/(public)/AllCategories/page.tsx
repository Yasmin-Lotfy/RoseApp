"use client";

import { useFetch } from "@/hooks/useFetch";
import { Category, Product } from "@/lib/types/category";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import { IoBagHandleOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import "@smastrom/react-rating/style.css";
import { LuLoader } from "react-icons/lu";
import PaginationCategories from "../_components/pagination";
import { useState, MouseEvent, useContext } from "react";
import { FaFilter } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/lib/context/AuthModalContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/Redux/store";
import { addToCart } from "@/lib/Redux/cartSlice";
import { toast } from "react-toastify";
// import { CartContext } from "@/lib/context/CartContext";

export default function AllCategories() {
  const { data, error, isLoading } = useFetch<Product>("home");
  const { data: Cat } = useFetch<Category>("categories");
  console.log(data?.products, "data", Cat?.categories, "cat");
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]); // Price range filter
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Track selected category IDs
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]); // Track selected ratings
// let {addToCart} = useContext(CartContext);


  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("AllCategories");
  const { openLogin } = useAuthModal();
    const dispatch = useDispatch<AppDispatch>();
  // Sample data for other filters (you can fetch these dynamically if needed)
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];
  let { cart } = useSelector((state: RootState) => state);
  console.log(cart);
  // Get current locale dynamically from URL or default to "en"

  if (isLoading)
    return (
      <p className="text-custom-pink flex justify-center items-center text-center py-5">
        <LuLoader className="w-8 animate-spin h-8" />
      </p>
    );

  if (error)
    return (
      <p className="text-red-500 text-center">
        {t("error")}: {error.message}
      </p>
    );

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "all") {
      // If "All Categories" is selected, clear all other selections
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId]
      );
    }
  };

  // Handle rating selection
  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  // Handle price range change
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  // Filter products based on selected categories, ratings, and price range
  const filteredProducts = data?.products?.filter((product) => {
    // Category filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    // Rating filter
    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((rating) =>
        product.rateAvg ? Math.floor(product.rateAvg) === rating : false
      );

    // Price range filter
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    // Return true only if the product matches all filters
    return matchesCategory && matchesRating && matchesPrice;
  });

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
  //    to get the max price
  const maxPrice = data?.products
    ? Math.max(...data.products.map((product) => product.price))
    : 1000;


     // Get current locale dynamically from URL or default to "en"
  
  const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";

  // Handle protected routes (require login)

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap py-10">
          {/* Left Sidebar */}
          <div className="w-full md:w-[30%] md:pr-6">
            {/* Mobile Filter Toggle Button */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center bg-custom-pink text-white px-4 py-2 rounded-lg"
              >
                <FaFilter className="mr-2" />
                {t("filters")}
              </button>
            </div>

            {/* Sidebar Content */}
            <div
              className={`${
                isSidebarOpen ? "block" : "hidden"
              } md:block bg-pink-50 p-6 rounded-[20px] shadow-lg`}
            >
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-custom-blue mb-4">
                  {t("categories")}
                </h3>
                <ul className="space-y-2">
                  {/* All Categories Option */}
                  <li>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 accent-pink-500"
                        checked={selectedCategories.length === 0}
                        onChange={() => handleCategoryChange("all")}
                      />
                      <span className="text-gray-700">
                        {t("All Categories")}
                      </span>
                    </label>
                  </li>
                  {/* Dynamically fetched categories */}
                  {Cat?.categories?.map((category) => (
                    <li key={category._id}>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 accent-pink-500"
                          checked={selectedCategories.includes(category._id)}
                          onChange={() => handleCategoryChange(category._id)}
                        />
                        <span className="text-gray-700">
                          {t(category?.name)}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-custom-blue mb-4">
                  {t("brands")}
                </h3>
                <ul className="space-y-2">
                  {brands.map((brand, index) => (
                    <li key={index}>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 accent-pink-500"
                        />
                        <span className="text-gray-700">{t(brand)}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-custom-blue mb-4">
                  {t("priceRange")}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-gray-700">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                  className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              {/* Ratings */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-custom-blue mb-4">
                  {t("ratings")}
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 accent-pink-500"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => handleRatingChange(rating)}
                      />
                      <Rating
                        value={rating}
                        items={5}
                        style={{ maxWidth: 100 }}
                        readOnly
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-custom-blue mb-4">
                  {t("colors")}
                </h3>
                <div className="flex space-x-2">
                  {colors.map((color, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className="hidden"
                        name="color"
                        value={color}
                      />
                      <span
                        className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                        style={{ backgroundColor: color }}
                      ></span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-semibold text-custom-blue mb-4">
                  {t("sizes")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className="hidden"
                        name="size"
                        value={size}
                      />
                      <span className="px-3 py-1 border border-gray-300 rounded-full text-gray-700 cursor-pointer hover:bg-pink-100">
                        {t(size)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side (Product Grid) */}
          <div className="w-full md:w-[70%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="relative bg-pink-100 p-4 rounded-[20px] shadow-lg text-center min-h-[250px]"
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
                        <button className="details-btn flex cursor-pointer justify-center items-center w-8 h-8 bg-custom-pink mx-1 rounded-full">
                          <FaRegEye
                            className="text-white w-5 h-5"
                            onClick={() =>
                              router.push(
                                `/${currentLocale}/AllCategories/${product.id}`
                              )
                            }
                          />
                        </button>
                        <button className="wish-btn cursor-pointer flex justify-center items-center w-8 h-8 mx-1 bg-custom-pink rounded-full">
                          <FaRegHeart
                            className="text-white w-5 h-5"
                            onClick={() => handleAddToWishList(product.id)}
                          />
                        </button>
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
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-3">
                  {t("noProductsFound")}
                </p>
              )}
            </div>
            <PaginationCategories />
          </div>
        </div>
      </div>
    </>
  );
}
