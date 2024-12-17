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
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/media";

interface KakaoLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KakaoLoginDialog({ isOpen, onClose }: KakaoLoginDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="z-[999] md:max-w-[375px] md:max-h-[250px] w-full md:rounded-md">
          <DialogHeader>
            <DialogTitle>카카오톡 로그인</DialogTitle>
            <DialogDescription>카카오톡 계정으로 로그인하여 더 많은 기능을 이용해보세요.</DialogDescription>
          </DialogHeader>
          <LoginContent onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="z-[999] h-auto max-h-[fit-content]">
        <DrawerHeader className="text-left">
          <DrawerTitle>카카오톡 로그인</DrawerTitle>
          <DrawerDescription>카카오톡 계정으로 로그인하여 더 많은 기능을 이용해보세요.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <LoginContent onClose={onClose} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function LoginContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Button
        className="relative w-full flex items-center justify-center p-4 border border-transparent text-base font-bold rounded-md text-black bg-[#FEE500] hover:bg-[#FEE500]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEE500]"
        size="lg"
        onClick={() => signIn("kakao")}
      >
        <Image src="/kakao-icon.svg" alt="카카오 로고" className="w-5 h-5 mr-2" width={20} height={20} />
        카카오로 로그인하기
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