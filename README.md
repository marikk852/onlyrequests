# Тест: Подходит ли вам онлайн-работа?

Одностраничное приложение на Next.js (App Router) с Tailwind CSS и Framer Motion.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Интеграция с Telegram

Для отправки результатов теста в Telegram создайте файл `.env.local` в корне проекта:

```
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=id_чата_для_получения_сообщений
```

- **TELEGRAM_BOT_TOKEN** — токен бота от [@BotFather](https://t.me/BotFather)
- **TELEGRAM_CHAT_ID** — ID чата или пользователя, куда отправлять результаты (можно узнать через [@userinfobot](https://t.me/userinfobot))

После прохождения теста результаты автоматически отправляются в указанный чат.
