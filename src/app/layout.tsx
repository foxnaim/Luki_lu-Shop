"use client";
import { Provider } from "react-redux";
import { store } from "@/app/components/store";

import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    <html lang="ru-kz-">
      <body>{children}</body>
    </html>
  </Provider>
  );
}
