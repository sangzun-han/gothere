import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const dongName = searchParams.get("dong");

  if (!dongName) {
    return NextResponse.json({ success: false, message: "동 이름을 제공해야 합니다." }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from("polygons").select("coordinates").eq("emd_kor_nm", dongName);

    if (error || !data) {
      return NextResponse.json({ success: false, message: "해당 동 데이터를 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
