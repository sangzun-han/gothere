import { usePostListByLocation } from "@/lib/api/posts/hooks";
import PostItem from "./post-item";

export default function PostList({ dong }: { dong: string }) {
  const { data: postList } = usePostListByLocation(dong, 1, 30);

  return (
    <>
      {postList.data?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
}
