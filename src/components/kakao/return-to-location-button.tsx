import { LocateIcon } from "lucide-react";

interface ReturnToLocationButtonProps {
  onClick: () => void;
}

export default function ReturnToLocationButton({ onClick }: ReturnToLocationButtonProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-50">
      <button
        onClick={onClick}
        className="p-2 bg-white rounded-full shadow-md text-lg font-bold"
        aria-label="현재위치로 돌아오기"
      >
        <LocateIcon className="w-4 h-4 text-text-primary" />
      </button>
    </div>
  );
}
