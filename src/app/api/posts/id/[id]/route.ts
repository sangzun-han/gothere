import { PostDetail, PostDetailResponse, SupabasePostDetail } from "@/types/posts/posts";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ success: false, data: [], error: "id parameter is required" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
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

    const { data, error } = await supabase
      .from("posts")
      .select(
        `id,title,content,location, images, thumbnail_blur_image, created_at, latitude, longitude,
        users (nickname, profile_url),
        favorites (user_id)
        `
      )
      .eq("id", id)
      .eq("favorites.user_id", user.id)
      .maybeSingle<SupabasePostDetail>();

    if (error) {
      if (error.code === "22P02") {
        return NextResponse.json({ success: false, data: null, error: "Invalid UUID format" }, { status: 400 });
      }
      return NextResponse.json({ success: false, data: null, error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json<PostDetailResponse>(
        { success: false, data: null, error: "Post not found" },
        { status: 404 }
      );
    }

    const isLiked = !!data.favorites?.length;

    const post: PostDetail = {
      title: data.title,
      content: data.content,
      location: data.location,
      images: data.images,
      thumbnail_blur_image: data.thumbnail_blur_image,
      created_at: format(new Date(data.created_at), "yyyy-MM-dd"),
      latitude: data.latitude,
      longitude: data.longitude,
      users: {
        nickname: data.users.nickname,
        profile_url: data.users.profile_url || null,
      },
      isLiked,
    };

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, data: null, error: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
