import { GeoPost } from "@/types/posts/posts";
import Image from "next/image";
import { CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";

interface PostMarkersProps {
  geoPosts: GeoPost[];
  onPostClick: (index: number) => void;
}

export default function PostMarkers({ geoPosts, onPostClick }: PostMarkersProps) {
  if (!geoPosts || geoPosts.length === 0) return null;

  return (
    <MarkerClusterer averageCenter={true} minLevel={1}>
      {geoPosts.map((geoPost, index) => {
        const { id, title, thumbnail: image, latitude: lat, longitude: lng, thumbnail_blur_image } = geoPost;

        return (
          <CustomOverlayMap key={id} position={{ lat, lng }}>
            <div className="flex flex-col items-center" onClick={() => onPostClick(index)}>
              <div className="w-10 h-10 bg-text-primary rounded-lg flex items-center justify-center p-[3px]">
                <div className="w-full h-full rounded-md overflow-hidden">
                  <Image
                    src={image || "https://via.placeholder.com/42"}
                    alt={title}
                    className="object-cover w-full h-full"
                    width={42}
                    height={42}
                    blurDataURL={thumbnail_blur_image}
                    placeholder="blur"
                  />
                </div>
              </div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
            </div>
          </CustomOverlayMap>
        );
      })}
    </MarkerClusterer>
  );
}
