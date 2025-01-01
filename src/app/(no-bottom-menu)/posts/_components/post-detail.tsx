import { MyMarker } from "@/components/kakao";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { usePostDetailById, useUpdateLike } from "@/lib/api/posts/hooks";
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";

export default function PostDetail({ uuid }: { uuid: string }) {
  const { data } = usePostDetailById(uuid);

  if (!data || !data.data) return notFound();

  const {
    content,
    created_at,
    images,
    location,
    thumbnail_blur_image,
    title,
    latitude,
    longitude,
    isLiked,
    users: { nickname, profile_url },
  } = data.data;

  const updateLikeMutation = useUpdateLike(uuid);

  return (
    <main className="flex-1 min-h-0 overflow-y-auto pb-20 [&>article]:min-h-full">
      <article className="bg-white">
        <div className="w-full bg-white overflow-hidden">
          <section className="relative h-64">
            <Carousel className="">
              <CarouselContent className="h-64">
                {images.map((image, index) => {
                  return (
                    <CarouselItem key={index} className="relative w-full h-64">
                      <Image
                        src={image}
                        alt="Attached letter image"
                        {...(index === 0 ? { blurDataURL: thumbnail_blur_image, placeholder: "blur" } : {})}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </section>

          <div className="flex flex-1 p-4 space-x-6">
            <aside className="relative w-1/6 flex items-center justify-center">
              <p
                className="absolute left-4 top-4 text-sm text-gray-600 font-serif"
                style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
              >
                {created_at}
              </p>
            </aside>

            <section className="w-5/6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <figure className="w-12 h-12 flex-shrink-0 rounded-full border border-gray-300 p-1 bg-white shadow-md overflow-hidden">
                    <Image
                      src={profile_url ? profile_url : "https://via.placeholder.com/48"}
                      alt="User profile"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover rounded-full overflow-hidden"
                    />
                  </figure>
                  <div className="py-1">
                    <h1 className="text-base font-bold font-serif text-text-primary underline decoration-wavy decoration-gray-500">
                      {title}
                    </h1>
                    <p className="text-[11px] text-gray-600">@{nickname}</p>
                  </div>
                </div>
                <Button
                  className="p-2 rounded-full border bg-white"
                  size="icon"
                  variant="ghost"
                  onClick={() => updateLikeMutation.mutate()}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "text-red-500 fill-red-500" : "text-text-primary fill-none"}`}
                  />
                </Button>
              </div>

              <div className="relative bg-white rounded-lg shadow-lg p-4 border border-gray-300">
                <p className="text-sm text-text-primary leading-relaxed">{content}</p>
              </div>

              <section className="space-y-4">
                <div>
                  <div className="flex space-x-2 items-center">
                    <MapPin className="w-4 h-4 text-text-primary" />
                    <p className="text-[11px] font-semibold text-gray-500">{location}</p>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Map center={{ lat: latitude, lng: longitude }} style={{ width: "100%", height: "16rem" }}>
                    <MyMarker latitude={latitude} longitude={longitude} />
                  </Map>
                </div>
              </section>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
