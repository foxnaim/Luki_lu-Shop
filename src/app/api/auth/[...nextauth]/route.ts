import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/components/lib/mongodb";
import { User } from "@/app/components/models/User";

export const authOptions: NextAuthOptions = {
  debug: true, // Включает детальный лог в консоли
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        console.log("🟢 Началась авторизация...");
        await connectDB();
        console.log("✅ БД подключена!");

        if (!credentials?.email || !credentials?.password) {
          throw new Error("❌ Введите email и пароль");
        }

        const user = await User.findOne({ email: credentials.email });
        console.log("👤 Найденный пользователь:", user);

        if (!user) {
          throw new Error("❌ Пользователь не найден");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        console.log("🔑 Пароль корректный?", isValid);

        if (!isValid) {
          throw new Error("❌ Неверный пароль");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.email.split("@")[0], // Имя берётся из email
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("🔀 Перенаправление на:", url || baseUrl || "/");
      return url || baseUrl || "/";
    },
    async session({ session, token }) {
      console.log("🟡 Создание сессии:", token);

      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
