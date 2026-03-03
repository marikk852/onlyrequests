"use server";

export interface SurveyAnswer {
  questionIndex: number;
  question: string;
  answer: string;
}

export async function sendResultsToTelegram(answers: SurveyAnswer[]): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      success: false,
      error: "TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID должны быть заданы в переменных окружения",
    };
  }

  const message = formatTelegramMessage(answers);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      return {
        success: false,
        error: data.description || "Ошибка отправки в Telegram",
      };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Неизвестная ошибка";
    return { success: false, error: message };
  }
}

function formatTelegramMessage(answers: SurveyAnswer[]): string {
  const lines = [
    "📋 <b>Новые результаты теста</b>",
    "",
    "Ответы пользователя:",
    ...answers.map(
      (a, i) => `${i + 1}. <b>${escapeHtml(a.question)}</b>\n   → ${escapeHtml(a.answer)}`
    ),
  ];
  return lines.join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
