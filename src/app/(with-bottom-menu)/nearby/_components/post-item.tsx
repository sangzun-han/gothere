import Image from "next/image";
import Link from "next/link";

interface PostItemProps {
  post: {
    id: string;
    content: string;
    title: string;
    thumbnail: string;
    thumbnail_blur_image: string;
    users: {
      nickname: string;
    };
    created_at: string;
  };
}

export default function PostItem({ post }: PostItemProps) {
  const {
    id,
    title,
    content,
    thumbnail,
    thumbnail_blur_image,
    created_at,
    users: { nickname },
  } = post;

  return (
    <div className="mb-4">
      <Link href={`/nearby/${id}`}>
        <article className="relative bg-white rounded-lg shadow-lg p-6 border border-gray-300 transform transition hover:rotate-1 hover:scale-[1.02] cursor-pointer">
          <figure className="absolute top-4 right-4 w-16 h-16 rounded-lg border-2 border-gray-400 p-1 bg-white shadow-md rotate-6">
            <Image
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover rounded border border-gray-200"
              width={56}
              height={56}
              blurDataURL={thumbnail_blur_image}
              placeholder="blur"
            />
            <figcaption className="absolute -top-2 -left-2 w-4 h-4 bg-brand-primary rounded-full"></figcaption>
          </figure>

          <section className="pr-16 text-gray-900 space-y-2">
            <h2 className="text-base font-bold text-text-primary truncate">{title}</h2>
            <p className="text-sm text-text-secondary italic border-l-4 border-gray-300 pl-3 line-clamp-1">{content}</p>
          </section>

          <footer className="flex justify-between items-end mt-4">
            <time className="text-[11px] text-gray-500 italic">🗓 {created_at}</time>
            <cite className="text-[11px] text-gray-600 opacity-70">@{nickname}</cite>
          </footer>

          <div
            className="absolute bottom-0 right-0 w-0 h-0 
            border-solid border-l-[30px] border-b-[30px] 
            border-l-transparent border-b-gray-200 opacity-50"
          ></div>
        </article>
      </Link>
    </div>
  );
}
