"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createPortal } from "react-dom";
import { useSearchModal } from "@/lib/context/SearchModalContext";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

// Validation schema for search input
const searchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
});


type SearchFields = z.infer<typeof searchSchema>;

export default function SearchModal() {
    const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";
  const { isSearchOpen, closeSearch } = useSearchModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFields>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async (values: SearchFields) => {
    setLoading(true);
    try {
    //   console.log("🔹 Searching for:", values.query);
      router.push(`/${currentLocale}/AllCategories`)
      closeSearch();
    } catch (error) {
      console.error("Search Error:", error);
    }
    setLoading(false);
  };

  // Fix Hydration Issue: Only use `createPortal` in the browser
  if (typeof window !== "undefined") {
    return createPortal(
      <Dialog open={isSearchOpen} onOpenChange={closeSearch}>
        {/* Semi-Transparent Overlay */}
        {isSearchOpen && <div className="fixed inset-0 bg-transparent z-[999]" />}

        {/* Modal Content with Transparent Background */}
        <DialogContent className="fixed z-[1000] w-full max-w-md bg-transparent sm:rounded-[20px] rounded-[20px] p-6 shadow-lg border border-black/10">
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative bg-transparent  flex-1">
              <Input
                type="text"
                placeholder={t("searchHere") || "Search Here..."}
                {...register("query")}
                className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg pr-10 bg-white"
              />
              {/* Magnifying Glass Icon */}
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
              
              </button>
            </div>
          </form>
          {/* <p className="text-red-500 text-sm mt-2 bg-white/80 rounded px-2 py-1">{errors.query?.message}</p> */}
        </DialogContent>
      </Dialog>,
      document.body
    );
  }

  return null; // Prevents hydration error
}