import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 模板项目用经典渲染行为：搜索页等需要读 searchParams 的路由用 force-dynamic；
     如需启用 Cache Components，可改为 Suspense 包裹 + 移除各页的 dynamic 配置 */
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
