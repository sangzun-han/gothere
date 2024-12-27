import { GeoPost, GeoPostsResponse } from "@/types/posts/posts";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const si = searchParams.get("si");
  const gu = searchParams.get("gu");
  const dong = searchParams.get("dong");

  if (!si || !gu || !dong) {
    return NextResponse.json({ success: false, data: [], error: "시/군/동 정보가 필요합니다." }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`id, title, content, thumbnail: images->>0, latitude, longitude, location, thumbnail_blur_image`)
      .eq("city", si)
      .eq("district", gu)
      .eq("dong", dong)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json<GeoPostsResponse>({ success: false, data: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json<GeoPostsResponse>({ success: true, data: data as GeoPost[] }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json<GeoPostsResponse>(
      { success: false, data: [], error: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
