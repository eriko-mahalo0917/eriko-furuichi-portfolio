// ChatBot.tsx：チャットBotウィジェットコンポーネント
// 画面右下に常駐するチャットアイコン。クリックするとチャット画面が開く。
// グリーンの「利用可能」インジケーター付き。就活先への強いアピールポイント。

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// チャットメッセージの型定義
type Message = {
  role: "user" | "bot";
  content: string;
};

// 最初にBotが表示する挨拶メッセージ
const INITIAL_MESSAGE: Message = {
  role: "bot",
  content: "こんにちは！👋 古市絵梨子のポートフォリオサイトへようこそ。\n\nスキル・経歴・制作物など、気になることを何でも聞いてください！",
};

// よくある質問のサジェスト
const SUGGESTIONS = [
  { label: "🔧 どんなツールを作りましたか？", text: "どんなツールを作りましたか？" },
  { label: "💻 スキルを教えてください",       text: "スキルを教えてください" },
  { label: "🤝 転職活動中ですか？",           text: "転職活動中ですか？" },
];

export default function ChatBot() {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput]         = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // 未読メッセージ数（チャットが閉じているときに表示するバッジ）
  const [unread, setUnread]       = useState(1);

  const bottomRef = useRef<HTMLDivElement>(null);

  // メッセージが増えるたびに最下部にスクロールする
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // チャットを開いたとき未読バッジをリセット
  const handleOpen = () => {
    setIsOpen(true);
    setUnread(0);
  };

  // メッセージを送信する処理
  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();
    const botMessage: Message = {
      role: "bot",
      content: response.ok
        ? data.reply
        : "申し訳ありません。エラーが発生しました。しばらく経ってからお試しください。",
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── チャットウィンドウ ─────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{ height: "520px" }}
          >
            {/* ヘッダー */}
            <div className="bg-charcoal px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* アバター */}
                  <div className="relative">
                    <div className="w-9 h-9 bg-yellow-primary rounded-full flex items-center justify-center text-sm font-bold text-charcoal font-en">
                      E
                    </div>
                    {/* グリーンの「利用可能」インジケーター */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-charcoal rounded-full" />
                  </div>

                  <div>
                    <p className="text-white text-sm font-bold leading-tight">
                      Eriko&apos;s Assistant
                    </p>
                    {/* オンライン状態 */}
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-xs">オンライン・今すぐ応答可能</span>
                    </div>
                  </div>
                </div>

                {/* 閉じるボタン */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="チャットを閉じる"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Claude API バッジ */}
              <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
                <svg className="w-3.5 h-3.5 text-yellow-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300 text-xs">
                  Powered by <span className="text-yellow-primary font-semibold">Claude API</span> — 古市の情報を学習済み
                </span>
              </div>
            </div>

            {/* メッセージ一覧 */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* Botアイコン */}
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 bg-charcoal rounded-full flex items-center justify-center text-xs font-bold text-yellow-primary shrink-0 mt-0.5 font-en">
                      E
                    </div>
                  )}

                  <div
                    className={`
                      max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed
                      ${msg.role === "user"
                        ? "bg-yellow-primary text-charcoal font-medium rounded-br-sm"
                        : "bg-white text-charcoal shadow-sm border border-gray-100 rounded-bl-sm"
                      }
                    `}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* ローディング（Botが考え中） */}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 bg-charcoal rounded-full flex items-center justify-center text-xs font-bold text-yellow-primary shrink-0 mt-0.5 font-en">
                    E
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-yellow-primary rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* よくある質問サジェスト（最初のメッセージのみ） */}
              {messages.length === 1 && !isLoading && (
                <div className="mt-3">
                  <p className="text-gray-400 text-xs mb-2 text-center">よくある質問</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.text}
                        onClick={() => handleSend(s.text)}
                        className="text-left text-sm px-4 py-2.5 bg-white text-charcoal rounded-xl border border-gray-200 hover:border-yellow-primary hover:bg-yellow-light transition-all duration-150 shadow-sm"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* 入力エリア */}
            <div className="border-t border-gray-100 px-3 py-3 flex gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="メッセージを入力..."
                disabled={isLoading}
                className="flex-1 text-sm px-3 py-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-yellow-primary/50 disabled:opacity-50 transition"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 bg-yellow-primary text-charcoal rounded-xl flex items-center justify-center hover:bg-yellow-dark hover:text-white transition-colors disabled:opacity-40"
                aria-label="送信"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── チャットアイコンボタン ─────────────────────────── */}
      <div className="relative">
        <motion.button
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          className="w-14 h-14 bg-yellow-primary rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-dark transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="チャットBotを開く"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-6 h-6 text-charcoal"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-6 h-6 text-charcoal"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        {/* グリーンの「利用可能」インジケーター */}
        <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />

        {/* 未読バッジ（チャットが閉じているときだけ表示） */}
        {!isOpen && unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {unread}
          </motion.span>
        )}
      </div>
    </div>
  );
}
