"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import KakaoLoginDialog from "@/components/modal/kakao-login-dialog";

export default function LoginModal() {
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
