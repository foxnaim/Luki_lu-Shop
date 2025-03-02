"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, registerUser } from "./authSlice";
import { motion } from "framer-motion";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setError("");
    if (tab === "login") {
      if (!email || !password) return setError("Заполните все поля");
      dispatch(login({ email, password }));
    } else {
      if (!name || !email || !password) return setError("Заполните все поля");
      dispatch(registerUser({ name, email, password }));
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
        {/* Закрытие */}
        <button className="absolute top-4 right-6 text-lightGray text-xl" onClick={onClose}>
          ✕
        </button>

        {/* Табы */}
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

        {/* Форма */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {tab === "register" && (
            <input
              type="text"
              placeholder="Имя"
              className="w-full p-2 mb-3 bg-gray-800 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
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
      </motion.div>
    </div>
  );
}
