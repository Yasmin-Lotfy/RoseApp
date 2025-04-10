"use client";

import { useParams } from "next/navigation";
import { CategoryDetailsResponse } from "@/lib/types/category";
import { useFetchDetails } from "@/hooks/useFetchDetails";
import { LuLoader } from "react-icons/lu";
import { useTranslations , useLocale } from "next-intl";

export default function CategoryDetailsPage() {
  const { id } = useParams();

  const { data, error, isLoading } = useFetchDetails<CategoryDetailsResponse>(`categories/${id}`);
  
  const t = useTranslations(); // Access translations
  const locale = useLocale() || navigator.language || "en"; // Fallback to browser language

  if (isLoading) return <p className="text-custom-pink flex justify-center items-center text-center py-5">
    <LuLoader className="w-8 animate-spin h-8"/>
  </p>;

  if (error) return <p>Error: {error.message}</p>;

  const categorySlug = data?.category.slug; // Get category slug from API
  const translatedCategoryName = categorySlug ? t(`categories.${categorySlug}`) : data?.category.name;

  return (
    <div className="container flex flex-col items-center justify-center mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-custom-blue capitalize">
        {translatedCategoryName}
      </h1>
      <img
        src={data?.category.image}
        alt={translatedCategoryName}
        className="w-48 h-48 mt-4 rounded-lg shadow-lg"
      />

<p className="mt-4 text-lg text-custom-gray">
      {t("category.createdAt")}:{" "}
      {data?.category?.createdAt
        ? new Date(data.category.createdAt).toLocaleString(locale, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : t("category.notAvailable")}
    </p>
    </div>
  );
}
