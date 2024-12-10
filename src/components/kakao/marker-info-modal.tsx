import Image from "next/image";
import { Button } from "../ui/button";

const selectedItem = {
  id: 1,
  title: "사용자이름",
  description: "제목",
  lat: 36.3408,
  lng: 127.3935,
  image: "https://via.placeholder.com/100",
};

export default function MarkerInfoModal() {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20 bg-white shadow-lg rounded-lg p-4 w-11/12 z-[999]">
      <button className="absolute top-2 right-3 text-text-secondary/50 hover:text-text-secondary text-lg font-bold">
        ×
      </button>
      <div className="flex items-center mb-3">
        <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
          <Image
            src={selectedItem.image || "https://via.placeholder.com/100"}
            alt={selectedItem.title}
            className="object-cover w-full h-full"
            width={56}
            height={56}
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-text-primary">{selectedItem.title}</h2>
          <p className="text-sm text-text-secondary/50">{selectedItem.description}</p>
        </div>
      </div>

      <div className="flex items-center text-xs text-gray-500 mb-2">
        <div className="flex items-center">
          <span className="text-text-primary/70">대전 서구 용문동</span>
        </div>
      </div>
      <Button className="bg-brand-primary hover:bg-brand-hover text-white p-2 rounded-lg w-full font-semibold text-sm">
        자세히보기
      </Button>
    </div>
  );
}
