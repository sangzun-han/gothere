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
        users (id, nickname, profile_url),
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
        id: data.users.id,
        nickname: data.users.nickname,
        profile_url: data.users.profile_url || null,
      },
      isLiked,
    };

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, data: null, error: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient();

    const url = new URL(req.url);
    const postId = url.pathname.split("/").pop();

    if (!postId) {
      return NextResponse.json({ success: false, message: "게시글 id를 확인해주세요." }, { status: 400 });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "유효하지 않은 인증입니다. 다시 로그인하세요." },
        { status: 401 }
      );
    }

    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("id, user_id")
      .eq("id", postId)
      .maybeSingle();

    if (postError) {
      return NextResponse.json({ success: false, message: "게시글 조회 중 오류가 발생했습니다." }, { status: 500 });
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: "이미 삭제되었거나 존재하지 않는 게시글입니다." },
        { status: 404 }
      );
    }

    if (post.user_id !== user.id) {
      return NextResponse.json({ success: false, message: "이 게시글을 삭제할 권한이 없습니다." }, { status: 403 });
    }

    const { error: deleteError } = await supabase.from("posts").delete().eq("id", postId);

    if (deleteError) {
      return NextResponse.json({ success: false, message: "게시글 삭제 중 오류가 발생했습니다." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "게시글이 성공적으로 삭제되었습니다." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
