"use client";

import { useEffect, useState } from "react";

export default function HydrationSafeComponent({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // لا تعرض أي شيء حتى يتم التحميل بالكامل

  return <>{children}</>;
}
