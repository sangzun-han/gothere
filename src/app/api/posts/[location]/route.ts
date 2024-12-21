import { Post, PostsResponse } from "@/types/posts/posts";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { location: string } }) {
  const { location } = params;
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`id, title, content, thumbnail: images->>0, latitude, longitude, location, thumbnail_blur_image`)
      .like("location", `%${location}%`)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json<PostsResponse>({ success: false, data: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json<PostsResponse>({ success: true, data: data as Post[] }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json<PostsResponse>(
      { success: false, data: [], error: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
