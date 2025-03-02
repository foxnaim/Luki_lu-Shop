import { getSession } from "@/app/components/lib/auth";
import { signOut } from "next-auth/react";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="p-4 bg-darkBg text-lightGray flex justify-between">
      <h1 className="text-xl font-bold">Luki_Lu Store</h1>
      {session ? (
        <div className="flex items-center gap-4">
          <span>Привет, {session.user?.name || "Пользователь"}!</span>
          <button onClick={() => signOut()} className="p-2 bg-neonPink rounded">Выйти</button>
        </div>
      ) : (
        <a href="/auth/login" className="p-2 bg-mint rounded">Войти</a>
      )}
    </header>
  );
}
