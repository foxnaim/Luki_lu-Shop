import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/components/lib/mongodb";
import { User } from "@/app/components/models/User";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Пользователь уже существует" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "Успешная регистрация" }, { status: 201 });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
