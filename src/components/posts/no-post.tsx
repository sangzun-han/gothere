interface NoPostProps {
  title?: string;
  description?: string;
}

export default function NoPost({
  title = "게시글이 없습니다",
  description = "현재 선택된 위치에 게시글이 존재하지 않습니다. 새로운 게시글을 작성하거나 다른 위치에서 확인해보세요.",
}: NoPostProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none">
      <div className="relative bg-app-background p-8 max-w-full text-center">
        <div className="text-2xl font-extrabold mb-2">{title}</div>
        <p className="text-gray-700 text-sm mb-4">{description}</p>
      </div>
    </div>
  );
}
