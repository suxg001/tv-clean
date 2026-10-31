import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
        <p>
          本站是独立整理的教程索引，方法基于开源项目{" "}
          <a className="text-sky-700 underline" href={siteConfig.repo} target="_blank" rel="noreferrer">
            CleanYourTV
          </a>{" "}
          （官方站点{" "}
          <a className="text-sky-700 underline" href={siteConfig.officialSite} target="_blank" rel="noreferrer">
            cleanyour.tv
          </a>
          ）。注意：cleanyourtv.com 等相似域名并非该项目官方站点，项目方已公开声明。
        </p>
        <p className="mt-2">
          所有操作只应针对你自己拥有的设备。禁用系统组件存在风险，请先备份、按清单小步操作；本站不对因操作造成的设备故障负责。
        </p>
        <p className="mt-2">© 2026 {siteConfig.name}</p>
      </div>
    </footer>
  );
}
