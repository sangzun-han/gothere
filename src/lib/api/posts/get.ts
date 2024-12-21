import { PostsResponse } from "@/types/posts/posts";

/**
 * 특정 위치의 게시글 데이터를 가져옵니다.
 *
 * @param location - 검색할 '동' 이름
 * @returns Promise<PostsResponse>
 */
export async function getPostsByLocation(location: string): Promise<PostsResponse> {
  const response = await fetch(`/api/posts/${location}`);
  if (!response.ok) throw new Error("게시글 조회 중 오류가 발생했습니다.");

  return response.json();
}
