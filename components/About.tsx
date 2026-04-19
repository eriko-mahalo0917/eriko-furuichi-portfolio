// About.tsx：自己紹介セクション
// 自己紹介テキストと、数字で見る実績（カウントアップアニメーション）を表示する

"use client"; // Framer Motion の useInView を使うためクライアントコンポーネントにする

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
// 数字は lib/constants.ts で一元管理している
// 制作物が増えたときはここではなく constants.ts だけを変更すればよい
import { STATS } from "@/lib/constants";

// カウントアップを行うカスタムフック
// from: 開始の数字、to: 目標の数字、duration: アニメーション時間（秒）、isActive: アニメーション開始フラグ
function useCountUp(from: number, to: number, duration: number, isActive: boolean) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    // isActive が false の場合は何もしない（画面外の間は動かさない）
    if (!isActive) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    // requestAnimationFrame で毎フレーム数字を更新する（スムーズなアニメーション）
    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);

      // easeOut（最初は速く、後半はゆっくり）の計算式
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + (to - from) * eased));

      // まだ終わっていなければ次のフレームも実行
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [from, to, duration, isActive]);

  return count;
}

// 各数字カードのコンポーネント（カウントアップを個別に管理する）
function StatCard({ value, unit, label }: { value: number; unit: string; label: string }) {
  const ref = useRef(null);
  // useInView：要素が画面内に入ったかどうかを検知する
  // once: true → 一度だけ発動（スクロールするたびに繰り返さない）
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // カウントアップのフックを呼び出す
  const count = useCountUp(0, value, 1.5, isInView);

  return (
    <motion.div
      ref={ref}
      // 背景カードを追加して各数字を視覚的に独立させる
      className="bg-white rounded-2xl px-6 py-8 text-center border border-gray-100 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* カウントアップする数字（大きく表示） */}
      <div className="font-en leading-none mb-3">
        <span className="text-6xl font-black text-charcoal">{count}</span>
        {/* 単位もサイズアップしてインパクトを出す */}
        <span className="text-3xl font-bold text-yellow-primary ml-2">{unit}</span>
      </div>
      {/* 説明テキスト */}
      <p className="text-gray-500 text-sm leading-snug">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="bg-offwhite py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* セクションタイトル */}
        <motion.div
          ref={ref}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-yellow-primary font-en font-semibold text-xs tracking-widest uppercase mb-2">
            About
          </p>
          {/* セクション日本語タイトルを text-4xl に拡大 */}
          <h2 className="text-5xl font-black text-charcoal">自己紹介</h2>
        </motion.div>

        {/* 自己紹介テキスト */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* 日本語 */}
          <p className="text-gray-700 leading-relaxed">
            健康食品通販会社にてチーフとして12年勤務。
            バックオフィス業務全般（受注・在庫・CS）を担当しながら、
            基幹システム刷新・生成AI導入・業務改善プロジェクトを推進してきました。
            <br /><br />
            現場の「こんな作業、自動化できないか」という声に応えるべく、
            Pythonを独学でスタート。8ヶ月で6本のツールを開発し、
            非エンジニアでも使えるexe化・GUI実装まで実践しています。
          </p>

          {/* 英語 */}
          <p className="text-gray-500 leading-relaxed font-en text-sm italic">
            Spent 12 years as a chief at a health food e-commerce company,
            handling back-office operations while leading ERP upgrades,
            AI implementation, and process improvement projects.
            <br /><br />
            Motivated by real workplace pain points, I started learning Python
            from scratch. In 8 months, I built 6 automation tools —
            complete with GUI and .exe packaging for non-engineer teammates.
          </p>
        </motion.div>

        {/* 数字で見る実績（カウントアップ） */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
