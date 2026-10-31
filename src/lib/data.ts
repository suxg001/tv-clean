// 电视去广告指南 —— 数据层
// 事实来源（2026-10-30 逐项核实）：CleanYourTV 官方仓库
// https://github.com/Gathin23/cleanyourtv 的 README 与 examples/ 清单。
// 品牌后的数字 = 该品牌在官方 examples/ 中由贡献者提交并实测过的机型清单份数。
// 未在官方清单中出现的机型，本站不声称支持。

export const siteConfig = {
  name: "电视去广告指南",
  slogan: "给全家人的电视，还一个干净的桌面",
  description:
    "按品牌查电视去广告方法：基于开源项目 CleanYourTV 的实测机型清单，讲清原理、步骤、还原方法与风险。只针对自有设备，不 root、不卸载、可一键还原。",
  // TODO: 域名确定后替换为正式地址
  url: "https://tv-clean.example.com",
  repo: "https://github.com/Gathin23/cleanyourtv",
  officialSite: "https://cleanyour.tv",
};

export interface Brand {
  slug: string;
  name: string; // 中文展示名
  nameEn: string;
  testedLists: number; // 官方 examples 实测清单份数
  systems: string; // 适用系统
  level: "full" | "debloat-only" | "mixed"; // 完整支持 / 仅清理 / 混合
  intro: string;
  bloat: string[]; // 该品牌实测清单里常见的被禁用项（据 examples 注释归纳，原创表述）
  examples: string[]; // 已核实的代表机型（出自 examples/README）
  caveats: string[]; // 该品牌特有的注意事项（已核实）
}

