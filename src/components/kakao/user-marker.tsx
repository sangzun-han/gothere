"use client";

import { CustomOverlayMap } from "react-kakao-maps-sdk";
import Image from "next/image";

interface UserMarkerProps {
  lat: number;
  lng: number;
  image: string;
  title: string;
}

export default function UserMarker({ lat, lng, image, title }: UserMarkerProps) {
  return (
    <CustomOverlayMap position={{ lat, lng }}>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-text-primary rounded-lg flex items-center justify-center p-[3px]">
          <div className="w-full h-full rounded-md overflow-hidden">
            <Image
              src={image || "https://via.placeholder.com/42"}
              alt={title}
              className="object-cover w-full h-full"
              width={42}
              height={42}
            />
          </div>
        </div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
      </div>
    </CustomOverlayMap>
  );
}
