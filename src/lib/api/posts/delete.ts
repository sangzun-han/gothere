export async function deletePost(postId: string) {
  const response = await fetch(`/api/posts/id/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const status = response.status;
    if (status === 401) {
      throw { status, message: "유효하지 않은 인증입니다." };
    } else if (status === 400) {
      throw { status, message: "잘못된 요청입니다. 올바른 게시글 ID를 확인해주세요." };
    } else if (status === 404) {
      throw { status, message: "이미 삭제되었거나 존재하지 않는 게시글입니다." };
    } else if (status === 403) {
      throw { status, message: "이 게시글을 삭제할 권한이 없습니다." };
    } else {
      throw { status, message: "서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요." };
    }
  }
}
