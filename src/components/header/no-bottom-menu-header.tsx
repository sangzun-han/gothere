"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function NoBottomMenuHeader() {
  const router = useRouter();

  return (
    <header className="w-full flex items-center px-2 border-b border-gray-300 h-[52px] max-h-[52px] justify-between">
      <Button className="text-text-primary" type="button" size="icon" variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="w-6 h-6" />
      </Button>
    </header>
  );
}
