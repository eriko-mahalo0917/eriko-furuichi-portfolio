// Spotlight.tsx：代表作ピックアップコンポーネント
// 代表作4本をアニメーション付きのデモUIで詳しく紹介する

"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// Spotlight 01：楽天市場 価格チェッカーのデモUI
// ─────────────────────────────────────────────────────────────────
function RakutenDemo() {
  const [status, setStatus] = useState<"idle" | "searching" | "done">("idle");

  const handleSearch = () => { setStatus("searching"); setTimeout(() => setStatus("done"), 1200); };
  const handleReset  = () => setStatus("idle");

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 font-en text-sm">
      {/* 検索バー */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-gray-600 text-sm">「プロテイン 1kg」</div>
        <button
          onClick={status === "done" ? handleReset : handleSearch}
          disabled={status === "searching"}
          className="bg-yellow-primary text-charcoal text-xs font-semibold px-4 py-2 rounded-lg hover:bg-yellow-dark hover:text-white transition-colors disabled:opacity-50"
        >
          {status === "idle" ? "検索" : status === "searching" ? "..." : "リセット"}
        </button>
      </div>

      <AnimatePresence>
        {status === "searching" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-gray-400 text-xs text-center py-4">楽天APIから取得中...</motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "done" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs text-gray-500">検索結果</span>
              <span className="text-xs font-bold text-charcoal">
                ヒット件数：<span className="text-yellow-primary text-sm">2,847</span> 件
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "最安値",  value: "¥2,480", color: "text-green-600",  bg: "bg-green-50" },
                { label: "平均価格", value: "¥3,120", color: "text-yellow-dark", bg: "bg-yellow-light" },
                { label: "最高値",  value: "¥4,200", color: "text-red-500",    bg: "bg-red-50" },
              ].map((item) => (
                <div key={item.label} className={`text-center ${item.bg} rounded-lg p-3`}>
                  <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                  <p className={`font-bold text-base ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-green-600 text-xs text-right mt-2">✓ CSV保存完了</p>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "idle" && (
        <div className="text-gray-300 text-xs text-center py-4">▲ 検索ボタンを押してみてください</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Spotlight 02：クリニック情報リサーチツールのデモUI
// ─────────────────────────────────────────────────────────────────
function ClinicDemo() {
  const [status, setStatus] = useState<"input" | "fetching" | "done">("input");

  const handleFetch = () => { setStatus("fetching"); setTimeout(() => setStatus("done"), 1800); };
  const handleReset = () => setStatus("input");

  const inputNames = ["〇〇歯科クリニック", "△△デンタル", "□□矯正歯科"];

  const resultRows = [
    { name: "〇〇歯科クリニック", address: "福岡市中央区大名1-1-1", rating: "4.3", reviews: "87件" },
    { name: "△△デンタル",        address: "福岡市中央区天神2-3-4", rating: "4.1", reviews: "52件" },
    { name: "□□矯正歯科",        address: "福岡市中央区赤坂1-2-3", rating: "4.6", reviews: "134件" },
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-sm">
      <AnimatePresence mode="wait">
        {status === "input" && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mb-3">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">S</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">スプレッドシート（リサーチ対象リスト）</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs text-gray-400 mb-1 px-2">
                <span>A列：クリニック名</span>
                <span className="text-gray-300">B〜F列：（空欄）</span>
              </div>
              {inputNames.map((name) => (
                <div key={name} className="grid grid-cols-2 gap-1 text-xs border border-gray-200 rounded px-2 py-1.5 mb-1 bg-gray-50">
                  <span className="text-charcoal font-medium">{name}</span>
                  <span className="text-gray-200 text-xs">（未取得）</span>
                </div>
              ))}
            </div>
            <button onClick={handleFetch}
              className="w-full bg-yellow-primary text-charcoal text-xs font-bold py-2 rounded-lg hover:bg-yellow-dark hover:text-white transition-colors">
              ▶ Google Maps API で情報を取得する
            </button>
          </motion.div>
        )}

        {status === "fetching" && (
          <motion.div key="fetching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="py-6 text-center">
            <p className="text-gray-400 text-xs mb-1">Google Maps API でリサーチ中...</p>
            <p className="text-gray-300 text-xs">クリニック名 → 住所・評価・口コミ数を取得しています</p>
          </motion.div>
        )}

        {status === "done" && (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">S</span>
              </div>
              <span className="text-xs font-semibold text-gray-500">スプレッドシート（取得結果を自動書き込み）</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-xs text-gray-400 mb-1 px-2">
              <span>クリニック名</span><span>住所</span><span className="text-center">評価 / 口コミ</span>
            </div>
            {resultRows.map((row, i) => (
              <motion.div key={row.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.35 }}
                className="grid grid-cols-3 gap-1 text-xs bg-green-50 border border-green-200 rounded px-2 py-1.5 mb-1 items-center">
                <span className="text-charcoal font-medium truncate">{row.name}</span>
                <span className="text-gray-500 truncate">{row.address}</span>
                <span className="text-center">
                  <span className="text-yellow-dark font-bold">★{row.rating}</span>
                  <span className="text-gray-400 ml-1">{row.reviews}</span>
                </span>
              </motion.div>
            ))}
            <div className="flex items-center justify-between mt-2">
              <p className="text-green-600 text-xs">✓ Sheetsへの書き込み完了（{resultRows.length}件）</p>
              <button onClick={handleReset} className="text-xs text-yellow-dark hover:underline">← リセット</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Spotlight 03：天気予報 LINE通知ボットのデモUI
// ─────────────────────────────────────────────────────────────────
function LineDemo() {
  const [status, setStatus] = useState<"settings" | "sending" | "done">("settings");
  const CITIES = ["福岡市", "東京都", "大阪市", "名古屋市", "札幌市"];
  const TIMES  = ["06:00", "07:00", "08:00", "12:00", "18:00"];
  const [city, setCity] = useState("福岡市");
  const [time, setTime] = useState("07:00");

  const handleSave  = () => { setStatus("sending"); setTimeout(() => setStatus("done"), 1200); };
  const handleReset = () => setStatus("settings");

  const forecast = [
    { time: time,      weather: "☁️ 曇りがち",      temp: "16°C", humidity: "77%", wind: "2.9m/s" },
    { time: "3時間後",  weather: "⛅ 曇り時々晴れ",  temp: "18°C", humidity: "70%", wind: "3.1m/s" },
    { time: "6時間後",  weather: "🌤️ 晴れ時々曇り", temp: "15°C", humidity: "65%", wind: "2.5m/s" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-sm overflow-hidden">
      <AnimatePresence mode="wait">
        {status === "settings" && (
          <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">⚙️</span>
              <p className="text-xs font-bold text-charcoal">通知設定ダイアログ</p>
              <span className="ml-auto text-xs text-gray-400">自由に変更できます</span>
            </div>
            <div className="mb-3">
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">📍 通知する地域</label>
              <div className="flex flex-wrap gap-1.5">
                {CITIES.map((c) => (
                  <button key={c} onClick={() => setCity(c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150
                      ${city === c ? "bg-yellow-primary text-charcoal border-yellow-primary" : "bg-gray-50 text-gray-500 border-gray-200 hover:border-yellow-primary"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">⏰ 毎日の送信時間</label>
              <div className="flex flex-wrap gap-1.5">
                {TIMES.map((t) => (
                  <button key={t} onClick={() => setTime(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150 font-en
                      ${time === t ? "bg-yellow-primary text-charcoal border-yellow-primary" : "bg-gray-50 text-gray-500 border-gray-200 hover:border-yellow-primary"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-yellow-light border border-yellow-primary/30 rounded-lg px-3 py-2 mb-4 text-xs text-yellow-dark">
              毎日 <span className="font-bold">{time}</span> に <span className="font-bold">{city}</span> の天気をLINEに送信します
            </div>
            <button onClick={handleSave}
              className="w-full bg-yellow-primary text-charcoal text-xs font-bold py-2.5 rounded-lg hover:bg-yellow-dark hover:text-white transition-colors">
              この設定で通知を開始する
            </button>
          </motion.div>
        )}

        {status === "sending" && (
          <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="p-5 py-10 text-center">
            <p className="text-gray-400 text-xs">OpenWeatherMap API から取得中...</p>
            <p className="text-gray-300 text-xs mt-1">{city} の天気情報を取得しています</p>
          </motion.div>
        )}

        {status === "done" && (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <div className="w-7 h-7 rounded-full bg-[#06C755] flex items-center justify-center text-white text-xs font-bold">LINE</div>
              <span className="text-xs font-bold text-charcoal">天気予報BOT</span>
              <span className="ml-auto text-gray-400 text-xs font-en">{time}</span>
            </div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm mb-3">
              <p className="font-bold text-charcoal text-xs mb-2">📍 {city}　今日の天気予報</p>
              <div className="border-t border-gray-100 pt-2 space-y-2">
                {forecast.map((f, i) => (
                  <motion.div key={f.time} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.25 }} className="text-xs text-gray-700 space-y-0.5">
                    <p className="font-semibold">⏰ {f.time}</p>
                    <p>{f.weather}</p>
                    <p className="text-gray-400">🌡️ {f.temp}　💧 {f.humidity}　💨 {f.wind}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="flex items-center justify-between">
              <p className="text-green-600 text-xs">✓ LINEに送信しました</p>
              <button onClick={handleReset} className="text-xs text-yellow-dark hover:underline">← 設定を変える</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Spotlight 04：備品管理システムのデモUI
// 実際の流れ：在庫数を記録 → 閾値を下回るとアラート → 経理が発注 → 納品で在庫に反映
// ─────────────────────────────────────────────────────────────────
function InventoryDemo() {
  // "list"=在庫一覧, "alert"=アラート発生・発注前, "done"=発注→納品→在庫反映
  const [phase, setPhase] = useState<"list" | "alert" | "done">("list");

  // 通常時の在庫データ（使用前）
  const normalItems = [
    { name: "コピー用紙",        stock: 8,  threshold: 5,  unit: "箱" },
    { name: "ボールペン",         stock: 20, threshold: 10, unit: "本" },
    { name: "トナーカートリッジ", stock: 4,  threshold: 3,  unit: "本" },
  ];

  // コピー用紙 6箱使用後（アラート発生状態）
  const alertItems = [
    { name: "コピー用紙",        stock: 2,  threshold: 5,  unit: "箱" }, // ⚠️ 閾値以下
    { name: "ボールペン",         stock: 20, threshold: 10, unit: "本" },
    { name: "トナーカートリッジ", stock: 4,  threshold: 3,  unit: "本" },
  ];

  // 発注→納品後（コピー用紙 10箱入荷で在庫反映）
  const restoredItems = [
    { name: "コピー用紙",        stock: 12, threshold: 5,  unit: "箱" }, // 2 + 10箱 = 12箱
    { name: "ボールペン",         stock: 20, threshold: 10, unit: "本" },
    { name: "トナーカートリッジ", stock: 4,  threshold: 3,  unit: "本" },
  ];

  // ステータスに応じて表示する在庫データを切り替える
  const currentItems =
    phase === "list"  ? normalItems  :
    phase === "alert" ? alertItems   :
    restoredItems;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-sm overflow-hidden">

      {/* Webアプリ風のウィンドウバー */}
      <div className="bg-charcoal px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-gray-400 text-xs ml-2">備品管理システム</span>
        <span className="ml-auto text-xs text-yellow-primary font-bold">🤖 Claude Code</span>
      </div>

      <AnimatePresence mode="wait">

        {/* ── Phase 1：在庫一覧（正常時） ─────────────────── */}
        {phase === "list" && (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
            <p className="text-xs font-bold text-charcoal mb-3">📦 在庫一覧</p>

            {/* テーブルヘッダー */}
            <div className="grid grid-cols-4 text-xs text-gray-400 mb-1 px-2">
              <span className="col-span-2">品名</span>
              <span className="text-center">在庫 / 閾値</span>
              <span className="text-right">状態</span>
            </div>

            {/* 在庫リスト */}
            {normalItems.map((item) => {
              const isLow = item.stock <= item.threshold;
              return (
                <div key={item.name}
                  className={`grid grid-cols-4 items-center rounded px-2 py-2 mb-1 border
                    ${isLow ? "bg-yellow-light border-yellow-primary/30" : "bg-gray-50 border-gray-200"}`}>
                  <span className="col-span-2 text-xs font-medium text-charcoal">{item.name}</span>
                  <span className="text-center text-xs font-en">
                    <span className={`font-bold ${isLow ? "text-yellow-dark" : "text-charcoal"}`}>{item.stock}</span>
                    <span className="text-gray-300"> / {item.threshold}{item.unit}</span>
                  </span>
                  <div className="text-right">
                    {isLow
                      ? <span className="text-xs bg-yellow-primary text-charcoal px-1.5 py-0.5 rounded font-bold">残少⚠</span>
                      : <span className="text-xs text-green-600">正常</span>
                    }
                  </div>
                </div>
              );
            })}

            {/* 使用を記録するボタン */}
            <button onClick={() => setPhase("alert")}
              className="w-full mt-3 bg-charcoal text-white text-xs font-bold py-2 rounded-lg hover:bg-gray-700 transition-colors">
              コピー用紙 6箱 の使用を記録する
            </button>
            <p className="text-gray-300 text-xs text-center mt-1.5">▲ 使用記録を押すと在庫が減ります</p>
          </motion.div>
        )}

        {/* ── Phase 2：使用後 → アラート発生 → 発注依頼 ─── */}
        {phase === "alert" && (
          <motion.div key="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">

            {/* 在庫アラートバナー */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-300 rounded-lg px-3 py-2 mb-3 flex items-start gap-2">
              <span className="text-red-500 text-sm mt-0.5">⚠️</span>
              <div>
                <p className="text-xs font-bold text-red-600">在庫アラート自動通知</p>
                <p className="text-xs text-red-500">コピー用紙 が閾値（5箱）を下回りました → 経理へ通知済み</p>
              </div>
            </motion.div>

            {/* 更新後の在庫 */}
            <div className="grid grid-cols-4 text-xs text-gray-400 mb-1 px-2">
              <span className="col-span-2">品名</span>
              <span className="text-center">在庫 / 閾値</span>
              <span className="text-right">状態</span>
            </div>
            {alertItems.map((item) => {
              const isAlert = item.stock <= item.threshold;
              return (
                <div key={item.name}
                  className={`grid grid-cols-4 items-center rounded px-2 py-2 mb-1 border
                    ${isAlert ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}`}>
                  <span className="col-span-2 text-xs font-medium text-charcoal">{item.name}</span>
                  <span className="text-center text-xs font-en">
                    <span className={`font-bold ${isAlert ? "text-red-600" : "text-charcoal"}`}>{item.stock}</span>
                    <span className="text-gray-300"> / {item.threshold}{item.unit}</span>
                  </span>
                  <div className="text-right">
                    {isAlert
                      ? <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">要発注</span>
                      : <span className="text-xs text-green-600">正常</span>
                    }
                  </div>
                </div>
              );
            })}

            {/* 発注依頼ボタン */}
            <button onClick={() => setPhase("done")}
              className="w-full mt-3 bg-yellow-primary text-charcoal text-xs font-bold py-2 rounded-lg hover:bg-yellow-dark hover:text-white transition-colors">
              📋 発注依頼を送る → 納品後に在庫へ反映
            </button>
          </motion.div>
        )}

        {/* ── Phase 3：発注 → 納品 → 在庫反映 ────────────── */}
        {phase === "done" && (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">

            {/* 発注→納品フロー */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {["発注依頼", "経理確認", "納品完了"].map((step, i) => (
                <motion.div key={step} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.25 }} className="flex items-center gap-1.5">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ {step}</span>
                  {i < 2 && <span className="text-gray-300 text-xs">→</span>}
                </motion.div>
              ))}
            </div>

            {/* 更新後の在庫（コピー用紙が補充された状態） */}
            <div className="grid grid-cols-4 text-xs text-gray-400 mb-1 px-2">
              <span className="col-span-2">品名</span>
              <span className="text-center">在庫 / 閾値</span>
              <span className="text-right">状態</span>
            </div>
            {restoredItems.map((item, i) => {
              const isRestocked = item.name === "コピー用紙";
              return (
                <motion.div key={item.name} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 + 0.5 }}
                  className={`grid grid-cols-4 items-center rounded px-2 py-2 mb-1 border
                    ${isRestocked ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                  <span className="col-span-2 text-xs font-medium text-charcoal">{item.name}</span>
                  <span className="text-center text-xs font-en">
                    <span className={`font-bold ${isRestocked ? "text-green-700" : "text-charcoal"}`}>
                      {item.stock}{isRestocked ? " ↑" : ""}
                    </span>
                    <span className="text-gray-300"> / {item.threshold}{item.unit}</span>
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-green-600">正常</span>
                  </div>
                </motion.div>
              );
            })}

            <p className="text-green-600 text-xs text-center mt-2">✓ 納品反映・在庫データ更新完了</p>
            <button onClick={() => setPhase("list")} className="w-full mt-2 text-xs text-yellow-dark hover:underline text-center">
              ← 在庫一覧に戻る
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Spotlight の各カードデータ定義
// ─────────────────────────────────────────────────────────────────
const SPOTLIGHTS = [
  {
    number: "01",
    title: "楽天市場 価格チェッカー",
    description: "楽天APIで商品の最安値・平均・最高価格を自動収集しCSVに保存。非エンジニア向けにexe化・GUI実装まで対応。",
    techs: ["Python", "requests", "tkinter", "PyInstaller"],
    githubUrl: "https://github.com/eriko-mahalo0917/ec_price_checker",
    featured: false,
    demo: <RakutenDemo />,
  },
  {
    number: "02",
    title: "クリニック情報リサーチツール",
    description: "スプレッドシートのクリニック名リストをバッチ処理で一括取得。Google Maps APIで住所・評価・口コミ数を自動リサーチし、Sheetsへ書き戻す。OAuthサービスアカウント認証で複数API連携を実現。",
    techs: ["Python", "Google Maps API", "Google Sheets API", "pandas"],
    githubUrl: "https://github.com/eriko-mahalo0917/dental-clinic-research",
    featured: false,
    demo: <ClinicDemo />,
  },
  {
    number: "03",
    title: "天気予報 LINE通知ボット",
    description: "OpenWeatherMap APIで福岡市の天気を取得し、毎日指定時刻にLINEへ自動送信。schedule ライブラリでバックグラウンド常時稼働。実際に毎日動いているツール。",
    techs: ["Python", "OpenWeatherMap API", "LINE Messaging API", "schedule"],
    githubUrl: "https://github.com/eriko-mahalo0917/weather_notify_bot",
    featured: false,
    demo: <LineDemo />,
  },
  {
    number: "04",
    title: "備品管理システム",
    description: "オフィスの備品在庫を一元管理するフルスタックWebアプリ。使用記録で在庫が減り、閾値を下回ると自動アラート。経理が発注し、納品があれば在庫に即反映。要件定義から実装までClaude Codeとペアプログラミングで構築。",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "Claude Code"],
    githubUrl: "https://github.com/eriko-mahalo0917/office-inventory-system",
    featured: true,
    demo: <InventoryDemo />,
  },
];

