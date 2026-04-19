// app/page.tsx：トップページ
// 全セクションのコンポーネントをここに並べて1ページ構成を作る

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import HowItWorks from "@/components/HowItWorks";
import Spotlight from "@/components/Spotlight";
import Works from "@/components/Works";
import Skills from "@/components/Skills";
import ChatBot from "@/components/ChatBot";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// トップページのコンポーネント
export default function Home() {
  return (
    <main>
      {/* ヘッダー：ページ最上部に固定表示 */}
      <Header />

      {/* ファーストビュー：キャッチコピー・スキルタグアニメーション */}
      <Hero />

      {/* 自己紹介：テキスト・数字カウントアップ */}
      <About />

      {/* キャリアの軌跡：12年の経験をタイムラインで表示 */}
      <Timeline />

      {/* 自動化フロー図：入力→処理→出力のビジュアル */}
      <HowItWorks />

      {/* 代表作ピックアップ：インタラクティブなデモUI付き */}
      <Spotlight />

      {/* 制作物一覧：5本のツールをカード表示 */}
      <Works />

      {/* スキル一覧：カテゴリ別 */}
      <Skills />

      {/* 連絡先 */}
      <Contact />

      {/* フッター */}
      <Footer />

      {/* チャットBot：画面右下に常駐（全ページに表示） */}
      <ChatBot />
    </main>
  );
}
