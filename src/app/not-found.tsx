import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-secondary-dark">
      <div className="text-4xl font-bold text-gray-800 mb-6">
        <span className="text-primary">gothere</span>
      </div>

      <h1 className="text-xl font-semibold text-gray-800 mb-2">다시 한 번 확인해 주세요.</h1>
      <p className="text-gray-600 mb-8">입력하신 페이지의 주소를 다시 한 번 확인해 주세요.</p>

      <div className="flex space-x-4">
        <button className="p-3 bg-secondary text-gray-primary rounded-md text-sm gap-1 border">이전 페이지</button>
        <Link href="/" className="p-3 bg-brand-primary text-white rounded-md text-sm gap-1 border">
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
