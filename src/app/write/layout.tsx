"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostAddLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <header className="w-full flex items-center px-2 border-b border-gray-300 h-[52px] max-h-[52px]">
        <Button className="text-text-primary" type="button" size="icon" variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </header>
      {children}
    </div>
  );
}
