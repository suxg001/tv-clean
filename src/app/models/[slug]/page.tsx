import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, siteConfig } from "@/lib/data";
import { models } from "@/lib/models";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

function findModel(slug: string) {
  return models.find((m) => m.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = findModel(slug);
  if (!m) return {};
  return {
    title: `${m.name} 去广告教程：关掉开机广告和推荐位（可还原）｜电视去广告指南`,
    description: `${m.name}（${m.os}）去广告实操：基于 CleanYourTV 官方实测清单（本型号 ${m.debloatCount} 条），开开发者选项、备份、ADB 逐条禁用、${m.debloatOnly ? "仅清理说明" : "换干净桌面"}与一键还原，全程不 root、不卸载。`,
  };
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = findModel(slug);
  if (!m) notFound();

  const brandPage = m.siteBrand ? brands.find((b) => b.slug === m.siteBrand) : undefined;
  const brandLabel = brandPage ? brandPage.name : m.brand;

  return (
    <div className="py-10">
      <p className="text-sm text-slate-500">
        <Link href="/models" className="text-sky-700 underline">
          型号库
        </Link>{" "}
        /{" "}
        {brandPage ? (
          <Link href={`/brands/${brandPage.slug}`} className="text-sky-700 underline">
            {brandPage.name}
          </Link>
        ) : (
          m.brand
        )}{" "}
        / {m.name}
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">{m.name} 去广告教程</h1>
      <p className="mt-3 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">{brandLabel}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{m.os}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">实测清单 {m.debloatCount} 条</span>
        {m.debloatOnly && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">只能清理，不能换启动器</span>
        )}
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">
        这一页只讲 <strong>{m.name}</strong> 这一台：它在 CleanYourTV 官方 examples
        里有一份贡献者真机实测过的清单，做法是走系统自带的 ADB 调试通道把广告与推荐类组件逐个「禁用」——不
        root、不卸载系统应用，任何一步后悔都能一条命令恢复。动手前先把下面三件事看完：备份怎么做、哪些是这台特有的坑、出了问题怎么还原。
      </p>

      <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">这台的登记信息（出自官方 examples）</h2>
        <dl className="mt-3 space-y-2 text-slate-700">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-slate-500">型号</dt>
            <dd>{m.fullName}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-slate-500">系统</dt>
            <dd>{m.os}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-slate-500">清单</dt>
            <dd>
              debloat.txt 共 {m.debloatCount} 条待禁用项（数的是清单文件里实际的包名条目，注释与说明行不计）。
              清单是按这台的固件实测出来的「起点名单」，不是必须全禁的命令：你自己在用的应用、投屏、语音助手这类，对应条目留着不禁。
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-sm text-slate-500">
          原始清单文件在{" "}
          <a
            className="text-sky-700 underline"
            href={`${siteConfig.repo}/tree/main/examples/${m.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            官方 examples / {m.slug}
          </a>
          ，动手时以那份文件的分组与注释为准。
        </p>
      </section>

      {m.fireTv && (
        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900">Fire TV 特别说明：只能清理，不能换启动器</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-amber-900">
            <li>
              这台跑的是 Fire OS。系统把自带桌面设为受保护组件，第三方启动器接管不了主屏幕，所以这台只能做「清理」：禁用广告供给、遥测与推荐类组件，桌面还是原来那个。
            </li>
            <li>首页的赞助行光靠禁用包名去不干净，官方的通行做法是再配合 DNS 拦截，两边一起上效果才完整。</li>
            <li>个别 Alexa 语音相关的包会在重启后被固件重新启用，清单里有标注，属于正常现象，不用反复折腾。</li>
            <li>2015 款 Fire TV Box（Fire OS 5）连清理通道都被系统拒绝，不在此列，那台直接放弃。</li>
          </ul>
        </section>
      )}

      {!m.fireTv && m.debloatOnly && (
        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900">这台的特别说明：只能清理，换不了桌面</h2>
          <p className="mt-3 leading-relaxed text-amber-900">
            这份实测清单标注为「仅清理」：这台的固件不接受第三方启动器接管主页（或自带桌面无法被替代），所以流程只做到禁用广告与推荐组件为止，跳过下面第
            5 步。清理本身照样有效，开机广告与首页推荐位会明显减少。
          </p>
        </section>
      )}

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">{m.name} 去广告步骤</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 leading-relaxed text-slate-700">
          <li>
            <strong>打开开发者选项与调试。</strong>设置 → 设备偏好设置 → 关于 → 连续点按「版本号 / Build」7
            次，回到开发者选项里打开「USB 调试」；有「网络调试 / 无线调试」的也一并打开。记下电视的局域网 IP（设置 → 网络里看）。
          </li>
          <li>
            <strong>电脑连上电视。</strong>电脑与电视连同一个 Wi-Fi，装好 ADB 工具后执行 adb connect
            电视IP:5555，电视上弹出调试授权时点「允许」。连不上先看官方的故障排查，别急着换方法乱试。
          </li>
          <li>
            <strong>先备份，再动手。</strong>先导出一份当前已装应用清单存好（adb shell pm list
            packages），这是你的还原对照表；重要账号、Wi-Fi
            密码这类先确认还在。备份这一步不能省——后面所有操作都是可逆的，但前提是你知道原来是什么样。
          </li>
          <li>
            <strong>按本型号清单分批禁用。</strong>打开这台的 debloat.txt（共 {m.debloatCount}{" "}
            条），用 pm disable-user --user 0 包名 的方式一条条禁用，分成小批、每批禁完重启一次
            TV，确认开机、信号源、常用应用都正常再继续。清单里明确标注「保留」与受保护的包不要碰；某一条禁完发现常用功能不对，单独用
            pm enable 包名 恢复那一条即可。
          </li>
          {m.debloatOnly ? (
            <li>
              <strong>这台跳过换桌面。</strong>如上说明，这台只能清理不能换启动器。清理完后可以在系统设置里再关掉「个性化推荐 /
              内容推荐」一类开关（如果固件有），把剩下的推荐位也压下去。
            </li>
          ) : (
            <li>
              <strong>换上干净桌面（可选但推荐）。</strong>装一个无广告的小启动器并设为默认主页，以后开机直达应用列表。换完逐项验一遍：遥控器
              Home 键、信号源切换、投屏、语音键都正常再收工；个别按键映射不对时，清单文件里通常有对应备注。
            </li>
          )}
          <li>
            <strong>观察两三天。</strong>系统更新后个别被禁的组件可能被固件重新启用，发现广告回来，先对照清单重跑一遍对应条目即可，不用整套重做。
          </li>
        </ol>
      </section>

      <section className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-bold text-red-900">备份、恢复与变砖风险（动手前必读）</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-red-900">
          <li>
            <strong>先备份。</strong>本方法全程只用 pm
            disable-user（禁用）不用卸载，理论上一条命令就能全部恢复；但前提是动手前留好原始包清单，并把清单文件原文存一份到电脑上。
          </li>
          <li>
            <strong>一键还原。</strong>任何时候想回到原样：对清单里的包逐个执行 pm enable，或直接跑官方的还原脚本；再不行，恢复出厂设置也能回到初始状态（账号与应用需要重装）。完整说明见{" "}
            <Link href="/restore" className="underline">
              还原与风险
            </Link>
            。
          </li>
          <li>
            <strong>变砖风险要说清。</strong>
            只按本型号清单操作、且只用「禁用」不用「卸载」时，风险很低；真正的风险来自三种动作：套用其他型号/其他固件的清单、禁清单之外的系统包、照网上来源不明的命令乱删。万一电视卡在开机画面，先别慌：多数情况能进恢复模式做恢复出厂，真处理不了再找品牌售后，并说明你只做过禁用操作。
          </li>
          <li>
            <strong>系统大版本升级后重核对。</strong>固件升级可能增删包名，升级完不要把旧清单原样再跑一遍，先看官方
            examples 里这台有没有更新过的清单。
          </li>
        </ul>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        这台所属的品牌页：{brandPage ? (
          <Link href={`/brands/${brandPage.slug}`} className="text-sky-700 underline">
            {brandPage.name}电视去广告
          </Link>
        ) : (
          <Link href="/brands" className="text-sky-700 underline">
            品牌索引
          </Link>
        )}
        ；通用原理与两种做法见{" "}
        <Link href="/method" className="text-sky-700 underline">
          方法总览
        </Link>
        ；出问题与还原见{" "}
        <Link href="/restore" className="text-sky-700 underline">
          还原与风险
        </Link>
        ；找其他型号去{" "}
        <Link href="/models" className="text-sky-700 underline">
          型号库
        </Link>
        。
      </p>
    </div>
  );
}
