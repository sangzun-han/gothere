"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/media";
import browserClient from "@/utils/supabase/client";

interface KakaoLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KakaoLoginDialog({ isOpen, onClose }: KakaoLoginDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="z-[999] md:max-w-[375px] md:max-h-[280px] w-full md:rounded-md">
          <DialogHeader>
            <DialogTitle>로그인</DialogTitle>
            <DialogDescription>로그인하여 더 많은 기능을 이용해보세요.</DialogDescription>
          </DialogHeader>
          <LoginContent onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="z-[999] h-auto max-h-[fit-content]" tabIndex={-1}>
        <DrawerHeader className="text-left">
          <DrawerTitle>로그인</DrawerTitle>
          <DrawerDescription>로그인하여 더 많은 기능을 이용해보세요.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <LoginContent onClose={onClose} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function LoginContent({ onClose }: { onClose: () => void }) {
  const signInWithSocial = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });
  };

  const signInWithEmail = async () => {
    const { data } = await browserClient.auth.signInWithPassword({
      email: "guest@guest.com",
      password: "guest",
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button
        className="relative w-full flex items-center justify-center p-4 border border-transparent text-base font-bold rounded-md text-black bg-[#FEE500] hover:bg-[#FEE500]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEE500]"
        size="lg"
        onClick={signInWithSocial}
      >
        <Image src="/kakao-icon.svg" alt="카카오 로고" className="w-5 h-5 mr-2" width={20} height={20} />
        카카오로 로그인하기
      </Button>
      <Button
        className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        size="lg"
        onClick={signInWithEmail}
      >
        게스트 계정으로 로그인하기
      </Button>
      <Button
        className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        size="lg"
        onClick={onClose}
      >
        나중에 하기
      </Button>
    </div>
  );
}
