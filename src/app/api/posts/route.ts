import { NextRequest, NextResponse } from "next/server";
import { PostFormValidation } from "@/schemas/post-schema";
import { createClient } from "@/utils/supabase/server";
import { ZodError } from "zod";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Supabase Storage에 여러 이미지를 업로드하고 URL 배열 반환
 * @param files 업로드할 파일 배열
 * @param userId 현재 유저 ID
 * @returns 업로드된 이미지 URL 배열
 */

async function uploadImages(files: File[], userId: string): Promise<string[]> {
  const supabase = await createClient();

  try {
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const fileName = `${userId}/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("post-images").upload(fileName, file);

        if (error) {
          throw new Error(`이미지 업로드 실패: ${error.message}`);
        }

        const { data: publicData } = supabase.storage.from("post-images").getPublicUrl(fileName);

        if (!publicData) {
          throw new Error(`파일 URL 조회 실패: ${fileName}`);
        }

        return publicData.publicUrl;
      })
    );

    return uploadedUrls;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "이미지 업로드 중 오류가 발생했습니다.");
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "유효하지 않은 인증입니다. 다시 로그인하세요.",
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const postData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      location: formData.get("location") as string,
      latitude: parseFloat(formData.get("latitude") as string),
      longitude: parseFloat(formData.get("longitude") as string),
      images: formData.getAll("images") as File[],
    };

    const validatedData = PostFormValidation.parse(postData);
    const imageUrls = await uploadImages(postData.images, user.id);

    const { error: saveError } = await supabase.from("posts").insert({
      user_id: user.id,
      title: validatedData.title,
      content: validatedData.content,
      location: validatedData.location,
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      images: JSON.stringify(imageUrls),
    });

    if (saveError) {
      throw new Error("게시글 저장 중 오류가 발생했습니다.");
    }

    return NextResponse.json(
      {
        success: true,
        data: { message: "게시글이 성공적으로 작성되었습니다." },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "입력 데이터가 유효하지 않습니다.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
