import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

export const metadata: Metadata = {
  title: "Comet Chat",
  description: "Minimalist, real-time messaging application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
