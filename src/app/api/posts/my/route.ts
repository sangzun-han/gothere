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
      .select(`id,title,content,location,thumbnail:images->>0,thumbnail_blur_image, created_at, users (nickname)`)
      .eq("user_id", user.id)
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
