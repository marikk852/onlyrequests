"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS } from "@/data/questions";
import { sendResultsToTelegram, type SurveyAnswer } from "@/app/actions/telegram";
import Confetti from "./Confetti";

type Screen = "start" | "survey" | "finish";

export default function SurveyApp() {
  const [screen, setScreen] = useState<Screen>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [contactInput, setContactInput] = useState("");
  const [contactError, setContactError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleStartTest = () => {
    setScreen("survey");
    setCurrentQuestion(0);
    setAnswers([]);
    setContactInput("");
    setContactError("");
  };

  const handleAnswer = (option: string) => {
    const question = QUESTIONS[currentQuestion];
    if (!question.options) return;

    const newAnswer: SurveyAnswer = {
      questionIndex: currentQuestion,
      question: question.text,
      answer: option,
    };
    setAnswers((prev) => [...prev, newAnswer]);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setScreen("finish");
      sendToTelegram([...answers, newAnswer]);
    }
  };

  const handleContactSubmit = () => {
    const trimmed = contactInput.trim();
    if (!trimmed) {
      setContactError("Будь ласка, вкажіть ваш Telegram або WhatsApp");
      return;
    }

    const question = QUESTIONS[currentQuestion];
    const newAnswer: SurveyAnswer = {
      questionIndex: currentQuestion,
      question: question.text,
      answer: trimmed,
    };
    setAnswers((prev) => [...prev, newAnswer]);
    setScreen("finish");
    sendToTelegram([...answers, newAnswer]);
  };

  const sendToTelegram = async (allAnswers: SurveyAnswer[]) => {
    setIsSending(true);
    await sendResultsToTelegram(allAnswers);
    setIsSending(false);
  };

  const currentItem = QUESTIONS[currentQuestion];
  const isContactField = currentItem?.isContactField;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-gray-800">
      {screen === "finish" && <Confetti />}

      <AnimatePresence mode="wait">
        {screen === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl text-center space-y-12"
          >
            <motion.p
              className="text-xl md:text-2xl text-[#006266] px-6 py-4 rounded-2xl glossy-neutral"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Бажаєте дізнатися, чи підходить вам онлайн-робота?
            </motion.p>

            <motion.button
              onClick={handleStartTest}
              className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 text-lg font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105 active:scale-100"
              style={{
                background: "linear-gradient(135deg, #FF7675 0%, #e86a69 100%)",
                boxShadow: "0 4px 24px rgba(255, 118, 117, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                border: "1px solid rgba(255, 118, 117, 0.6)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Пройти тест
            </motion.button>
          </motion.div>
        )}

        {screen === "survey" && (
          <motion.div
            key="survey"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl space-y-8"
          >
            <div className="mb-2 text-sm text-[#006266]/70">
              {currentQuestion + 1} з {QUESTIONS.length}
            </div>

            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl glossy-question"
            >
              <p className="text-lg md:text-xl font-medium text-[#006266]">
                {currentItem.text}
              </p>
            </motion.div>

            {isContactField ? (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <input
                    type="text"
                    value={contactInput}
                    onChange={(e) => {
                      setContactInput(e.target.value);
                      setContactError("");
                    }}
                    placeholder="@username або +380..."
                    className="w-full p-5 rounded-xl glossy-answer text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7675]/50 focus:border-[#FF7675]/70 transition-all"
                  />
                  {contactError && (
                    <p className="text-sm text-red-400">{contactError}</p>
                  )}
                </motion.div>
                <motion.button
                  onClick={handleContactSubmit}
                  className="w-full p-5 rounded-xl text-white font-semibold transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #FF7675 0%, #e86a69 100%)",
                    boxShadow: "0 4px 24px rgba(255, 118, 117, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255, 118, 117, 0.6)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Надіслати
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                {currentItem.options?.map((option, idx) => (
                  <motion.button
                    key={`${currentQuestion}-${idx}`}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-5 text-left rounded-xl glossy-answer text-gray-800 font-medium hover:opacity-90 transition-opacity duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + idx * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {screen === "finish" && (
          <motion.div
            key="finish"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl text-center relative z-20"
          >
            <div className="p-8 md:p-12 rounded-2xl glossy-neutral">
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-[#006266] mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Вітаємо! Ваша анкета прийнята.
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                З вами скоро зв'яжеться менеджер у Telegram/WhatsApp та розповість деталі співпраці.
              </motion.p>
              {isSending && (
                <motion.p
                  className="mt-4 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Надсилання результатів...
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
