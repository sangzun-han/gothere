"use client";

import { sampleData } from "@/constants/data";
import LetterItem from "./letter-item";
import { useRecoilValue } from "recoil";
import { locationSelector } from "@/recoil/location/selector";

export default function LetterContent() {
  const location = useRecoilValue(locationSelector);

  return (
    <article className="bg-white p-4 min-h-screen font-['Nanum_Pen_Script']">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-dashed border-gray-400 pb-2">
          📮 {location.addressName}
        </h1>
      </header>

      {sampleData.map((item) => (
        <LetterItem key={item.id} item={item} />
      ))}
    </article>
  );
}
