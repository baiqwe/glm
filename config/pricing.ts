// ============================================
// GLM-Image 激进定价策略
// 核心：10积分/张，高额锚定原价，制造紧迫感
// ============================================

// 每次生成消耗积分数
export const CREDITS_PER_GENERATION = 10;

// 定价套餐接口
export interface PricingPlan {
    id: string;
    name: string;
    nameZh: string;
    description: string;
    descriptionZh: string;
    price: number;           // 实际价格
    originalPrice: number;   // 锚定原价（划线）
    credits: number;
    type: 'one_time' | 'subscription';
    interval?: 'month' | 'year';
    productId: string;       // Creem Product ID
    badge?: string;
    badgeZh?: string;
    isPopular?: boolean;
    features: string[];
    featuresZh: string[];
}

// 单次包 - Starter
export const PLAN_STARTER: PricingPlan = {
    id: 'starter',
    name: 'Starter Pack',
    nameZh: '入门包',
    description: 'Perfect for trying out',
    descriptionZh: '尝鲜首选',
    price: 9.99,
    originalPrice: 9.99,     // 无折扣
    credits: 1000,           // 100张
    type: 'one_time',
    productId: 'prod_6UETyUy0QfLOiBUoDY4bvA',
    badge: '🔥 STARTER',
    badgeZh: '🔥 入门',
    features: [
        '1,000 Credits (100 Images)',
        'Standard Speed',
        'Commercial License',
        'Never Expires'
    ],
    featuresZh: [
        '1,000 积分（100 张图）',
        '标准速度',
        '商用授权',
        '永不过期'
    ]
};

// 月卡 - Pro Monthly (主推)
export const PLAN_PRO_MONTHLY: PricingPlan = {
    id: 'pro_monthly',
    name: 'Pro Monthly',
    nameZh: '专业月卡',
    description: 'For serious creators',
    descriptionZh: '创作者必备',
    price: 19.99,
    originalPrice: 49.99,    // 60% OFF
    credits: 4000,           // 400张
    type: 'subscription',
    interval: 'month',
    productId: 'prod_2h2XD4fHGPJpaw10Ejl1Ln',
    badge: '💎 BEST VALUE',
    badgeZh: '💎 超值之选',
    isPopular: true,
    features: [
        '4,000 Credits/Month (400 Images)',
        'Priority Generation',
        'Private Mode',
        'Unused Credits Rollover'
    ],
    featuresZh: [
        '每月 4,000 积分（400 张图）',
        '优先生成队列',
        '私密模式',
        '积分次月可累积'
    ]
};

// 年卡 - Pro Yearly (高利润)
export const PLAN_PRO_YEARLY: PricingPlan = {
    id: 'pro_yearly',
    name: 'Ultra Year',
    nameZh: '旗舰年卡',
    description: 'Maximum value for power users',
    descriptionZh: '重度用户首选',
    price: 89.99,
    originalPrice: 299.99,   // 70% OFF
    credits: 30000,          // 3000张
    type: 'subscription',
    interval: 'year',
    productId: 'prod_25UgT96PYWLilva3hf3P00',
    badge: '⚡️ -70% DEAL',
    badgeZh: '⚡️ 限时7折',
    features: [
        '30,000 Credits/Year (3,000 Images)',
        'Highest Priority',
        'Early Access to Video Models',
        'VIP Support'
    ],
    featuresZh: [
        '年度 30,000 积分（3,000 张图）',
        '最高优先级',
        '视频模型抢先体验',
        'VIP 专属客服'
    ]
};

// 所有套餐
export const ALL_PLANS = [PLAN_STARTER, PLAN_PRO_MONTHLY, PLAN_PRO_YEARLY];

// 兼容旧代码的别名
export const PLAN_MINI = PLAN_STARTER;
export const PLAN_ANCHOR = PLAN_PRO_YEARLY;

// 计算单张成本
export function calculateCostPerGeneration(plan: PricingPlan): number {
    const generations = plan.credits / CREDITS_PER_GENERATION;
    return plan.price / generations;
}

// 计算折扣百分比
export function calculateDiscount(plan: PricingPlan): number {
    if (plan.originalPrice <= plan.price) return 0;
    return Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100);
}

// 获取本地化套餐信息
export function getLocalizedPlan(plan: PricingPlan, locale: string) {
    const isZh = locale === 'zh';
    return {
        ...plan,
        displayName: isZh ? plan.nameZh : plan.name,
        displayLabel: isZh ? plan.badgeZh : plan.badge,
        displayDescription: isZh ? plan.descriptionZh : plan.description,
        displayFeatures: isZh ? plan.featuresZh : plan.features,
    };
}
