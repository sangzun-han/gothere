import { GeoPostMarker } from "@/types/coordinate/coordinate";
import { menuHeightAtom } from "@/recoil/layout/atoms";
import { useRecoilValue } from "recoil";

interface MapMarkerClickAreaProps {
  markers: GeoPostMarker[];
  onMarkerClick: (marker: GeoPostMarker) => void;
}
const HIT_AREA_SIZE = 12;

export default function MapMarkerClickArea({ markers, onMarkerClick }: MapMarkerClickAreaProps) {
  const menuHeight = useRecoilValue(menuHeightAtom);

  return (
    <div
      className="absolute w-full left-0 pointer-events-none z-[45]"
      style={{
        height: `calc(100% - ${menuHeight}px)`,
        bottom: `${menuHeight}px`,
      }}
    >
      {markers.map((marker) => (
        <div
          key={marker.post.id}
          className="absolute bg-transparent pointer-events-auto cursor-pointer"
          style={{
            left: marker.x - HIT_AREA_SIZE / 2,
            top: marker.y - HIT_AREA_SIZE / 2,
            width: HIT_AREA_SIZE,
            height: HIT_AREA_SIZE,
          }}
          onClick={() => onMarkerClick(marker)}
        />
      ))}
    </div>
  );
}
