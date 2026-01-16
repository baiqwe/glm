// components/feature/background-collage.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// 12 张高质量拼贴墙素材
const IMAGES = Array.from({ length: 12 }, (_, i) => `/images/collage/${i + 1}.jpg`);

export function BackgroundCollage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-950">
            {/* 核心容器 
                1. opacity-40: 降低透明度，不抢眼
                2. blur-[80px]: 极度模糊，把图片变成色块
                3. saturate-150: 增加饱和度，让色彩更艳丽高级
                4. scale-110: 稍微放大，避免模糊边缘露馅
            */}
            <div className="absolute inset-0 opacity-40 blur-[80px] saturate-150 scale-110 pointer-events-none">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full w-full">
                    {IMAGES.map((src, index) => (
                        <div key={index} className="relative w-full h-full min-h-[300px] overflow-hidden">
                            <Image
                                src={src}
                                alt="Background Art"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 25vw"
                                priority={index < 4}
                            />
                            {/* 给每张图加个遮罩，让它们融合得更好 */}
                            <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
                        </div>
                    ))}
                </div>
            </div>

            {/* 暗角遮罩 (Vignette) & 渐变 - 确保前景文字清晰可读 */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/80" />

            {/* 网格纹理 (可选) - 增加科技秩序感 */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>
    );
}
