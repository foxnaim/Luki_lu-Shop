import { prisma } from "@/app/components/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Проверяем, есть ли уже такой пользователь
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Пользователь уже существует" }, { status: 400 });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ message: "Пользователь создан", user: newUser });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