export const brands: Brand[] = [
  {
    slug: "tcl",
    name: "TCL",
    nameEn: "TCL",
    testedLists: 78,
    systems: "Android TV / Google TV",
    level: "full",
    intro:
      "TCL 是 CleanYourTV 实测清单最多的品牌，覆盖 BeyondTV、G03/G05/G08/G10 等多个平台系列，从老款 Android TV 8 到 Google TV 14 都有人实测过。",
    bloat: ["TCL Channel 与首页内容推送", "TGuard 清理加速类组件", "数据分析与日志上报（BI/logkit）", "消息盒子、贴纸与促销横幅", "合作方预装与自动安装服务"],
    examples: ["TCL 32L5A", "TCL 50P615", "TCL 55C725", "TCL C635", "TCL C755", "TCL C89B 85\"", "TCL 55P7K", "TCL 75P8K"],
    caveats: [
      "少数中国市场机型拒绝安装任何第三方启动器，这类机型的官方清单文件头会写明，只能做清理、换不了桌面。",
      "个别机型上 TCL 自带更新器会在重启后把 TCL Channel 重新启用，官方清单里有对应的处理备注，动手前先查自己机型的那份清单。",
    ],
  },
  {
    slug: "xiaomi",
    name: "小米 / 红米",
    nameEn: "Xiaomi / Redmi",
    testedLists: 37,
    systems: "Android TV / Google TV（含国行固件机型）",
    level: "full",
    intro:
      "小米与红米合计 37 份实测清单。海外版的 PatchWall、国行固件的小米分析与推送服务都有对应清单，连国行 HyperOS 的新款旗舰也已有人实测。",
    bloat: ["PatchWall 内容推荐与小米频道行", "小米数据分析与日志上传", "电视管家里的清理/加速组件", "合作方预装应用与自动安装", "购物、支付与云控类推送服务（国行固件）"],
    examples: ["小米电视 EA Pro 55\"", "小米电视 S Pro 100 Mini LED（国行 HyperOS）", "小米电视 S Mini LED 75 2025", "Mi TV P1 43\"", "小米电视 A Pro 2026", "Redmi TV 43\"", "小米盒子 S 第三代", "小米电视棒 4K 第二代"],
    caveats: [
      "国行固件没有 Google 服务，清单构成与海外版不同，务必选标注 CN build / 国行固件的那份清单，不要套用海外版。",
      "部分机型的 setupwraith 组件管着已保存的 Wi-Fi，官方清单会注明要先忘记网络重连再禁用，照清单顺序来，不要跳步。",
    ],
  },
  {
    slug: "sony",
    name: "索尼",
    nameEn: "Sony Bravia",
    testedLists: 41,
    systems: "Android TV / Google TV",
    level: "full",
    intro:
      "索尼 Bravia 的实测清单有 41 份，是数量第二多的品牌。索尼自家推荐行与合作内容是主要的清理对象。",
    bloat: ["索尼自家内容推荐行", "合作方预装应用", "数据分析与反馈服务", "零售演示模式组件"],
    examples: ["Sony Bravia 系列（41 份清单，逐型号见官方 examples）"],
    caveats: ["动手前先在官方 examples 里按完整型号检索自己那台，同一系列不同年份固件的清单不通用。"],
  },
  {
    slug: "philips",
    name: "飞利浦",
    nameEn: "Philips",
    testedLists: 21,
    systems: "Android TV / Google TV",
    level: "full",
    intro: "飞利浦有 21 份实测清单，覆盖其 Android TV 与 Google TV 机型。",
    bloat: ["厂商内容推荐行", "数据分析与遥测服务", "合作方预装应用", "演示模式组件"],
    examples: ["Philips Android TV / Google TV 系列（21 份清单，逐型号见官方 examples）"],
    caveats: ["飞利浦部分机型由不同代工厂生产、同名不同芯，先核对固件版本再选清单。"],
  },
  {
    slug: "skyworth",
    name: "创维",
    nameEn: "Skyworth",
    testedLists: 15,
    systems: "Android TV / Google TV",
    level: "full",
    intro:
      "创维有 15 份实测清单。创维系的 Zeasn（酷开海外）广告门户服务在多份清单里被点名处理。",
    bloat: ["Zeasn 广告/门户服务（SHOW_AD）", "厂商应用商店与内容行", "数据分析与设备门户服务", "出厂测试类应用"],
    examples: ["Skyworth 系列（15 份清单，逐型号见官方 examples）"],
    caveats: ["个别 Zeasn 组件同时管着系统更新检查，禁用前看清清单注释，别把更新通道一起关掉。"],
  },
  {
    slug: "hisense",
    name: "海信",
    nameEn: "Hisense",
    testedLists: 13,
    systems: "仅限 Android TV / Google TV 机型",
    level: "mixed",
    intro:
      "海信有 13 份实测清单，但只适用于搭载 Android TV / Google TV 的机型。海信自家的 VIDAA 系统不在支持范围内。",
    bloat: ["厂商内容推荐行", "数据分析服务", "合作方预装应用"],
    examples: ["Hisense Android TV / Google TV 系列（13 份清单，逐型号见官方 examples）"],
    caveats: [
      "买之前先确认系统：VIDAA 系统的海信电视没有 ADB，这套方法用不了，只能按遥控器关追踪的思路处理，见「不支持的系统」一页。",
      "海信旗下的 Vidda 子品牌另有自己的清单（2 份），不要与海信本品牌混用。",
    ],
  },
  {
    slug: "sharp",
    name: "夏普",
    nameEn: "SHARP",
    testedLists: 8,
    systems: "Android TV / Google TV",
    level: "full",
    intro: "夏普有 8 份实测清单，覆盖其 Android TV / Google TV 机型。",
    bloat: ["厂商内容行", "数据分析服务", "合作方预装应用"],
    examples: ["SHARP 系列（8 份清单，逐型号见官方 examples）"],
    caveats: ["先按完整型号在官方 examples 里核对，清单份数不多，没找到对应型号时不要套用相近型号的清单。"],
  },
  {
    slug: "haier",
    name: "海尔",
    nameEn: "Haier",
    testedLists: 3,
    systems: "Android TV / Google TV",
    level: "full",
    intro:
      "海尔目前有 3 份实测清单。海尔智家类 IoT 应用与内容行是主要清理对象；另有 AQUA（海尔旗下）机型的清单可供参考。",
    bloat: ["海尔 IoT 与内容应用", "Zeasn 启动器组件（个别机型）", "Anoki 观看数据采集（ACR）", "零售演示模式"],
    examples: ["AQUA MatrixTV EE 50\"（海尔平台）"],
    caveats: ["清单份数少，你的型号不在清单里时，可以走「让 AI 助手现场识别」的通用流程，但每一步都要人工确认后再执行。"],
  },
  {
    slug: "firetv",
    name: "Fire TV",
    nameEn: "Amazon Fire TV",
    testedLists: 7,
    systems: "Fire OS",
    level: "debloat-only",
    intro:
      "Fire TV 比较特殊：只能做清理（禁用广告与遥测包），换不了桌面——Fire OS 不肯把主屏幕交给第三方启动器。",
    bloat: ["亚马逊遥测与观看数据采集（ACR）", "广告与推荐内容供给服务", "购物、频道与促销入口", "Alexa 附加组件（可选）"],
    examples: ["Fire TV Stick 4K（2018 / 2023）", "Fire TV Stick 4K Max（2021）", "Fire TV Stick Lite（2020）", "Fire TV 4K 电视 Omni 系列"],
    caveats: [
      "2015 款 Fire TV Box（Fire OS 5）连清理都做不了：所有 pm 命令通道都被系统拒绝，直接放弃这台。",
      "首页赞助行光靠禁用包名去不干净，官方清单的做法是配合 DNS 拦截一起用。",
      "Alexa 语音相关的几个包会在每次重启后被固件重新启用，清单里有标注，属于正常现象。",
    ],
  },
  {
    slug: "boxes-projectors",
    name: "盒子与投影仪",
    nameEn: "Boxes & Projectors",
    testedLists: 30,
    systems: "Android TV / Google TV",
    level: "full",
    intro:
      "电视盒子、电视棒和智能投影仪同样适用：NVIDIA Shield、Chromecast with Google TV、小米盒子/电视棒，以及极米、坚果、当贝同类平台的 Anker Nebula、BenQ 等投影仪都有实测清单（投影品牌 14 个）。",
    bloat: ["厂商分析与推荐服务", "合作方预装与自动安装", "演示与出厂测试应用"],
    examples: ["NVIDIA Shield（3 份）", "Chromecast with Google TV（Google，3 份）", "Anker Nebula Cosmos / Mars 3 Air / Capsule III Pro", "BenQ GV32 / QS01 / QS02", "极米 XGIMI、坚果 JMGO、万播 Wanbo（投影清单）"],
    caveats: [
      "部分投影仪与 Chromecast 设备只提供带配对码的无线调试，需要先配对一次再开 5555 端口，官方故障排查文档有写明做法。",
      "投影仪的对焦、梯形校正、遥控配对是主板或专用服务管的，别碰清单没提到的包。",
    ],
  },
];

