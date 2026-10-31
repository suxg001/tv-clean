import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "方法总览｜电视去广告指南",
  description: "CleanYourTV 的原理与两种做法：备份、禁用、换桌面；让 AI 编程助手代劳，或手动执行。不 root、不卸载、可还原。",
};

export default function Method() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-slate-900">方法总览</h1>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">原理：为什么不用 root 也能做</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          安卓电视和安卓手机一样，自带一个给开发者用的调试通道（ADB）。在电视的开发者选项里打开调试、并在电视上点一次「允许」之后，
          电脑就能通过 Wi-Fi 给电视发标准命令。其中最关键的一条是 <code className="rounded bg-slate-100 px-1">pm disable-user</code>：
          它把某个系统组件「停用」——图标消失、不再运行，但程序本体还在，随时能再启用回来。广告推荐、遥测上报、预装垃圾大多是普通系统组件，
          所以停用它们不需要 root，也不需要卸载任何东西。整个方法就三步：<strong>先备份、再禁用、最后换一个干净的桌面</strong>。
        </p>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">动手前要准备什么</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-slate-700">
          <li>一台搭载 Android TV 或 Google TV 的电视（系统判断见首页分流卡）；</li>
          <li>一台电脑，与电视连同一个 Wi-Fi；</li>
          <li>约 15 分钟，和「出了问题就还原」的心理准备——还原方法在动手前先看一遍。</li>
          <li>走 AI 助手路线：电脑上装一个带终端能力的编程助手（官方 README 列了 Claude Code、Codex、Gemini CLI 等）。</li>
          <li>走手动路线：电脑需要 Python 3；如果还要自己编译启动器，需要 JDK 17–22 与 Android SDK 平台 34（官方 README 的口径）。</li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">路线 A：让 AI 编程助手代劳（官方主推）</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-slate-700">
          <li>
            电视上：设置 → 设备偏好 → 关于 → 对着「版本号（Build）」连按 7 次确认键，解锁开发者选项；返回打开「USB 调试」，有「网络调试 / ADB 调试」也一并打开。电视保持开机亮屏。
          </li>
          <li>
            电脑上：克隆官方仓库{" "}
            <a className="text-sky-700 underline" href={siteConfig.repo} target="_blank" rel="noreferrer">
              github.com/Gathin23/cleanyourtv
            </a>
            ，在该目录里打开你的编程助手，把仓库里的 PROMPT.md 内容粘贴进去，并填上你的电视完整型号。
          </li>
          <li>
            电视上会弹出「允许 USB 调试吗」，点允许。接下来助手会先列出它打算禁用的包、按遥测/广告/内容行/预装分类说明，并逐项问你：哪些应用在用、主页底栏放几个应用、语音助手与投屏要不要保留——你确认后它才动手。
          </li>
          <li>助手会分步执行：备份 → 禁用 → 构建并安装启动器，并用电视截图核对每一步的结果。整个过程大约 15 分钟。</li>
        </ol>
        <p className="mt-3 text-sm text-slate-500">
          为什么强调「先克隆仓库再贴提示」：官方的备份、主页守护与还原记录都在仓库的 tools 脚本里，脱离仓库让助手自己写命令，安全网就没了。
        </p>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">路线 B：手动执行</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          助手做的每一步你都能自己跑：用仓库的 tools 连上电视（网络 ADB 默认 5555 端口），先运行备份，再照你机型在 examples 里的 debloat.txt
          分小批禁用，然后构建安装启动器。命令细节以官方 README 的「Doing it by hand」一节为准，本站不复述具体包名命令——包名因固件而异，照抄别人的命令是最常见的翻车原因。
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          只有安卓手机、没有电脑？社区有一个手机端应用（Clean Your TV app），官方 README 里有收录，大约 5 分钟走完连接、分析、清理。注意认准官方 README 给的入口。
        </p>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">换桌面这一步的另一个选择：aerial-tv</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          换桌面不只有 CleanYourTV 自带启动器一个选项。国产开源项目{" "}
          <a className="text-sky-700 underline" href="https://github.com/pengchujin/aerial-tv" target="_blank" rel="noreferrer">
            aerial-tv
          </a>{" "}
          是一个 tvOS 风格的干净桌面（无广告、无推荐流、开机自动接管），支持小米、TCL、创维、索尼及盒子与投影仪。
          常见组合是：先用 CleanYourTV 把后台广告与遥测清理干净，再把默认桌面设成 aerial-tv。两者解决的问题不同——一个管「后台关什么」，一个管「眼前看什么」。
        </p>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        下一步：去{" "}
        <Link href="/brands" className="text-sky-700 underline">
          品牌索引
        </Link>{" "}
        查你的型号；动手前务必读{" "}
        <Link href="/restore" className="text-sky-700 underline">
          还原与风险
        </Link>
        。
      </p>
    </div>
  );
}
