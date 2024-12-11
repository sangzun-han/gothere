import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilProvider from "@/providers/recoil-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gothere : 당신의 흔적이 머무는 곳",
  description: "지금 여기, 이 공간에서 글을 남겨보세요.\n 글을 남긴 공간에 가야만 글를 열어 볼 수 있습니다.",
  icons: {
    icon: "/gothere.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-auto`}>
        <RecoilProvider>{children}</RecoilProvider>
      </body>
    </html>
  );
}
