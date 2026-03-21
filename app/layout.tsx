import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "木更津クリニック開業",
  description: "岩本クリニック開業計画 夫婦共有版",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "木更津開業",
  },
  themeColor: "#1e40af",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-slate-50 min-h-screen">{children}</body>
    </html>
  );
}
