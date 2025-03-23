import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function NoPostMeesage({ dong }: { dong: string }) {
  const router = useRouter();

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-20 w-11/12 z-[99] bg-app-background shadow-lg rounded-lg p-4">
      <div className="flex flex-col text-gray-900">
        <h2 className="text-lg font-bold mb-4 text-left">{`현재 '${dong}'에 작성된 글이 없어요`}</h2>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-semibold"
          onClick={() => router.push("/write")}
        >
          글 작성하러 가기
        </Button>
      </div>
    </div>
  );
}
