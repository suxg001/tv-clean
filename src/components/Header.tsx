import Link from "next/link";
import { siteConfig } from "@/lib/data";

const nav = [
  { href: "/brands", label: "按品牌查" },
  { href: "/models", label: "按型号查" },
  { href: "/method", label: "方法总览" },
  { href: "/restore", label: "还原与风险" },
  { href: "/unsupported", label: "不支持的系统" },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-slate-900">
          📺 {siteConfig.name}
        </Link>
        <nav className="flex gap-4 text-sm text-slate-600">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-slate-900">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
