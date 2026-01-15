/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://glmimageonline.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,

    // Exclude pages that shouldn't be indexed
    exclude: [
        '/api/*',           // API routes
        '/_next/*',         // Next.js system files
        '/server-sitemap.xml',
        '/icon.svg',
        '/apple-icon.png',
        '/*/sign-in',       // Auth pages
        '/*/sign-up',
        '/*/forgot-password',
        '/*/dashboard',     // User dashboard (private)
    ],

    // Generate alternate language links
    alternateRefs: [
        {
            href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://glmimageonline.com'}/en`,
            hreflang: 'en',
        },
        {
            href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://glmimageonline.com'}/zh`,
            hreflang: 'zh',
        },
    ],

    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/*/sign-in',
                    '/*/sign-up',
                    '/*/forgot-password',
                    '/*/dashboard',
                ],
            },
        ],
    },

    // Add additional paths for GLM-Image
    additionalPaths: async (config) => {
        const locales = ['en', 'zh'];
        const staticPages = [
            'create',          // AI Studio (public landing page)
            'pricing',
            'privacy',
            'terms',
            'about'
        ];
        const result = [];

        // Add static pages
        for (const locale of locales) {
            for (const page of staticPages) {
                let priority = 0.8;
                let changefreq = 'weekly';

                if (page === 'create') {
                    priority = 0.95;  // High priority for main product page
                    changefreq = 'daily';
                } else if (page === 'pricing') {
                    priority = 0.85;
                } else if (page === 'privacy' || page === 'terms') {
                    priority = 0.5;
                    changefreq = 'monthly';
                }

                result.push({
                    loc: `/${locale}/${page}`,
                    changefreq,
                    priority,
                    lastmod: new Date().toISOString(),
                });
            }
        }

        return result;
    },

    transform: async (config, path) => {
        // Add priority and changefreq based on page type
        let priority = 0.7;
        let changefreq = 'weekly';

        if (path === '/en' || path === '/zh') {
            // Homepage has highest priority
            priority = 1.0;
            changefreq = 'daily';
        } else if (path.includes('/create')) {
            // AI Studio page is very important
            priority = 0.95;
            changefreq = 'daily';
        } else if (path.includes('/pricing')) {
            priority = 0.8;
            changefreq = 'weekly';
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod: new Date().toISOString(),
        };
    },
};

