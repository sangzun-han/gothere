export async function updateUser(data: { nickname: string; profileUrl?: string | File }) {
  const formData = new FormData();

  formData.append("nickname", data.nickname);

  if (data.profileUrl instanceof File) {
    formData.append("profileUrl", data.profileUrl);
  }

  try {
    const response = await fetch(`/api/user`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("업데이트 중 오류가 발생했습니다.");
    }

    return response.json();
  } catch (error) {
    throw new Error("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}
