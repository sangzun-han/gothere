import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import RecoilProvider from "@/providers/recoil-provider";
import KakaoLoaderProvider from "@/providers/kakao-loader-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import ThemeProvider from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gothere : 당신의 흔적이 머무는 곳",
  description: "지금 여기, 이 공간에서 글을 남겨보세요.\n 글을 남긴 공간에 가야만 글를 열어 볼 수 있습니다.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon-144x144.png",
  },
  openGraph: {
    type: "website",
    title: "gothere : 당신의 흔적이 머무는 곳",
    description: "지금 여기, 이 공간에서 글을 남겨보세요. 글을 남긴 공간에 가야만 글을 열어 볼 수 있습니다.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "gothere",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/gothere-og-image.png`,
        width: 1200,
        height: 630,
        alt: "gothere : 당신의 흔적이 머무는 곳",
      },
    ],
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} overflow-auto`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RecoilProvider>
            <KakaoLoaderProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
              <Toaster />
            </KakaoLoaderProvider>
          </RecoilProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
