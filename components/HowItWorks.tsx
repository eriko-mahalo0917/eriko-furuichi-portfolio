// HowItWorks.tsx：自動化フロー図セクション
// 案A：グラデーションライン型（白背景・横並び）
// 3ステップを横に並べ、ステップ間を黄色い点線で接続。明るく読みやすいデザイン。

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
// lucide-react のラインアイコンを使用
import { DatabaseZap, Cpu, Send } from "lucide-react";

// フローの各ステップを定義
// icon には lucide-react のコンポーネントを直接格納する
const FLOW_STEPS = [
  {
    number: "01",
    Icon: DatabaseZap,
    title: "拾う",
    subtitle: "Input",
    description: "現場に散らばるデータを自動で集める",
    items: ["Sheets / Forms", "Webスクレイピング", "外部API取得"],
  },
  {
    number: "02",
    Icon: Cpu,
    title: "処理する",
    subtitle: "Engine",
    description: "Pythonで整形・集計・判定を自動化する",
    items: ["データ整形・クレンジング", "API連携・条件分岐", "スケジュール実行"],
  },
  {
    number: "03",
    Icon: Send,
    title: "届ける",
    subtitle: "Output",
    description: "必要な人に、必要な形で情報を渡す",
    items: ["CSV / Sheets 自動書込み", "LINE / メール通知", "Excelレポート出力"],
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* セクションタイトル */}
        <motion.div
          ref={ref}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-yellow-primary font-en font-semibold text-xs tracking-widest uppercase mb-2">
            How it works
          </p>
          <h2 className="leading-tight">
            <span className="block text-3xl font-medium text-gray-400">
              データをつなぎ、
            </span>
            <span className="block text-5xl font-black text-charcoal mt-1">
              かたちにして、届ける。
            </span>
          </h2>
        </motion.div>

        {/* ステップ全体のラッパー（相対位置にして接続線を引く） */}
        <div className="relative">

          {/* ── 接続線（横方向のグラデーションライン）────────────────
              sm 以上の画面でのみ表示。
              top は番号バッジの中心に合わせる（バッジ h-16 = 64px → 中心 32px + padding）
          ────────────────────────────────────────────────────── */}
          <div
            className="absolute hidden sm:block h-0.5 bg-gradient-to-r from-yellow-primary via-yellow-primary/60 to-yellow-primary/20"
            style={{ top: "32px", left: "10%", right: "10%" }}
          />

          {/* 3ステップのグリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            {FLOW_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* 番号バッジ（円形）：lucide-react のラインアイコン + 番号 */}
                <div className="w-16 h-16 rounded-full bg-charcoal border-4 border-white shadow-lg flex flex-col items-center justify-center mb-5">
                  <step.Icon className="text-yellow-primary" size={18} strokeWidth={1.5} />
                  <span className="text-yellow-primary font-en font-bold text-xs mt-0.5">
                    {step.number}
                  </span>
                </div>

                {/* カードコンテンツ */}
                <div className="bg-offwhite rounded-2xl p-6 w-full border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  {/* サブタイトル（英語） */}
                  <p className="text-yellow-primary font-en font-semibold text-xs tracking-widest uppercase mb-1">
                    {step.subtitle}
                  </p>

                  {/* タイトル（日本語） */}
                  <h3 className="text-xl font-bold text-charcoal mb-2">{step.title}</h3>

                  {/* 説明文 */}
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{step.description}</p>

                  {/* 具体例タグ */}
                  <div className="flex flex-col gap-1.5">
                    {step.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1.5 bg-white text-gray-600 rounded-lg border border-gray-200 text-left"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
