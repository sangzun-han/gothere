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
      return NextResponse.json({ success: false, data: null, message: "사용자 인증에 실패했습니다." }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("users")
      .select("nickname, profile_url")
      .eq("id", user.id)
      .single<UserProfile>();

    if (error || !data) {
      return NextResponse.json({ success: false, data: null, message: "사용자를 찾을 수 없습니다." }, { status: 404 });
    }

    const userProfile: UserProfile = {
      nickname: data.nickname,
      profile_url: data.profile_url || "/default_128x128.png",
    };

    return NextResponse.json({ success: true, data: userProfile }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, data: null, message: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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

    const formData = await req.formData();
    const nickname = formData.get("nickname") as string | null;
    const profileBlob = formData.get("profileUrl") as Blob | null;

    if (!nickname) {
      return NextResponse.json({ success: false, message: "닉네임은 필수 항목입니다." }, { status: 400 });
    }

    let uploadedUrl: string | null = null;

    if (profileBlob) {
      const fileName = `${user.id}/${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage.from("profile-images").upload(fileName, profileBlob);

      if (uploadError) {
        throw new Error(`프로필 이미지 업로드 실패: ${uploadError.message}`);
      }

      const { data: publicData } = supabase.storage.from("profile-images").getPublicUrl(fileName);

      if (!publicData?.publicUrl) {
        throw new Error(`파일 URL 조회 실패: ${fileName}`);
      }

      uploadedUrl = publicData.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({
        nickname,
        ...(uploadedUrl && { profile_url: uploadedUrl }),
      })
      .eq("id", user.id);

    if (updateError) {
      throw new Error("프로필 업데이트 중 오류가 발생했습니다.");
    }

    return NextResponse.json({ success: true, message: "프로필이 성공적으로 업데이트되었습니다." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
