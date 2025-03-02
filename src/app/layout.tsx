"use client";
import { Provider } from "react-redux";
import { store } from "@/app/components/store";
import { SessionProvider } from "next-auth/react";

import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    <html lang="ru-kz-">
      <body><SessionProvider>{children}</SessionProvider></body>
    </html>
  </Provider>
  );
}
