"use client";

import useRequireAuth from "@/hooks/auth/use-require-auth";
import Image from "next/image";
import Link from "next/link";

interface LetterItemProps {
  item: {
    id: number;
    title: string;
    username: string;
    description: string;
    lat: number;
    lng: number;
    content: string;
    image: string;
  };
}

export default function LetterItem({ item }: LetterItemProps) {
  const { checkAuth, LoginRequiredModal } = useRequireAuth();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    checkAuth(path);
  };

  return (
    <div className="mb-4">
      <Link href={`/nearby/${item.id}`} onClick={(e) => handleLinkClick(e, `/nearby/${item.id}`)}>
        <article className="relative bg-white rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-300 transform transition hover:rotate-1 hover:scale-[1.02] cursor-pointer">
          <figure className="absolute top-4 right-4 w-16 h-16 rounded-lg border-2 border-gray-400 p-1 bg-white shadow-md rotate-6">
            <Image
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded border border-gray-200"
              width={56}
              height={56}
            />
            <figcaption className="absolute -top-2 -left-2 w-4 h-4 bg-brand-primary rounded-full"></figcaption>
          </figure>

          <section className="pr-16 text-gray-900 space-y-2">
            <h2 className="text-xl font-bold text-text-primary underline decoration-wavy decoration-gray-500">
              {item.title}
            </h2>
            <p className="text-base text-text-secondary italic border-l-4 border-gray-300 pl-3 line-clamp-3">
              {item.content}
            </p>
          </section>

          <footer className="flex justify-between items-end mt-4">
            <time className="text-sm text-gray-500 italic">🗓 2024/12/12</time>
            <cite className="text-xs text-gray-600 opacity-70">From: @{item.username}</cite>
          </footer>

          <div
            className="absolute bottom-0 right-0 w-0 h-0 
              border-solid border-l-[30px] border-b-[30px] 
              border-l-transparent border-b-gray-200 opacity-50"
          ></div>
        </article>
      </Link>

      {LoginRequiredModal}
    </div>
  );
}
