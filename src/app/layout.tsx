import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}｜${siteConfig.slogan}`,
    template: "%s",
  },
  description: siteConfig.description,
  keywords: ["电视去广告", "电视关闭广告", "CleanYourTV", "小米电视去广告", "TCL电视去广告", "电视干净桌面"],
  openGraph: {
    title: `${siteConfig.name}｜${siteConfig.slogan}`,
    description: siteConfig.description,
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#f7faf9] font-sans text-slate-800 antialiased">
        <Header />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
