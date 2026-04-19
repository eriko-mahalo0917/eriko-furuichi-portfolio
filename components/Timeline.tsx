// Timeline.tsx：キャリアの軌跡セクション
// 12年の業務経験からエンジニアへの道のりをタイムライン形式で表示する

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// タイムラインの各イベントデータ
const TIMELINE_EVENTS = [
  {
    year: "2012",
    title: "バックオフィス業務スタート",
    description: "健康食品通販会社に入社。受注・在庫・カスタマーサポートなど、バックオフィス業務全般を担当。",
    highlight: false,
  },
  {
    year: "2020",
    title: "チーフ就任",
    description: "チームリーダーとして新人教育・業務改善を牽引。現場の課題を肌で感じながら、改善策を模索し続ける。",
    highlight: false,
  },
  {
    year: "2024",
    title: "生成AI導入推進",
    description: "ChatGPT・Claude 等の生成AIを業務活用する社内プロジェクトを主導。現場への展開・教育も担当。",
    highlight: false,
  },
  {
    year: "2025",
    title: "基幹システム刷新 ＋ Python 独学スタート",
    description: "基幹システム刷新プロジェクトに参画する傍ら、「この作業、自動化できるはずだ」という課題意識からPythonを完全独学で開始。8ヶ月で6本のツールを開発。",
    highlight: true,
  },
  {
    year: "2026",
    title: "エンジニアへ — 転職活動中",
    description: "12年の現場経験 × Pythonスキルを武器に、エンジニア職への転職活動を開始。このポートフォリオもその一歩。",
    highlight: true,
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    // ダーク背景でサイト全体のアクセントセクションにする
    <section className="bg-charcoal py-32 px-6 relative overflow-hidden">

      {/* 背景装飾：巨大な「CAREER」テキスト */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 font-black font-en text-white opacity-[0.03] pointer-events-none select-none leading-none"
        style={{ fontSize: "clamp(100px, 18vw, 260px)" }}
      >
        CAREER
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* セクションタイトル */}
        <motion.div
          ref={ref}
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-yellow-primary font-en font-semibold text-xs tracking-widest uppercase mb-2">
            Career
          </p>
          <h2 className="leading-tight">
            <span className="block text-3xl font-medium text-gray-400">
              現場12年、
            </span>
            <span className="block text-5xl font-black text-white mt-1">
              エンジニアへの軌跡。
            </span>
          </h2>
        </motion.div>

        {/* タイムライン本体 */}
        <div className="relative">

          {/* 縦の接続ライン */}
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-gradient-to-b from-yellow-primary/80 via-yellow-primary/40 to-transparent" />

          {/* 各イベント */}
          <div className="flex flex-col gap-10">
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div
                key={event.year}
                className="flex items-start gap-8"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* 左側：年号 + ドット */}
                <div className="flex flex-col items-center shrink-0 w-[72px]">
                  {/* 年号テキスト */}
                  <span className={`font-en font-bold text-sm mb-2 ${event.highlight ? "text-yellow-primary" : "text-gray-500"}`}>
                    {event.year}
                  </span>
                  {/* タイムラインのドット（ハイライトは黄色、通常はグレー） */}
                  <div className={`w-3 h-3 rounded-full border-2 ${event.highlight ? "bg-yellow-primary border-yellow-primary" : "bg-charcoal border-gray-600"}`} />
                </div>

                {/* 右側：タイトル + 説明 */}
                <div className={`pb-2 ${event.highlight ? "" : ""}`}>
                  <h3 className={`font-bold text-base mb-1 ${event.highlight ? "text-yellow-primary" : "text-gray-300"}`}>
                    {event.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
