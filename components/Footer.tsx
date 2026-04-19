// Footer.tsx：フッターコンポーネント
// コピーライトを表示する

export default function Footer() {
  // 現在の年を自動取得（毎年手動で変更しなくて済む）
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
        {/* 名前イニシャル */}
        <p className="text-yellow-primary font-en font-bold text-lg">E.F</p>

        {/* コピーライト */}
        <p className="text-gray-500 text-sm font-en">
          © {currentYear} Eriko Furuichi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
