// Works.tsx：制作物一覧セクション
// 6本のツールをカード形式で一覧表示する

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// 制作物データの型定義
type Work = {
  number: number;
  title: string;
  category: string;         // カテゴリ（Automation / Bot / Scraping など）
  description: string;
  techs: string[];
  githubUrl: string;
  featured?: boolean;       // 注目カード（Claude Code製など）に true を設定
  featuredLabel?: string;   // 注目ラベルのテキスト
};

// 制作物データを定数として定義
const WORKS: Work[] = [
  {
    number: 1,
    title: "楽天市場 価格チェッカー",
    category: "Automation",
    description: "楽天APIで商品の最安値・平均・最高価格を自動収集しCSV保存",
    techs: ["Python", "requests", "tkinter", "PyInstaller"],
    githubUrl: "https://github.com/eriko-mahalo0917/ec_price_checker",
  },
  {
    number: 2,
    title: "クリニック情報リサーチツール",
    category: "Automation",
    description: "スプレッドシートのクリニック名をバッチ処理で一括リサーチ。Google Maps APIで住所・評価・口コミ数を取得しSheetsへ自動書き込み",
    techs: ["Python", "Google Maps API", "Google Sheets API", "pandas"],
    githubUrl: "https://github.com/eriko-mahalo0917/dental-clinic-research",
  },
  {
    number: 3,
    title: "天気予報 LINE通知ボット",
    category: "Bot / API",
    description: "毎日指定時刻に天気予報をLINEへ自動送信",
    techs: ["Python", "OpenWeatherMap API", "LINE Messaging API", "schedule"],
    githubUrl: "https://github.com/eriko-mahalo0917/weather_notify_bot",
  },
  {
    number: 4,
    title: "書籍データ スクレイピングツール",
    category: "Scraping",
    description: "全50ページ・1000件の書籍データを自動収集しCSV保存",
    techs: ["Python", "BeautifulSoup4", "requests"],
    githubUrl: "https://github.com/eriko-mahalo0917/books_data_scraper",
  },
  {
    number: 5,
    title: "ブラウザ自動ログインツール",
    category: "Automation / RPA",
    description: "Seleniumでブラウザ操作・ログイン処理を自動化",
    techs: ["Python", "Selenium", "ChromeDriver"],
    githubUrl: "https://github.com/eriko-mahalo0917/libe_auto_login",
  },
  {
    number: 6,
    title: "備品管理システム",
    category: "Full Stack",
    description:
      "オフィスの備品在庫・貸出・返却をWeb上で一元管理するフルスタックアプリ。フロントエンドからバックエンド・DBまで、Claude Codeを活用して設計・実装。",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "Claude Code"],
    githubUrl: "https://github.com/eriko-mahalo0917/office-inventory-system",
    featured: true,
    featuredLabel: "Built with Claude Code",
  },
];

export default function Works() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="works" className="bg-offwhite py-32 px-6">
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
            Works
          </p>
          <h2 className="text-5xl font-black text-charcoal">制作物一覧</h2>
        </motion.div>

        {/* 制作物カードのリスト */}
        <div className="flex flex-col gap-4">
          {WORKS.map((work, index) => (
            <motion.div
              key={work.number}
              className={`
                rounded-xl p-6 border transition-shadow duration-200
                ${work.featured
                  ? "bg-gradient-to-br from-yellow-light/50 to-white border-2 border-yellow-primary/50 hover:shadow-yellow-primary/15 hover:shadow-lg"
                  : "bg-white border-gray-100 hover:shadow-md"
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              // ホバー時に少し浮き上がるアニメーション
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* featured カードの上部バナー（Claude Code アピール） */}
              {work.featured && work.featuredLabel && (
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-yellow-primary/25">
                  <span className="text-yellow-dark font-en font-semibold text-xs tracking-wider">
                    🤖 {work.featuredLabel}
                  </span>
                  {/* NEW バッジ（点滅を抑えて落ち着かせる） */}
                  <span className="ml-auto text-xs font-semibold text-yellow-dark bg-yellow-light border border-yellow-primary/40 px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* 番号バッジ（w-12 h-12 に拡大してリズムを出す） */}
                <div className={`
                  shrink-0 w-12 h-12 rounded-full font-bold flex items-center justify-center text-base font-en
                  ${work.featured ? "bg-yellow-primary text-charcoal" : "bg-yellow-primary text-charcoal"}
                `}>
                  {work.number}
                </div>

                {/* コンテンツ */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {/* ツール名 */}
                    <h3 className="text-lg font-bold text-charcoal">
                      {work.title}
                    </h3>
                    {/* カテゴリバッジ */}
                    <span className="text-xs font-en font-medium px-2 py-0.5 rounded-full bg-charcoal text-white">
                      {work.category}
                    </span>
                  </div>

                  {/* 概要 */}
                  <p className="text-sm mb-3 text-gray-500">
                    {work.description}
                  </p>

                  {/* Claude Code アピール文（featured カードのみ） */}
                  {work.featured && (
                    <div className="bg-white border border-yellow-primary/40 rounded-lg px-4 py-3 mb-3">
                      <p className="text-yellow-dark text-xs leading-relaxed">
                        💡 <span className="font-bold">Claude Code を活用して開発</span> —
                        要件定義・設計・実装・デバッグまで、AIとペアプログラミングしながらフロントエンドからバックエンドまで一人で構築。
                      </p>
                    </div>
                  )}

                  {/* 使用技術タグ */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {work.techs.map((tech) => (
                      <span
                        key={tech}
                        className={`
                          px-2.5 py-1 text-xs font-medium rounded-full border
                          bg-yellow-light text-yellow-dark border-yellow-primary/30
                          ${tech === "Claude Code" ? "font-bold border-yellow-primary/60" : ""}
                        `}
                      >
                        {tech === "Claude Code" ? "🤖 " + tech : tech}
                      </span>
                    ))}
                  </div>

                  {/* GitHubリンク */}
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors font-en text-gray-500 hover:text-yellow-primary"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub を見る
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
