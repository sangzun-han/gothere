import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilProvider from "@/providers/recoil-provider";
import KakaoLoaderProvider from "@/providers/kakao-loader-provider";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import { getIsLogin } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gothere : 당신의 흔적이 머무는 곳",
  description: "지금 여기, 이 공간에서 글을 남겨보세요.\n 글을 남긴 공간에 가야만 글를 열어 볼 수 있습니다.",
  icons: {
    icon: "/gothere.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await getIsLogin();

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-auto`}>
        <RecoilProvider>
          <KakaoLoaderProvider>
            {children}
            <BottomNavigation isLoggedIn={isLoggedIn} />
          </KakaoLoaderProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
