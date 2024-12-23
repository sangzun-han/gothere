"use client";

import { useState } from "react";
import { KakaoLoginDialog } from "@/components/modal";
import { useRouter } from "next/navigation";

export default function Default() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <KakaoLoginDialog
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
    />
  );
}
