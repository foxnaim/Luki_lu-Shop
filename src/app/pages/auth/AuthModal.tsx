"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { data: session } = useSession();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) return setError("Заполните все поля");

    if (tab === "login") {
      const res = await signIn("credentials", { redirect: false, email, password });
      if (res?.error) setError("Ошибка входа");
    } else {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error("Ошибка регистрации");
        await signIn("credentials", { redirect: false, email, password });
      } catch (err) {
        setError("Ошибка регистрации");
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-darkBg p-6 rounded-lg w-96 text-center shadow-xl relative"
      >
        <button className="absolute top-4 right-6 text-lightGray text-xl" onClick={onClose}>
          ✕
        </button>

        {session ? (
          <div>
            <p className="text-lightGray mb-4">Привет, {session.user?.email}</p>
            <button className="w-full bg-red-500 p-2 rounded text-white font-semibold" onClick={() => signOut()}>
              Выйти
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-4 mb-4">
              <button
                className={`py-2 px-4 ${tab === "login" ? "border-b-2 border-neonBlue" : ""}`}
                onClick={() => setTab("login")}
              >
                Вход
              </button>
              <button
                className={`py-2 px-4 ${tab === "register" ? "border-b-2 border-neonBlue" : ""}`}
                onClick={() => setTab("register")}
              >
                Регистрация
              </button>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-3 bg-gray-800 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Пароль"
                className="w-full p-2 mb-3 bg-gray-800 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500">{error}</p>}
              <button className="w-full bg-neonBlue p-2 rounded text-darkBg font-semibold" onClick={handleSubmit}>
                {tab === "login" ? "Войти" : "Зарегистрироваться"}
              </button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
