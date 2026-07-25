// Skills.tsx：スキル一覧セクション
// カテゴリ別にスキルをリスト表示する

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// スキルデータの型定義
type SkillCategory = {
  category: string;        // カテゴリ名
  skills: string[];        // スキルの配列
  note?: string;           // カード下部に表示する補足メモ（任意）
  aiAssisted?: boolean;    // カード全体をAI支援とみなす場合はtrue
  aiAssistedSkills?: string[]; // 特定スキルだけにAI支援マークをつける場合に指定
};

// スキルデータを定数として定義
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "言語",
    skills: ["Python", "TypeScript（学習中）", "Google Apps Script"],
    aiAssistedSkills: ["Google Apps Script"],
  },
  {
    category: "フロントエンド",
    skills: ["Next.js", "React", "Tailwind CSS"],
    note: "Claude Code（AI）と協働して開発",
    aiAssisted: true,
  },
  {
    category: "自動化・RPA",
    skills: ["Selenium", "BeautifulSoup4", "PyInstaller"],
  },
  {
    category: "API連携",
    skills: ["楽天API", "Google Maps API", "LINE API", "OpenWeatherMap API"],
  },
  {
    category: "AI活用",
    skills: ["Claude API", "NotebookLM", "Copilot", "Gemini"],
  },
  {
    category: "業務スキル",
    skills: ["要件定義支援", "Backlog", "業務改善", "新人教育"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="bg-white py-32 px-6">
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
            Skills
          </p>
          <h2 className="text-5xl font-black text-charcoal">スキル一覧</h2>
        </motion.div>

        {/* スキルカードのグリッドレイアウト */}
        {/* sm以上の画面では3列、スマホでは2列 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SKILL_CATEGORIES.map((item, index) => (
            <motion.div
              key={item.category}
              className="bg-offwhite rounded-xl p-5 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              // ホバー時に少し浮き上がるアニメーション
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* カテゴリタイトルとAI支援バッジ */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-yellow-primary font-en font-semibold text-xs tracking-widest uppercase">
                  {item.category}
                </h3>
                {/* AI支援フラグがtrueのカードだけバッジを表示 */}
                {item.aiAssisted && (
                  <span className="inline-flex items-center gap-1 bg-charcoal text-yellow-primary text-xs font-bold px-2 py-0.5 rounded-full">
                    🤖 AI支援
                  </span>
                )}
              </div>

              {/* スキルのリスト */}
              <ul className="space-y-1.5">
                {item.skills.map((skill) => {
                  // aiAssistedSkillsにスキル名が含まれていればAI支援マークを表示する
                  const isAiSkill = item.aiAssistedSkills?.includes(skill) ?? false;
                  return (
                    <li key={skill} className="flex items-center gap-2 text-charcoal text-sm">
                      {/* アクセントカラーのチェックマーク */}
                      <span className="text-yellow-primary shrink-0">▸</span>
                      <span>{skill}</span>
                      {/* AI支援スキルにはスキル名のすぐ横にバッジを付ける */}
                      {isAiSkill && (
                        <span className="shrink-0 text-xs bg-charcoal text-yellow-primary font-bold px-1.5 py-0.5 rounded-full">
                          🤖 AI支援
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* AI支援などの補足メモ（noteがある場合のみ表示） */}
              {item.note && (
                <p className="mt-3 text-xs text-gray-400 border-t border-gray-200 pt-2">
                  🤖 {item.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
