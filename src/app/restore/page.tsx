import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "还原与风险｜电视去广告指南",
  description: "去广告操作如何一键还原、固件更新后会怎样、有哪些真实风险与防护做法，以及官方站点仿冒提醒。",
};

export default function Restore() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-slate-900">还原与风险</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">
        这套方法的底气在于「禁用 ≠ 卸载」：所有被停用的组件都还在电视里，还原就是把它们重新启用。但它毕竟动的是系统组件，风险要先说清。
      </p>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">怎么还原</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-slate-700">
          <li>
            官方仓库带还原脚本：用你动手前备份的那份清单运行 <code className="rounded bg-slate-100 px-1">tools/restore.sh</code>，被禁用的包会逐个启用回来，桌面也可以切回原厂启动器。官方口径是「一条命令撤销全部改动」。
          </li>
          <li>所以备份不是可选项：没有备份清单，还原就没有依据。动手前确认备份文件真的生成了再继续。</li>
          <li>实在救不回来的兜底是恢复出厂设置——但它会清掉你的应用与设置，只能当最后手段，而且出厂后广告也会跟着回来。</li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-amber-900">真实风险，先说在前面</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-amber-900">
          <li>
            <strong>禁错核心包可能导致电视无法正常开机。</strong>官方提示文件里专门列了绝不能碰的系统核心包（如权限控制器等）。只按你机型的实测清单操作、清单没提到的包不要动，是最基本的安全线。
          </li>
          <li>
            <strong>有些组件管着你正在用的功能。</strong>例如个别机型上某个系统组件管着已保存的 Wi-Fi、输入源按钮或遥控语音键。清单注释里通常会写明「保留」的原因，看到注释先读完再决定。
          </li>
          <li>
            <strong>分小批、可回退。</strong>官方做法是按类别分小批禁用、每批重启验一次，而不是一口气全关。这样出问题能立刻定位是哪一批。
          </li>
          <li>
            <strong>保修口径。</strong>本方法不 root、不刷机、不卸载，改动可完全还原；但各品牌售后对「动过调试选项」的认定不一，介意保修的先向品牌客服确认再动手。
          </li>
          <li>
            <strong>仿冒站点。</strong>项目方已公开声明：官方只有 cleanyour.tv 与 GitHub 仓库，cleanyourtv.com 等相似域名不是官方站点。凡是让你在第三方网站输入电视信息、下载「一键工具」的，先停下来核对域名。
          </li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">固件更新之后</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          电视系统更新后，厂商可能把部分被禁用的组件重新启用，广告可能部分「复活」；个别厂商更新器还会在重启后把自家频道应用重新打开（TCL 的实测清单里就有这类记录）。
          处理办法是更新后照原清单再跑一遍禁用步骤。反过来，如果更新后出现异常，先完整还原再更新，避免带着改动升固件。
        </p>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">出了问题怎么办</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-slate-700">
          <li>先跑还原脚本，回到动手前的状态，确认电视恢复正常。</li>
          <li>对照官方仓库的故障排查文档（docs/TROUBLESHOOTING）按症状查：连不上、端口不开、桌面没接管等常见问题都有条目。</li>
          <li>还解决不了，去官方仓库的 Issues 里搜你的型号——371 份清单背后是一个很大的用户社区，同型号的问题大概率有人遇到过。</li>
        </ol>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        回到{" "}
        <Link href="/method" className="text-sky-700 underline">
          方法总览
        </Link>{" "}
        或{" "}
        <Link href="/brands" className="text-sky-700 underline">
          品牌索引
        </Link>
        。
      </p>
    </div>
  );
}
