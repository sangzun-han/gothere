"use client";

import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
import { Map } from "react-kakao-maps-sdk";

interface LetterDetailProps {
  params: { id: string };
}

const hardcodedItem = {
  id: 1,
  title: "A Day in Gangneung",
  username: "김민경",
  description: "강릉 여행 이야기",
  lat: 37.751853,
  lng: 128.876057,
  content:
    "강릉에 여행왔는데, 너 생각이 나서 편지썼어. 잘 지내고 있지? 옛날에 나랑 너랑 안목해변에서 맨발로 놀았던거 기억나? 그때 너무 재밌었는데 다시 오면 좋겠다~",
  image: "https://via.placeholder.com/150",
  date: "2019-06-11",
  location1: "강릉 안목해변",
  location2: "강릉 안목해변",
};

export default function LetterDetail({ params }: LetterDetailProps) {
  const item = hardcodedItem;
  return (
    <main className="flex-1 min-h-0 overflow-y-auto pb-20 [&>article]:min-h-full">
      <article className="bg-white">
        <div className="w-full bg-white overflow-hidden">
          <section className="relative w-full h-64">
            <Image src={item.image} alt="Attached letter image" layout="fill" objectFit="cover" />{" "}
          </section>

          <div className="flex flex-1 p-4 space-x-6">
            <aside className="relative w-1/6 flex items-center justify-center">
              <p
                className="absolute left-4 top-4 text-sm text-gray-600 font-serif"
                style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
              >
                {item.date}
              </p>
            </aside>

            <section className="w-5/6 space-y-6">
              <div className="flex items-center space-x-4">
                <figure className="w-12 h-12 flex-shrink-0 rounded-full border border-gray-300 p-1 bg-white shadow-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt="User profile"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-full overflow-hidden"
                  />
                </figure>
                <div className="py-1">
                  <h1 className="text-lg font-bold font-serif text-text-primary underline decoration-wavy decoration-gray-500">
                    {item.title}
                  </h1>
                  <p className="text-sm text-gray-600">@{item.username}</p>
                </div>
              </div>

              <div className="relative bg-white rounded-lg shadow-lg p-4 border-2 border-dashed border-gray-300">
                <p className="text-base text-gray-800 font-serif leading-relaxed whitespace-pre-line">{item.content}</p>
              </div>

              <section className="space-y-4">
                <div>
                  <div className="flex space-x-2 items-center">
                    <MapPin className="w-4 h-4 text-text-primary" />
                    <p className="text-xs font-semibold text-gray-500">{item.location1}에서</p>
                  </div>
                  <p className="text-xs text-gray-500 pl-6">서울특별시 성동구 뚝섬로1길 25 (성수동1가)</p>
                </div>

                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Map
                    center={{ lat: item.lat, lng: item.lng }}
                    style={{ width: "100%", height: "16rem" }}
                    draggable={false}
                  />
                </div>
              </section>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
