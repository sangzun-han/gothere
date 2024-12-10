import { sampleData } from "@/constants/data";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import Image from "next/image";

export default function UserMarker() {
  return (
    <>
      {sampleData.map((item) => (
        <CustomOverlayMap key={item.id} position={{ lat: item.lat, lng: item.lng }}>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-text-primary rounded-lg flex items-center justify-center p-[3px]">
              <div className="w-full h-full rounded-md overflow-hidden">
                <Image
                  src={item.image || "https://via.placeholder.com/44"}
                  alt={item.title}
                  className="object-cover w-full h-full"
                  width={44}
                  height={44}
                />
              </div>
            </div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
          </div>
        </CustomOverlayMap>
      ))}
    </>
  );
}
