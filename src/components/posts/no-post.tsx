export default function NoPost() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative bg-white p-8 max-w-full text-center">
        <div className="text-2xl font-extrabold text-text-primary mb-2">게시글이 없습니다</div>
        <p className="text-text-secondary text-sm mb-4">
          현재 선택된 위치에 게시글이 존재하지 않습니다. 새로운 게시글을 작성하거나 다른 위치에서 확인해보세요.
        </p>
      </div>
    </div>
  );
}
