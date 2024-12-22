import { GeoPostsResponse, PostListResponse } from "@/types/posts/posts";

/**
 * 특정 위치의 게시글 데이터를 가져옵니다.
 *
 * @param location - 검색할 '동' 이름
 * @returns Promise<PostsResponse>
 */
export async function getPostsByLocation(location: string): Promise<GeoPostsResponse> {
  const response = await fetch(`/api/posts/location/${location}`);
  if (!response.ok) throw new Error("게시글 조회 중 오류가 발생했습니다.");

  return response.json();
}

/**
 * 특정 위치의 게시글 데이터를 가져옵니다.
 *
 * @param location - 검색할 '동' 이름
 * @param page - 현재 페이지 (기본값: 1)
 * @param limit - 페이지당 데이터 수 (기본값: 30)
 * @returns Promise<PostListResponse>
 */
export async function getPostListByLocation(
  location: string,
  page: number = 1,
  limit: number = 30
): Promise<PostListResponse> {
  if (!location) {
    throw new Error("Location parameter is required");
  }

  const queryParams = new URLSearchParams({
    location,
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`/api/posts/list?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error(`게시글 조회 중 오류가 발생했습니다.`);
  }

  return response.json();
}

export async function getPostDetail(id: string) {
  if (!id) throw new Error("id parameter is required");
  const response = await fetch(`/api/posts/id/${id}`);
  if (!response.ok) {
    const error = await response.json();
    const status = response.status;

    if (status === 404) {
      throw { status, message: "게시글을 찾을 수 없습니다." };
    } else if (status === 400) {
      throw { status, message: "잘못된 요청입니다. 올바른 게시글 ID를 확인해주세요." };
    } else if (status === 500) {
      throw { status, message: "서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요." };
    }

    throw { status, message: error.message || "An unknown error occurred" };
  }

  return response.json();
}
