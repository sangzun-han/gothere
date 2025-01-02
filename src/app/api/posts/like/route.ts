import { Post, PostListResponse } from "@/types/posts/posts";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "30", 10);

  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 인증입니다. 다시 로그인하세요." },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("posts")
      .select(
        `id,title,content,location,thumbnail:images->>0,thumbnail_blur_image, created_at, 
        users (nickname), 
        favorites!inner (user_id)`
      )
      .eq("favorites.user_id", user.id)
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
      .returns<Post[]>();

    if (error) {
      return NextResponse.json<PostListResponse>({ success: false, data: [], error: error.message }, { status: 500 });
    }

    const posts: Post[] = (data ?? []).map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail,
      thumbnail_blur_image: post.thumbnail_blur_image,
      users: { nickname: post.users?.nickname },
      created_at: format(new Date(post.created_at), "yyyy-MM-dd"),
    }));

    return NextResponse.json<PostListResponse>({ success: true, data: posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json<PostListResponse>(
      { success: false, data: [], error: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { postId } = await req.json();

  if (!postId) {
    return NextResponse.json({ success: false, message: "postId 정보가 필요합니다" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 인증입니다. 다시 로그인하세요." },
        { status: 401 }
      );
    }

    const { data: favorite, error: selectError } = await supabase
      .from("favorites")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (selectError) {
      return NextResponse.json({ success: false, message: selectError.message }, { status: 500 });
    }

    if (favorite) {
      const { error: deleteError } = await supabase.from("favorites").delete().eq("id", favorite.id);

      if (deleteError) {
        return NextResponse.json({ success: false, message: deleteError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, isLiked: false, message: "좋아요가 취소되었습니다." }, { status: 200 });
    } else {
      const { error: insertError } = await supabase.from("favorites").insert({
        post_id: postId,
        user_id: user.id,
      });

      if (insertError) {
        return NextResponse.json({ success: false, message: insertError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, isLiked: true, message: "좋아요가 추가되었습니다." }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, data: null, error: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
