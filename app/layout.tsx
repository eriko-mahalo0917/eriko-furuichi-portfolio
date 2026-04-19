// layout.tsx：全ページ共通のレイアウトを定義するファイル
// Next.js の App Router では、このファイルが全ページを包むラッパーになる

import type { Metadata } from "next";
import "./globals.css";

// ページのメタデータ（ブラウザタブやSEOに使用される）
export const metadata: Metadata = {
  title: "Eriko Furuichi | Portfolio",
  description:
    "現場12年の経験を、コードに変える。バックオフィス12年 × Python開発で業務課題を解決するエンジニアを目指しています。",
};

// RootLayout：全ページを包む共通レイアウトコンポーネント
// children には各ページの内容が入る
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
