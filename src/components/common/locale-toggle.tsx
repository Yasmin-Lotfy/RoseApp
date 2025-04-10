"use client";

import { Globe } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export default function LocaleToggle() {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Functions
  const switchLocale = (locale: "en" | "ar") => {
    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <Globe size={20} />
        </Button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent>
        {/* English */}
        <DropdownMenuItem asChild>
          <Button variant="ghost" className="w-full justify-start" onClick={() => switchLocale("en")}>
            English
          </Button>
        </DropdownMenuItem>

        {/* Arabic */}
        <DropdownMenuItem asChild>
          <Button variant="ghost" className="w-full justify-start" onClick={() => switchLocale("ar")}>
            العربية
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
