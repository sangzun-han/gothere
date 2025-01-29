import { menuHeightAtom } from "@/recoil/layout/atoms";
import React, { forwardRef } from "react";
import { useRecoilValue } from "recoil";

interface MapCanvasProps {
  children?: React.ReactNode;
}

const MapCavans = forwardRef<HTMLCanvasElement, MapCanvasProps>(({ children }, ref) => {
  const menuHeight = useRecoilValue(menuHeightAtom);

  return (
    <>
      <canvas
        ref={ref}
        className="absolute w-full pointer-events-none z-40"
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
