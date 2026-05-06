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

## Meta (Facebook) Pixel

Чтобы включить Pixel, задайте переменную окружения `NEXT_PUBLIC_META_PIXEL_ID`:

- в **Vercel**: Project → Settings → Environment Variables → добавьте `NEXT_PUBLIC_META_PIXEL_ID`
- локально: в `.env.local` (можно взять шаблон из `.env.local.example`)

```
NEXT_PUBLIC_META_PIXEL_ID=ваш_pixel_id
```

Что трекается:
- **PageView** — автоматически при открытии страницы
- **Lead** — только после того, как пользователь указал контакт (Telegram/WhatsApp/телефон) и отправка результатов в Telegram завершилась успешно
