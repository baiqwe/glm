// app/robots.ts
// 动态生成 robots.txt，从 siteConfig 读取域名
import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/_next/',
                '/*/sign-in',
                '/*/sign-up',
                '/*/forgot-password',
                '/*/create',
            ],
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
        host: siteConfig.url,
    };
}
