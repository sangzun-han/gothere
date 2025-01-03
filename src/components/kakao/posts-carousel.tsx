import { useEffect, useState } from "react";
import { GeoPost } from "@/types/posts/posts";
import { Button } from "../ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/carousel";
import MarkerInfoModal from "./marker-info-modal";
import { useRouter } from "next/navigation";

interface PostsCarouselProps {
  geoPosts: GeoPost[] | [];
  dong: string;
  selectedPostIndex: number;
}

export default function PostsCarousel({ geoPosts, dong, selectedPostIndex }: PostsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const router = useRouter();

  useEffect(() => {
    if (!api) return;
    if (selectedPostIndex < 0 || selectedPostIndex >= geoPosts.length) {
      return;
    }

    api.scrollTo(selectedPostIndex, true);
  }, [api, selectedPostIndex, geoPosts]);

  if (!geoPosts || geoPosts.length === 0)
    return (
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-20 w-11/12 z-[99] bg-text-primary/80 shadow-lg rounded-lg p-4">
        <div className="flex flex-col text-white">
          <h2 className="text-lg font-bold mb-4 text-left">{`현재 '${dong}'에 작성된 글이 없어요`}</h2>
          <Button
            className="bg-brand-primary hover:bg-brand-hover text-white w-full py-2 rounded-lg text-sm font-semibold"
            onClick={() => router.push("/write")}
          >
            글 작성하러 가기
          </Button>
        </div>
      </div>
    );

  return (
    <Carousel setApi={setApi} className="fixed left-1/2 transform -translate-x-1/2 bottom-20 w-11/12 z-[99]">
      <CarouselContent>
        {geoPosts.map((post) => (
          <CarouselItem key={post.id}>
            <MarkerInfoModal post={post} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
