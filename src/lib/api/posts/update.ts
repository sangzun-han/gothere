export async function updateLike(postId: string) {
  const response = await fetch("/api/posts/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "좋아요 처리 중 오류가 발생했습니다.");
  }

  return response.json();
}
