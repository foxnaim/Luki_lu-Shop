import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@/app/components/lib/auth"; // Вынесем логику в `auth.ts`

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
