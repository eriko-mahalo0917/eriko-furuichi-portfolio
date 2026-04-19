// Header.tsx：ヘッダー・ナビゲーションコンポーネント
// 画面上部に固定表示される。スクロールで影が付く。

"use client"; // useStateやuseEffectを使うためクライアントコンポーネントにする

import { useState, useEffect } from "react";

// ナビゲーションメニューの項目を定義
// label: 表示テキスト、href: リンク先（セクションのID）
const NAV_ITEMS = [
  { label: "About",   href: "#about" },
  { label: "Works",   href: "#works" },
  { label: "Skills",  href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  // スクロール量を管理するstate（false = ページ最上部）
  const [scrolled, setScrolled] = useState(false);

  // スクロールイベントを監視して、影を付けるかどうかを切り替える
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // スクロールイベントを登録
    window.addEventListener("scroll", handleScroll);

    // コンポーネントが削除されるときにイベントを解除（メモリリーク防止）
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-white/90 backdrop-blur-sm
        transition-shadow duration-300
        ${scrolled ? "shadow-md" : "shadow-none"}
      `}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 左側：ロゴ（名前イニシャル「E.F」） */}
        <a
          href="#"
          className="text-xl font-bold text-charcoal font-en hover:text-yellow-primary transition-colors duration-200"
        >
          E.F
        </a>

        {/* 右側：ナビゲーションリンク */}
        <nav>
          <ul className="flex gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-gray-600 hover:text-yellow-primary font-medium transition-colors duration-200 font-en"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
