import { UserProfile } from "@/types/user/user";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, data: null, error: "사용자 인증에 실패했습니다." }, { status: 401 });
    }

    // 사용자 정보 가져오기
    const { data, error } = await supabase
      .from("users")
      .select("nickname, profile_url")
      .eq("id", user.id)
      .single<UserProfile>();

    if (error || !data) {
      return NextResponse.json({ success: false, data: null, error: "사용자를 찾을 수 없습니다." }, { status: 404 });
    }

    const userProfile: UserProfile = {
      nickname: data.nickname,
      profile_url: data.profile_url || "/default_128x128.png",
    };

    return NextResponse.json({ success: true, data: userProfile }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, data: null, error: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
