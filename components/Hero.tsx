// Hero.tsx：ファーストビューのコンポーネント
// キャッチコピー・バッジ・スキルタグのアニメーションを表示する

"use client";

import { motion } from "framer-motion";

// スキルタグの一覧（無限横スクロールアニメーションで流れる）
const SKILL_TAGS = [
  "Python", "TypeScript", "Next.js", "業務改善", "AI活用",
  "自動化", "Google Apps Script", "Selenium", "API連携",
  "Backlog", "データ収集", "LINE Bot", "Sheets連携",
];

export default function Hero() {
  return (
    // relative + overflow-hidden で背景装飾を内側に収める
    <section id="hero" className="relative bg-white pt-28 pb-20 px-6 overflow-hidden">

      {/* 背景装飾：右上に薄いイエローのぼかし円（奥行きを演出） */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-primary/10 rounded-full blur-3xl pointer-events-none"
        style={{ transform: "translate(30%, -40%)" }}
      />
      {/* 背景装飾：左下にも小さなぼかし円 */}
      <div
        className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-primary/5 rounded-full blur-2xl pointer-events-none"
        style={{ transform: "translate(-30%, 40%)" }}
      />
      {/* 背景装飾：巨大な「12」テキスト（12年の経験を視覚的に表現） */}
      {/* pointer-events-none でクリックを透過、select-none で選択不可にする */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-black font-en text-charcoal opacity-[0.04] pointer-events-none select-none leading-none"
        style={{ fontSize: "clamp(180px, 30vw, 400px)" }}
      >
        12
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* バッジ・現在地 */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-yellow-light text-yellow-dark text-sm font-semibold px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available for hire
          </span>
          <span className="text-gray-400 text-sm font-en">Fukuoka / JST</span>
        </motion.div>

        {/* 名前・肩書き */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <p className="text-gray-400 text-sm tracking-widest mb-1">古市 絵梨子 — Eriko Furuichi</p>
          <p className="text-gray-500 text-sm font-en font-medium tracking-wide">
            Backend Engineer Candidate &nbsp;·&nbsp; 12 yrs Back-Office × Python Automation
          </p>
        </motion.div>

        {/* キャッチコピー（1行目と2行目でサイズに差をつける） */}
        <motion.h1
          className="leading-tight mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal">
            現場12年の経験を、
          </span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-yellow-primary mt-1">
            コードに変える。
          </span>
        </motion.h1>

        {/* サブコピー（英語） */}
        <motion.p
          className="text-gray-400 text-base sm:text-lg font-en italic mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Turning 12 years of operations into automation, one tool at a time.
        </motion.p>

      </div>

      {/* スキルタグの無限横スクロール（画面全幅にはみ出させる） */}
      {/* -mx-6 でセクションの px-6 パディングを打ち消してフル幅にする */}
      <motion.div
        className="marquee-track overflow-hidden mt-12 -mx-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* 同じタグを2セット並べてループさせる */}
        <div className="flex gap-3 animate-marquee whitespace-nowrap w-max">
          {SKILL_TAGS.map((tag, i) => (
            <span key={`a-${i}`}
              className="inline-block bg-offwhite border border-gray-200 text-charcoal text-sm font-medium px-4 py-2 rounded-full">
              {tag}
            </span>
          ))}
          {SKILL_TAGS.map((tag, i) => (
            <span key={`b-${i}`}
              className="inline-block bg-offwhite border border-gray-200 text-charcoal text-sm font-medium px-4 py-2 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
