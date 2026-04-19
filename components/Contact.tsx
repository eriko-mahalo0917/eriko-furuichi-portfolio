// Contact.tsx：連絡先セクション
// GitHubリンクとメッセージを表示する

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="bg-offwhite py-32 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* セクションタイトル */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-yellow-primary font-en font-semibold text-xs tracking-widest uppercase mb-2">
            Contact
          </p>
          {/* タイトルを text-4xl に拡大 */}
          <h2 className="text-5xl font-black text-charcoal mb-6">一緒に働きませんか？</h2>

          {/* アピール文（短く・具体的に） */}
          <div className="max-w-2xl mx-auto mb-10 space-y-2">
            <p className="text-gray-600 leading-relaxed">
              現場12年の業務知識と、Pythonによる自動化スキルを持つエンジニア候補です。
            </p>
            <p className="text-gray-600 leading-relaxed">
              「業務をわかるエンジニア」として、チームの課題解決に貢献したいと考えています。
            </p>
            <p className="text-gray-500 text-sm mt-4">
              お気軽にご連絡ください。すぐにお返事します。
            </p>
          </div>
        </motion.div>

        {/* ボタン群（大きめサイズでCTAを強化） */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* GitHub */}
          <a
            href="https://github.com/eriko-mahalo0917"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3
              px-10 py-4 bg-charcoal text-white font-semibold rounded-xl text-base
              hover:bg-gray-800 transition-colors duration-200
              font-en
            "
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub を見る
          </a>

          {/* メールアドレス */}
          <a
            href="mailto:eriko.dev1108@gmail.com"
            className="
              inline-flex items-center gap-3
              px-10 py-4 bg-yellow-primary text-charcoal font-semibold rounded-xl text-base
              hover:bg-yellow-dark hover:text-white transition-colors duration-200
            "
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            メールを送る
          </a>
        </motion.div>
      </div>
    </section>
  );
}
