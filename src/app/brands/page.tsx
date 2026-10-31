import type { Metadata } from "next";
import Link from "next/link";
import { brands, otherBrands, moreBrandNames, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "品牌索引｜电视去广告指南",
  description: "按品牌查电视去广告实测清单：TCL、小米、索尼、飞利浦、创维、海信等，份数来自 CleanYourTV 官方 examples 清单。",
};

export default function BrandsIndex() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-slate-900">品牌索引</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        以下份数是各品牌在 CleanYourTV 官方 examples 里由用户贡献并实测过的机型清单数量（2026-10-30 核对）。
        份数多，说明同品牌可参考的现成清单多；份数少或没找到你的型号，不代表一定不能做——只是需要走通用识别流程，且每一步更要小心。
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <Link key={b.slug} href={`/brands/${b.slug}`} className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow">
            <p className="flex items-baseline justify-between">
              <span className="font-semibold text-slate-900">{b.name}</span>
              <span className="text-sm text-sky-700">{b.testedLists} 份清单</span>
            </p>
            <p className="mt-1 text-sm text-slate-600">{b.systems}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold text-slate-900">其他有清单的品牌</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {otherBrands.map((b) => (
          <li key={b.name} className="rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
            {b.name} · {b.count} 份
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-slate-500">{moreBrandNames}</p>
      <p className="mt-4 text-sm text-slate-600">
        查你的完整型号：到{" "}
        <a className="text-sky-700 underline" href={`${siteConfig.repo}/tree/main/examples`} target="_blank" rel="noreferrer">
          官方 examples 目录
        </a>{" "}
        按型号检索；官方站点也有可搜索的机型页（cleanyour.tv/tvs）。
      </p>
    </div>
  );
}
