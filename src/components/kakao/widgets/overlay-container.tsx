"use client";

import { menuHeightAtom } from "@/recoil/layout/atoms";
import { useRecoilValue } from "recoil";

interface OverlayContainerProps {
  children: React.ReactNode;
}

export default function OverlayContainer({ children }: OverlayContainerProps) {
  const menuHeight = useRecoilValue(menuHeightAtom);

  return (
    <div
      className="absolute w-full left-0 pointer-events-none z-45"
      style={{
        height: `calc(100% - ${menuHeight}px)`,
        bottom: `${menuHeight}px`,
      }}
    >
      {children}
    </div>
  );
}
