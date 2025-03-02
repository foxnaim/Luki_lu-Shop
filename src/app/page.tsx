"use client"; // Указываем, что компонент только для клиента

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuthModal from "./pages/auth/AuthModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 💡 Избегаем SSR-проблем

  return (
    <main className="min-h-screen bg-darkBg text-lightGray flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold text-white"
      >
        Luki_Lu Store
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg mt-4 text-center"
      >
        Эксклюзивные кроссовки для твоего стиля
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="mt-6 bg-neonBlue text-darkBg px-6 py-3 rounded-lg text-lg font-semibold transition"
      >
        Войти / Регистрация
      </motion.button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
