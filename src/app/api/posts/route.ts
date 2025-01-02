import { NextRequest, NextResponse } from "next/server";
import { PostFormValidation } from "@/schemas/post-schema";
import { createClient } from "@/utils/supabase/server";
import { ZodError } from "zod";
import { getBlurImg } from "@/utils/image/get-blur-image";
import { isPointInPolygon } from "@/utils/polygon/ray-casting";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
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
      city: formData.get("city") as string,
      district: formData.get("district") as string,
      dong: formData.get("dong") as string,
      latitude: parseFloat(formData.get("latitude") as string),
      longitude: parseFloat(formData.get("longitude") as string),
      images: JSON.parse(formData.get("images") as string) as string[],
      polygonPaths: JSON.parse(formData.get("polygonPaths") as string),
    };

    const validatedData = PostFormValidation.parse(postData);

    const isValidLocation = postData.polygonPaths.some((polygon: { lat: number; lng: number }[]) =>
      isPointInPolygon({ lat: postData.latitude, lng: postData.longitude }, polygon)
    );

    if (!isValidLocation) {
      return NextResponse.json(
        { success: false, message: "위치가 해당 동의 경계 안에 포함되지 않습니다." },
        { status: 400 }
      );
    }

    const thumbnail_blur_image = await getBlurImg(validatedData.images[0]);

    const { error: saveError } = await supabase.from("posts").insert({
      user_id: user.id,
      title: validatedData.title,
      content: validatedData.content,
      location: validatedData.location,
      city: validatedData.city,
      district: validatedData.district,
      dong: validatedData.dong,
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      images: validatedData.images,
      thumbnail_blur_image: thumbnail_blur_image,
    });

    if (saveError) {
      throw new Error("게시글 저장 중 오류가 발생했습니다.");
    }

    return NextResponse.json(
      { success: true, data: { message: "게시글이 성공적으로 작성되었습니다." } },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false, message: "입력 데이터가 유효하지 않습니다." }, { status: 400 });
    }

    return NextResponse.json(
      { success: false, message: "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
