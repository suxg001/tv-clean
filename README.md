# 电视去广告指南（tv-clean）

一个开源的中文智能电视去广告 / 去臃肿教程站：按品牌和型号给出经过核对的操作步骤、还原方法与风险提示，覆盖 **371 个实测机型 / 100 个品牌**。

An open-source Chinese guide to debloating smart TVs and removing ads, with verified per-brand and per-model instructions, restore steps, and risk notes — covering 371 tested models across 100 brands.

> ⚠️ 操作前请先阅读「还原与风险」页。去广告涉及 ADB 调试与系统应用停用，操作不当可能导致设备异常，请务必先备份、按步骤操作，并确认你的机型在支持清单内。不在清单中的机型，本站不声称支持。

## 功能与结构

- `/` 首页：系统分流（Android / Google TV、Fire TV、不支持系统）+ 品牌网格 + 三步法
- `/brands` 品牌索引
- `/brands/[slug]` 10 个重点品牌页：TCL、小米、Sony、Philips、创维、海信、SHARP、海尔、Fire TV、盒子与投影
- `/models` 型号索引
- `/models/[slug]` 371 个逐型号页（机型 OS、清单要点与注意事项）
- `/method` 方法总览：原理、前置条件、路线 A（AI 助手）/ 路线 B（手动）、换干净桌面步骤
- `/restore` 还原与风险：还原方法、变砖风险、保修口径、固件更新、仿冒站警告
- `/unsupported` 不支持的系统：三星 Tizen / LG webOS / 海信 VIDAA / Roku / Vizio（无 ADB）的原因与替代思路

## 数据来源与口径

- 品牌/机型清单以开源项目 [CleanYourTV](https://github.com/Gathin23/cleanyourtv) 的 README 与 examples 清单为骨架，于 2026-10-30 逐项核对后写入 `src/lib/data.ts` 与 `src/lib/models.ts`。
- 官方数据（2026-10-30 口径）：371 个机型 / 100 个品牌有实测清单；品牌份数 TCL 78、Sony 41、Xiaomi 34（+ Redmi 3）、Philips 21、Skyworth 15、Hisense 13 等。
- CleanYourTV 官方站点是 cleanyour.tv；cleanyourtv.com 非官方（原仓库 README 明确声明），站内已多处提示。
- 本站文案为原创中文表述，未搬运原仓库的原文与截图。

## 技术栈

- [Next.js 16](https://nextjs.org/) + React 19 + TypeScript
- Tailwind CSS v4
- 静态生成（SSG）：品牌页与 371 个型号页在构建时全部预渲染

## 本地运行

```bash
npm install
npm run dev     # 开发模式
npm run build   # 生产构建（静态生成全部页面）
npm run start   # 运行生产构建
```

## 部署

可直接部署到 Vercel（导入本仓库即可）或任何支持 Next.js 的平台。

部署前必改：`src/lib/data.ts` 中 `siteConfig.url` 仍是占位域名 `https://tv-clean.example.com`，请换成你的正式域名，否则 sitemap / Open Graph 地址不正确。

## 贡献

欢迎提 Issue 和 Pull Request，尤其是：

- 新机型的实测结果（请附机型、系统版本与操作结果）
- 已有型号步骤的纠错
- 新品牌的清单核对

提交机型信息前，请先对照 CleanYourTV 官方清单核实，避免把未实测机型写成「支持」。

## License

[MIT](./LICENSE)

本站教程仅供学习与个人设备使用，请自行承担操作风险，并遵守当地法律法规与设备厂商条款。
