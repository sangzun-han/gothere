import { menuHeightAtom } from "@/recoil/layout/atoms";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { useRecoilValue } from "recoil";

interface MapCanvasProps {
  children?: React.ReactNode;
  isOverlayOpen: boolean;
}

const MapCavans = forwardRef<HTMLCanvasElement, MapCanvasProps>(({ children, isOverlayOpen }, ref) => {
  const menuHeight = useRecoilValue(menuHeightAtom);

  return (
    <>
      <canvas
        ref={ref}
        className={clsx("absolute w-full pointer-events-none", isOverlayOpen ? "z-40" : "z-[999]")}
        style={{
          height: `calc(100% - ${menuHeight}px)`,
          bottom: `${menuHeight}px`,
        }}
      />
      {children}
    </>
  );
});

MapCavans.displayName = "MapCavans";
export default MapCavans;
