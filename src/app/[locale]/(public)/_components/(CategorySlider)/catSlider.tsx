"use client"; // Required for Next.js App Router

import { useFetch } from "@/hooks/useFetch";
import { Category } from "@/lib/types/category";
import { useRouter } from "next/navigation";
import { LuLoader } from "react-icons/lu";
import { useTranslations } from "next-intl"; // Import the translations hook

export default function CategoriesList() {
  const { data, error, isLoading } = useFetch<Category>("categories");
  const router = useRouter(); // Initialize Next.js router
  const t = useTranslations(); // Access translations

  if (isLoading)
    return (
      <p className="text-custom-pink flex justify-center items-center text-center py-5">
        <LuLoader className="w-8 animate-spin h-8" />
      </p>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto mt-5 mb-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data?.categories?.slice(0, 5).map((cat) => (
          <div
            key={cat._id}
            onClick={() => router.push(`/categories/${cat._id}`)}
            className="flex py-5 px-4 rounded-[20px] transition-all duration-1000 hover:bg-custom-pink-F6 bg-custom-pink-light items-center cursor-pointer gap-3 text-center sm:text-left w-full"
          >
            <div className="flex items-center justify-center w-16 h-16 transition-all duration-1000 bg-custom-pink hover:bg-custom-pink-100 text-white rounded-full shadow-md">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-8 h-8 grayscale brightness-[400] contrast-[400]"
              />
            </div>
            <div>
              <p className="font-semibold capitalize text-md sm:text-xl text-custom-blue">
                {t(`categories.${cat.slug}`) || cat.name}{" "}
                {/* Use translated category name */}
              </p>
              <p className="text-custom-gray text-sm sm:text-base">
                {cat.productsCount} {t("items")} {/* Translated items count */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