// 其余有实测清单的品牌（份数较少，首页与品牌索引页列名，逐型号见官方 examples）
export const otherBrands: { name: string; count: number }[] = [
  { name: "BenQ 明基", count: 6 },
  { name: "Panasonic 松下", count: 6 },
  { name: "JVC", count: 5 },
  { name: "OnePlus 一加", count: 4 },
  { name: "Thomson", count: 4 },
  { name: "Google", count: 3 },
  { name: "Grundig", count: 3 },
  { name: "Motorola", count: 3 },
  { name: "NVIDIA Shield", count: 3 },
  { name: "RCA", count: 3 },
  { name: "Toshiba 东芝", count: 3 },
  { name: "Vu", count: 3 },
  { name: "CHiQ 长虹", count: 2 },
  { name: "FFalcon 雷鸟", count: 2 },
  { name: "Hitachi 日立", count: 2 },
  { name: "Nokia", count: 2 },
  { name: "Vidda", count: 2 },
  { name: "onn", count: 2 },
];

// 官方 README 提及的其余品牌（各 1 份清单）与投影品牌，仅列名
export const moreBrandNames =
  "Acer、AIWA、ASUS、Artel、Beko、CAxium、Cecotec、Dcolor、DEXP、EKO、Freebox、Insignia Fire TV、Kalley、Kogan、MECOOL、Nokia、OPPO、Polytron、PPTV、PRISM+、RockTek、SANYO、Sber、Tele System、TiVo、Tornado、Tuvio、Verizon 等 56 个品牌各有清单；投影仪另有 Anker Nebula、BYINTEK、Epson、Formovie、HOTACK、JMGO 坚果、Magcubic、Portronics、Wanbo 万播、XGIMI 极米等 14 个品牌。";

export const unsupportedSystems = [
  { name: "三星 Tizen", note: "没有 ADB，CleanYourTV 用不了" },
  { name: "LG webOS", note: "没有 ADB，CleanYourTV 用不了" },
  { name: "海信 VIDAA", note: "海信自研系统，不在支持范围" },
  { name: "Roku / Vizio", note: "封闭系统，不在支持范围" },
  { name: "华为鸿蒙（电视）", note: "无标准 Android 调试通道，不在支持范围" },
];
