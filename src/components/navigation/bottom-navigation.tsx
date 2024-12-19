"use client";

import { NAV_ITEMS } from "@/constants/nav-items";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { KakaoLoginDialog } from "../modal";

interface BottomNavigationProps {
  isLoggedIn: boolean;
}

export default function BottomNavigation({ isLoggedIn }: BottomNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const PROTECTED_ROUTES = ["/write", "/settings"];

  const handleNavigation = (path: string) => {
    if (PROTECTED_ROUTES.includes(path) && !isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    router.push(path);
  };

  return (
    <>
      <nav id="bottom-navigation" className="fixed bottom-0 z-10 flex w-full flex-col items-center justify-center">
        <div className="absolute bottom-0 w-full bg-white rounded-t-2xl shadow p-2 flex items-center justify-around z-50 border-t border-secondary">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center mb-1 cursor-pointer ${
                pathname === item.path
                  ? "text-brand-primary font-bold"
                  : "text-text-secondary/50 hover:text-brand-primary"
              }`}
            >
              {item.icon}
              <span className="text-[11px]">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>

      <KakaoLoginDialog isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
