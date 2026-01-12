// config/site.ts
// 站点全局配置 - 上站时只需修改此文件

export const siteConfig = {
  // === 品牌标识 ===
  name: "MakeBW",                           // 网站名称
  domain: "makebw.com",                     // 主域名（不含 https://）
  url: "https://makebw.com",                // 完整 URL
  author: "Bai",                            // 作者
  supportEmail: "support@makebw.com",       // 联系邮箱

  // === 分析追踪 ===
  gaId: "G-YT7DTCMVZ1",                     // Google Analytics ID

  // === 国际化配置 ===
  i18n: {
    locales: ['en', 'zh'] as const,         // 支持的语言列表
    defaultLocale: 'en' as const,           // 默认语言
    baseLocale: 'en' as const,              // 翻译基准语言
  },

  // === PWA 主题 ===
  themeColor: "#000000",
  backgroundColor: "#ffffff",
};

// 类型导出
export type Locale = (typeof siteConfig.i18n.locales)[number];
