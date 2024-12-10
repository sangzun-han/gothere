import { LocateIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ReturnToLocationButtonProps {
  onClick: () => void;
}

export default function ReturnToLocationButton({ onClick }: ReturnToLocationButtonProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-50">
      <Button
        onClick={onClick}
        className="p-2 bg-white rounded-full shadow-md text-lg font-bold hover:bg-secondary-dark"
        aria-label="현재위치로 돌아오기"
        size="icon"
      >
        <LocateIcon className="w-4 h-4 text-text-primary" />
      </Button>
    </div>
  );
}
