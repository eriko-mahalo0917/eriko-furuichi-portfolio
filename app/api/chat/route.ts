// app/api/chat/route.ts：ChatBot用のAPIエンドポイント
// フロントエンドからメッセージを受け取り、Claude APIを呼び出して回答を返す
//
// ⚠️ ANTHROPIC_API_KEY が未設定の場合はモック（仮）モードで動作する
//    → APIキーを .env.local に設定すると本番モードになる

import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/lib/systemPrompt";

// モックモード用：キーワードに応じた仮の回答を返す
// APIキーが取得できるまでの確認用
function getMockReply(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("ツール") || msg.includes("制作") || msg.includes("作り")) {
    return "Pythonで5本のツールを開発しました！\n① 楽天市場 価格チェッカー\n② クリニック情報リサーチツール\n③ 天気予報 LINE通知ボット\n④ 書籍データ スクレイピングツール\n⑤ ブラウザ自動ログインツール\n\nGitHubでコードを公開しています😊";
  }
  if (msg.includes("スキル") || msg.includes("技術") || msg.includes("できる")) {
    return "主なスキルはこちらです！\n• Python（独学8ヶ月）\n• 外部API連携（楽天・Google Maps・LINE・OpenWeatherMap）\n• 生成AI活用（Claude・NotebookLM・Gemini）\n• Selenium / BeautifulSoup4\n• TypeScript / Next.js（学習中）";
  }
  if (msg.includes("経験") || msg.includes("経歴") || msg.includes("仕事")) {
    return "健康食品通販会社でチーフとして12年勤務しました。\nバックオフィス業務全般・基幹システム刷新・生成AI導入・業務改善を推進してきました。現場のリアルな課題をよく知っています💪";
  }
  if (msg.includes("転職") || msg.includes("採用") || msg.includes("hire")) {
    return "はい、転職活動中です！\nバックオフィス12年の現場経験 × Pythonによる業務自動化をベースに、エンジニアとして活躍できる環境を探しています。ぜひGitHubもご覧ください😊";
  }
  if (msg.includes("こんにちは") || msg.includes("hello") || msg.includes("はじめまして")) {
    return "こんにちは！古市絵梨子のポートフォリオへようこそ😊\nスキル・経歴・制作物など、気になることを何でも聞いてください！";
  }

  // どのキーワードにも合致しなかった場合のデフォルト回答
  return "ありがとうございます！スキル・経歴・制作物など、気になることを何でも聞いてください😊\n（現在デモモードで動作中。APIキー設定後に本格稼働します）";
}

// POSTリクエストを受け取って処理するハンドラー関数
export async function POST(request: Request) {
  const { message } = await request.json();

  // メッセージが空の場合はエラーを返す
  if (!message || typeof message !== "string") {
    return Response.json({ error: "メッセージが空です" }, { status: 400 });
  }

  // ANTHROPIC_API_KEY が設定されていない場合はモックモードで動作する
  if (!process.env.ANTHROPIC_API_KEY) {
    // 少し待機してAPIを呼び出しているように見せる（UX向上のため）
    await new Promise((resolve) => setTimeout(resolve, 800));
    return Response.json({ reply: getMockReply(message) });
  }

  // APIキーがある場合は Claude API を呼び出す（本番モード）
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: message }],
  });

  const reply = response.content[0];

  if (reply.type !== "text") {
    return Response.json({ error: "回答を取得できませんでした" }, { status: 500 });
  }

  return Response.json({ reply: reply.text });
}
