import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';

// 1. 定义支持的语言
const locales = ['en', 'zh'];

// 2. 创建多语言中间件
const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export default async function middleware(request: NextRequest) {
  // MVP版本：只处理多语言路由，不处理 Supabase 鉴权
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  // 匹配除了 api, _next, 静态文件之外的所有路径
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
