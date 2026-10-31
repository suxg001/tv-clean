import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, siteConfig } from "@/lib/data";
import { modelsByBrand } from "@/lib/models";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = brands.find((x) => x.slug === slug);
  if (!b) return {};
  return {
    title: `${b.name}电视去广告｜电视去广告指南`,
    description: `${b.name}（${b.nameEn}）电视去广告方法：官方实测清单 ${b.testedLists} 份，适用系统 ${b.systems}。原理、步骤、还原与注意事项。`,
  };
}

const levelText: Record<string, string> = {
  full: "清理 + 换桌面都可做",
  "debloat-only": "仅可做清理，换不了桌面",
  mixed: "视具体系统而定，先确认系统再动手",
};

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = brands.find((x) => x.slug === slug);
  if (!b) notFound();

  return (
    <div className="py-10">
      <p className="text-sm text-slate-500">
        <Link href="/brands" className="text-sky-700 underline">
          品牌索引
        </Link>{" "}
        / {b.name}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{b.name}电视去广告</h1>
      <p className="mt-3 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">官方实测清单 {b.testedLists} 份</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{b.systems}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{levelText[b.level]}</span>
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">{b.intro}</p>

      <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">这类电视通常会禁用什么</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          {b.bloat.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-slate-500">
          具体到你的型号，以官方清单里对应固件的那份 debloat.txt 为准：清单是「起点」不是「命令」，你自己在用的服务不要禁。
        </p>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">已核实的代表机型（出自官方 examples）</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {b.examples.map((x) => (
            <li key={x} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-slate-500">
          完整型号表在{" "}
          <a className="text-sky-700 underline" href={`${siteConfig.repo}/blob/main/examples/README.md`} target="_blank" rel="noreferrer">
            官方 examples 清单
          </a>{" "}
          里按型号检索。你的型号不在清单里时，不要套用其他型号的清单直接跑，可走「方法总览」里的通用识别流程。
        </p>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">逐型号教程（本站已建页）</h2>
        <p className="mt-2 text-sm text-slate-500">
          下面每个型号在官方 examples 里都有一份独立的实测清单，点进去看该型号的清单条数与操作要点；个别跨系统机型（如某品牌的
          Fire TV 版本）归入对应系统页。没找到你的型号时不要硬套相近型号，先走「方法总览」的通用识别流程。
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {modelsByBrand(b.slug).map((m) => (
            <li key={m.slug}>
              <Link
                href={`/models/${m.slug}`}
                className="flex items-baseline justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:bg-sky-50"
              >
                <span>{m.name}</span>
                <span className="shrink-0 text-xs text-slate-400">{m.debloatCount} 条</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">操作步骤（通用流程）</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-slate-700">
          <li>电视上打开开发者选项：设置 → 设备偏好 → 关于 → 连续点按「版本号/Build」7 次，返回开发者选项，打开「USB 调试」（有「网络调试」也一并打开），电视保持开机。</li>
          <li>电脑与电视连同一个 Wi-Fi。在电脑上克隆官方仓库，照「方法总览」选一条路：AI 助手代劳，或手动执行。</li>
          <li>先备份已装应用与设置清单，再按你机型的清单分小批禁用，每批做完确认电视正常。</li>
          <li>装上干净启动器并设为默认主页，逐个遥控按键与常用应用验一遍。</li>
          <li>不满意或出问题：跑还原脚本一键回到原样，见「还原与风险」。</li>
        </ol>
      </section>

      {b.caveats.length > 0 && (
        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900">{b.name}特有的注意事项</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-amber-900">
            {b.caveats.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-8 text-sm text-slate-500">
        通用原理与两种做法见{" "}
        <Link href="/method" className="text-sky-700 underline">
          方法总览
        </Link>
        ；出问题与还原见{" "}
        <Link href="/restore" className="text-sky-700 underline">
          还原与风险
        </Link>
        。
      </p>
    </div>
  );
}
