export async function getUser() {
  const response = await fetch(`/api/user`);
  if (!response.ok) {
    const error = await response.json();
    const status = response.status;

    if (status === 404) {
      throw { status, message: "사용자를 찾을 수 없습니다." };
    } else if (status === 400) {
      throw { status, message: "잘못된 요청입니다." };
    } else if (status === 500) {
      throw { status, message: "서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요." };
    }
    throw { status, message: error.message || "An unknown error occurred" };
  }
  return response.json();
}

export async function getUserStats() {
  const response = await fetch(`/api/user/stats`);
  if (!response.ok) {
    const error = await response.json();
    const status = response.status;
    if (status === 404) {
      throw { status, message: "사용자를 찾을 수 없습니다" };
    } else if (status === 400) {
      throw { status, message: "잘못된 요청입니다." };
    } else if (status === 401) {
      throw { status, message: "사용자 인증에 실패했습니다." };
    } else if (status === 500) {
      throw { status, message: "서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요." };
    }
    throw { status, message: error.message || "An unknown error occurred" };
  }
  return response.json();
}
