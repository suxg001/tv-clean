import type { Metadata } from "next";
import Link from "next/link";
import { unsupportedSystems, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "不支持的系统怎么办｜电视去广告指南",
  description: "三星 Tizen、LG webOS、海信 VIDAA、Roku 等系统为什么用不了 CleanYourTV，以及用遥控器关掉观看数据追踪的替代思路。",
};

export default function Unsupported() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-slate-900">不支持的系统怎么办</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">
        CleanYourTV 靠的是安卓系统的调试通道（ADB）。下面这些系统不是安卓，没有这个通道，所以这套「禁用组件」的方法从原理上就用不了——
        不是没人做清单，是路走不通。任何声称能给这些系统「一键去广告」的第三方工具都要格外警惕。
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {unsupportedSystems.map((s) => (
          <div key={s.name} className="rounded-xl bg-white p-5 shadow-sm">
            <p className="font-semibold text-slate-900">{s.name}</p>
            <p className="mt-1 text-sm text-slate-600">{s.note}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">替代思路：用遥控器关掉「追踪」</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          这些系统虽然去不掉首页的广告位，但普遍在设置里留了观看数据采集（ACR）的开关。关掉它，至少能让电视不再把你的观看习惯回传、减少针对性推荐。
          大致路径是在设置里找「隐私 / 条款与隐私 / 观看数据 / 兴趣广告」一类条目，关闭「观看信息服务」并限制个性化广告——各品牌菜单位置不同，
          CleanYourTV 官方专门做了一个{" "}
          <a className="text-sky-700 underline" href={`${siteConfig.officialSite}/not-android`} target="_blank" rel="noreferrer">
            非安卓电视处理页（cleanyour.tv/not-android）
          </a>
          ，按品牌给了遥控器操作路径，以那一页为准。
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          另一个通用办法是在路由器或 DNS 层拦截广告域名（例如 Pi-hole 或带广告过滤的 DNS 服务），对所有系统的电视都有效，但拦截范围与副作用因家庭网络而异，
          且去不掉与内容同源下发的广告。本站后续会单独成文，先不在这里展开未经核实的域名清单。
        </p>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        如果你家是安卓系统的电视，回到{" "}
        <Link href="/brands" className="text-sky-700 underline">
          品牌索引
        </Link>{" "}
        查型号。
      </p>
    </div>
  );
}
