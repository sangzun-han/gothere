import { PostFormValues } from "@/schemas/post-schema";
import { Coordinate } from "@/types/coordinate/coordinate";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function createPost(values: PostFormValues) {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("content", values.content);
  formData.append("location", values.location);
  formData.append("city", values.city);
  formData.append("district", values.district);
  formData.append("dong", values.dong);
  formData.append("latitude", values.latitude.toString());
  formData.append("longitude", values.longitude.toString());

  values.images.forEach((image, index) => {
    formData.append(`images`, image as File);
  });

  formData.append("polygonPaths", JSON.stringify(values.polygonPaths));

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    const result: ApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.error || "게시글 작성 중 오류가 발생했습니다.");
    }

    return result.data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("네트워크 연결을 확인해주세요.");
    }

    throw error;
  }
}
