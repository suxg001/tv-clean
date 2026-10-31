import Link from "next/link";
import { brands, otherBrands, unsupportedSystems, siteConfig } from "@/lib/data";

export default function Home() {
  return (
    <div className="py-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">电视开机全是广告？给它换个干净的桌面</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          基于开源项目 CleanYourTV（GitHub 4.6 万星，371 个机型、100 个品牌有实测清单）：通过电视自带的调试通道，
          先备份，再把广告与遥测组件「禁用」，最后换上一个干净的桌面。不 root、不卸载任何东西，一条命令就能全还原。
        </p>
        <p className="mt-3 text-sm text-amber-700">
          ⚠️ 只操作你自己家的电视；动手前请先看完「还原与风险」。相似域名 cleanyourtv.com 不是官方站点，别在那类站点下载东西。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">先确认你家电视的系统</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="font-semibold text-emerald-700">Android TV / Google TV</p>
            <p className="mt-1 text-sm text-slate-600">清理 + 换桌面都能做。在下方按品牌查你家型号有没有实测清单。</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="font-semibold text-amber-700">Amazon Fire TV</p>
            <p className="mt-1 text-sm text-slate-600">只能做清理，换不了桌面。见 Fire TV 品牌页。</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="font-semibold text-rose-700">三星 / LG / VIDAA 等</p>
            <p className="mt-1 text-sm text-slate-600">这套方法用不了，但可以用遥控器关掉观看数据追踪。见「不支持的系统」。</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">按品牌查（数字 = 官方实测清单份数）</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`} className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow">
              <p className="flex items-baseline justify-between">
                <span className="font-semibold text-slate-900">{b.name}</span>
                <span className="text-sm text-sky-700">{b.testedLists} 份清单</span>
              </p>
              <p className="mt-1 text-sm text-slate-600">{b.systems}</p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500">{b.intro}</p>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500">
          还有 {otherBrands.map((b) => `${b.name}（${b.count}）`).join("、")} 等品牌有清单，完整名单见{" "}
          <Link className="text-sky-700 underline" href="/brands">
            品牌索引
          </Link>
          。
        </p>
      </section>

      <section className="mt-12 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">方法是三步，全程可还原</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          <li className="rounded-lg bg-slate-50 p-4">
            <p className="font-semibold">1. 备份</p>
            <p className="mt-1 text-sm text-slate-600">先把电视上已装应用与设置的清单存下来，这是还原的依据。</p>
          </li>
          <li className="rounded-lg bg-slate-50 p-4">
            <p className="font-semibold">2. 禁用</p>
            <p className="mt-1 text-sm text-slate-600">用系统自带的 pm disable-user 把广告、遥测、预装垃圾「停用」——不是卸载，随时能启用回来。</p>
          </li>
          <li className="rounded-lg bg-slate-50 p-4">
            <p className="font-semibold">3. 换桌面</p>
            <p className="mt-1 text-sm text-slate-600">装一个小巧的干净启动器设为默认主页：没有推荐流，没有赞助行。</p>
          </li>
        </ol>
        <p className="mt-4 text-sm text-slate-600">
          具体做法有两条路：让 AI 编程助手照着官方提示文件一步步做，或者自己手动跑命令。详见{" "}
          <Link className="text-sky-700 underline" href="/method">
            方法总览
          </Link>
          。换桌面这一步也可以选国产项目 aerial-tv（tvOS 风格桌面，支持小米 / TCL / 创维 / 索尼等）作为替代启动器，先清理、后换桌面，两者不冲突。
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">这些系统不在支持范围</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {unsupportedSystems.map((s) => (
            <li key={s.name} className="rounded-full bg-rose-50 px-3 py-1 text-sm text-rose-700">
              {s.name}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          原因与替代处理思路见{" "}
          <Link className="text-sky-700 underline" href="/unsupported">
            不支持的系统
          </Link>{" "}
          一页。数据口径：品牌与清单份数来自{" "}
          <a className="text-sky-700 underline" href={siteConfig.repo} target="_blank" rel="noreferrer">
            CleanYourTV 官方仓库
          </a>{" "}
          2026-10-30 的 README 与 examples 清单。
        </p>
      </section>
    </div>
  );
}
