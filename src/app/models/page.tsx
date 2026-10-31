import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/data";
import { models, type Model } from "@/lib/models";

export const metadata: Metadata = {
  title: "型号库｜电视去广告指南",
  description:
    "按完整型号查电视去广告教程：收录 CleanYourTV 官方 examples 中全部有实测清单的机型，每个型号一页，含清单条数、系统与操作要点。清单里没有的型号本站不建页、不声称支持。",
};

interface Group {
  label: string;
  href: string | null;
  items: Model[];
}

function groupLabel(m: Model): { label: string; href: string | null } {
  if (m.siteBrand) {
    const b = brands.find((x) => x.slug === m.siteBrand);
    if (b) return { label: b.name, href: `/brands/${b.slug}` };
  }
  return { label: m.brand, href: null };
}

export default function ModelsIndex() {
  const map = new Map<string, Group>();
  for (const m of models) {
    const { label, href } = groupLabel(m);
    const g = map.get(label) ?? { label, href, items: [] };
    g.items.push(m);
    map.set(label, g);
  }
  const groups = [...map.values()].sort((a, b) => b.items.length - a.items.length || a.label.localeCompare(b.label));

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-slate-900">型号库：按完整型号查去广告教程</h1>
      <p className="mt-2 max-w-3xl leading-relaxed text-slate-600">
        这里收录的 {models.length} 个型号，全部出自 CleanYourTV 官方 examples
        的实测清单——有人在对应固件上真机跑过、清单才会被收进来。清单里没有的型号本站不建页，也不要拿相近型号的清单硬套：
        同一系列不同年份、不同地区固件的包名都可能不一样。
      </p>

      {groups.map((g) => (
        <section key={g.label} className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">
            {g.href ? (
              <Link href={g.href} className="hover:text-sky-700">
                {g.label}
              </Link>
            ) : (
              g.label
            )}{" "}
            <span className="text-sm font-normal text-slate-500">{g.items.length} 个型号</span>
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/models/${m.slug}`}
                  className="flex items-baseline justify-between gap-2 rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:shadow"
                >
                  <span>{m.name}</span>
                  <span className="shrink-0 text-xs text-slate-400">{m.debloatCount} 条</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-10 text-sm text-slate-600">
        先确认自家电视的系统与完整型号（设置 → 关于），再对号入座。不确定从哪下手，先看{" "}
        <Link href="/method" className="text-sky-700 underline">
          方法总览
        </Link>
        ；系统不在支持范围内的，看{" "}
        <Link href="/unsupported" className="text-sky-700 underline">
          不支持的系统
        </Link>
        。
      </p>
    </div>
  );
}
