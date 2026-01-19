import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  try {
    // 1. 先运行 intl 中间件，获取基础 Response (包含语言 Cookie 和重定向逻辑)
    let response = intlMiddleware(request)

    // 2. 初始化 Supabase 客户端
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll()
            },
            setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
              // 同时更新 request 和 response
              cookiesToSet.forEach(({ name, value }) => {
                request.cookies.set(name, value)
              })

              // 更新 response 是为了写入浏览器
              cookiesToSet.forEach(({ name, value, options }) => {
                response.cookies.set(name, value, options)
              })
            },
          },
        }
      )

      // 3. 刷新 Session (这会触发上面的 setAll)
      await supabase.auth.getUser()
    } else {
      // 仅在开发环境或必要时打印，避免污染生产日志
      // console.warn("Middleware: Supabase env vars missing, skipping auth check.")
    }

    return response
  } catch (error) {
    console.error("Middleware execution failed:", error);
    // 发生错误时，降级为直接放行，避免 500 页面
    return NextResponse.next();
  }
}

export const config = {
  // ✅ 使用静态宽泛匹配，不依赖动态变量
  // next-intl 中间件内部会自动处理语言匹配
  matcher: ['/((?!api|_next|_vercel|auth/callback|.*\\..*).*)',]
}
