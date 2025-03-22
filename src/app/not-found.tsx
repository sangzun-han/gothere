import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-app-background px-6">
      <div className="relative bg-app-background p-8 max-w-lg text-center">
        <div className="text-6xl font-extrabold mb-4">404</div>
        <div className="text-xl font-semibold text-gray-700 mb-2">페이지를 찾을 수 없습니다.</div>
        <p className="text-gray-700 text-sm mb-4">요청하신 페이지가 존재하지 않거나, 주소가 잘못 입력되었습니다.</p>

        <div className="flex justify-center space-x-4">
          <Link href="/" className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
