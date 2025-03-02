import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // ✅ Импортируем CredentialsProvider
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/components/lib/mongodb";
import { User } from "@/app/components/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Введите email и пароль");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Пользователь не найден");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Неверный пароль");
        }

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async redirect() {
      return "/auth"; // Перенаправление после входа
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
