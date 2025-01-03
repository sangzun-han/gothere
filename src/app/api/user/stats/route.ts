import { UserStatsResponse } from "@/types/user/user";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<UserStatsResponse>> {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, data: null, error: "사용자 인증에 실패했습니다." }, { status: 401 });
    }

    const [postCountResponse, favoriteCountResponse] = await Promise.all([
      supabase.from("posts").select("*", { count: "exact", head: true }).eq("user_id", user.id),
      supabase.from("favorites").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    ]);

    if (postCountResponse.error || favoriteCountResponse.error) {
      throw new Error(`게시글/즐겨찾기 조회 오류`);
    }

    const postCount = postCountResponse.count ?? 0;
    const favoritesCount = favoriteCountResponse.count ?? 0;

    return NextResponse.json({ success: true, data: { postCount, favoritesCount } }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: null, message: error instanceof Error ? error.message : "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