export default function Spotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-32 px-6">
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
            Spotlight
          </p>
          <h2 className="text-5xl font-black text-charcoal">代表作ピックアップ</h2>
        </motion.div>

        {/* Spotlight カード */}
        <div className="flex flex-col gap-24">
          {SPOTLIGHTS.map((item, index) => (
            <motion.div
              key={item.number}
              className={`
                grid grid-cols-1 sm:grid-cols-2 gap-8 items-start
                ${item.featured
                  ? "bg-gradient-to-br from-yellow-light/40 to-white border border-yellow-primary/30 rounded-2xl p-8 -mx-4 sm:-mx-8 shadow-sm"
                  : "border-l-4 border-yellow-primary pl-6"
                }
              `}
              // スクロールアニメーションを左右交互にすることでリズムを出す
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* テキスト情報（偶数番目カードは右側に配置） */}
              <div className={index % 2 === 1 ? "sm:order-2" : ""}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-yellow-primary font-en font-bold text-sm">
                    Spotlight {item.number}
                  </span>
                  {/* Claude Code 製バッジ：ボーダーベースで馴染ませる */}
                  {item.featured && (
                    <span className="text-xs border border-yellow-primary/60 text-yellow-dark font-semibold px-2.5 py-0.5 rounded-full bg-yellow-light">
                      🤖 Built with Claude Code
                    </span>
                  )}
                </div>
                {/* タイトル・説明は全カード共通スタイルで統一 */}
                <h3 className="text-xl font-bold mt-1 mb-3 text-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 text-gray-600">
                  {item.description}
                </p>

                {/* 使用技術タグ（全カード統一スタイル、Claude Code タグのみ強調） */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.techs.map((tech) => (
                    <span key={tech}
                      className={`px-3 py-1 text-xs font-medium rounded-full border
                        bg-yellow-light text-yellow-dark border-yellow-primary/30
                        ${tech === "Claude Code" ? "font-bold border-yellow-primary/60" : ""}
                      `}>
                      {tech === "Claude Code" ? "🤖 " + tech : tech}
                    </span>
                  ))}
                </div>

                {/* GitHubリンク */}
                <a href={item.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors text-charcoal hover:text-yellow-primary">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub を見る
                </a>
              </div>

              {/* インタラクティブなデモUI（偶数番目カードは左側に配置） */}
              <div className={index % 2 === 1 ? "sm:order-1" : ""}>
                {item.demo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
