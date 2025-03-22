"use client";

import { useLayoutEffect, useRef } from "react";
import { NAV_ITEMS } from "@/constants/nav-items";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { menuHeightAtom } from "@/recoil/layout/atoms";
import Link from "next/link";

export default function BottomNavigation() {
  const pathname = usePathname();
  const setMenuHeight = useSetRecoilState(menuHeightAtom);
  const navRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (navRef.current) {
      const height = navRef.current.offsetHeight;
      setMenuHeight(height);
    }
  }, [setMenuHeight]);

  return (
    <>
      <nav id="bottom-navigation" className="fixed bottom-0 z-10 flex w-full flex-col items-center justify-center">
        <div
          ref={navRef}
          className="absolute bottom-0 w-full bg-app-background rounded-t-2xl shadow p-2 flex items-center justify-around z-50 border-t border-secondary"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              href={item.path}
              key={item.label}
              className={`flex flex-col items-center mb-1 ${
                pathname === item.path ? "text-blue-500 font-bold" : "text-gray-900"
              }`}
            >
              {item.icon}
              <span className="text-[11px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
