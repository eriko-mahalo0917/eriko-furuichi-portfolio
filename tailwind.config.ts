import type { Config } from "tailwindcss";

// Tailwind CSS の設定ファイル
// カスタムカラーを追加して、コード全体で統一したカラーを使えるようにする
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // カスタムカラーの定義
      colors: {
        // メインイエロー（ブランドカラー）
        yellow: {
          primary: "#EAB308",   // メインイエロー（ボタン・アクセント）
          light:   "#FEF9C3",   // 薄いイエロー（背景・ハイライト用）
          dark:    "#A16207",   // 濃いイエロー（テキスト・ホバー用）
        },
        // 背景・テキスト用のカラー
        charcoal: "#1C1C1E",    // 背景ダーク・見出しテキスト
        offwhite: "#F9F9F7",    // 背景ライト（セクション背景用）
      },
      // アニメーション（スキルタグの無限横スクロール）
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
