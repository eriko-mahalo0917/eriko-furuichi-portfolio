// lib/constants.ts：サイト全体で使う定数（数字・テキスト）を一元管理するファイル
//
// ここを変更するだけで、About・Bot・その他すべての表示が自動で更新される。
// Python でいう config.py / settings.py に相当する。
// TypeScript でも同じ考え方が使える！

// ────────────────────────────────────────────────
// プロフィール情報
// ────────────────────────────────────────────────
export const PROFILE = {
  name:        "古市 絵梨子",
  nameEn:      "Eriko Furuichi",
  nameInitial: "E.F",
  location:    "Fukuoka / JST",
  github:      "https://github.com/eriko-mahalo0917",
  email:       "eriko.dev1108@gmail.com",
} as const;

// ────────────────────────────────────────────────
// 数字で見る実績（About セクションのカウントアップ）
// ここを変更するだけで About セクションの数字が自動で変わる
// ────────────────────────────────────────────────
export const STATS = [
  { value: 12, unit: "年",   label: "バックオフィス経験" },
  { value: 6,  unit: "本",   label: "開発したツール数"   },  // ← 5本→6本（備品管理追加）
  { value: 8,  unit: "ヶ月", label: "Python独学期間"     },
  { value: 4,  unit: "種類", label: "活用した外部API数"  },  // ← 3種類→4種類（実数に修正）
] as const;

// ────────────────────────────────────────────────
// 制作物一覧（Works セクション）
// ────────────────────────────────────────────────
export const WORKS_COUNT = 6; // 現在の制作物総数
