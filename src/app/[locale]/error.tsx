"use client";

import ErrorComponent from "@/components/common/error-component";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <ErrorComponent>{error.message}</ErrorComponent>

      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
