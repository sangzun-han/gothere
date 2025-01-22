import { useEffect } from "react";

interface UseMapEventHandlersProps {
  map: kakao.maps.Map;
  onCenterChanged?: () => void;
  onZoomStart?: () => void;
  onZoomEnd?: () => void;
}

export default function useMapEventHandler({ map, onCenterChanged, onZoomStart, onZoomEnd }: UseMapEventHandlersProps) {
  useEffect(() => {
    if (!map) return;

    if (onCenterChanged) kakao.maps.event.addListener(map, "center_changed", onCenterChanged);
    if (onZoomStart) kakao.maps.event.addListener(map, "zoom_start", onZoomStart);
    if (onZoomEnd) kakao.maps.event.addListener(map, "zoom_changed", onZoomEnd);

    return () => {
      if (onCenterChanged) kakao.maps.event.removeListener(map, "center_changed", onCenterChanged);
      if (onZoomStart) kakao.maps.event.removeListener(map, "zoom_start", onZoomStart);
      if (onZoomEnd) kakao.maps.event.removeListener(map, "zoom_changed", onZoomEnd);
    };
  }, [map, onCenterChanged, onZoomStart, onZoomEnd]);
}
