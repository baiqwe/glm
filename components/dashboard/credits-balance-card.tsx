import { Coins } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CreditsBalanceCardProps {
    credits: number;
    locale?: string;
}

export function CreditsBalanceCard({ credits, locale = 'en' }: CreditsBalanceCardProps) {
    return (
        <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Coins className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">
                        {locale === 'zh' ? '可用积分' : 'Available Credits'}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{credits}</h3>
                </div>
            </div>

            <div className="mt-6">
                <Link href={`/${locale}/pricing`}>
                    <Button variant="outline" className="w-full">
                        {locale === 'zh' ? '购买更多积分' : 'Buy More Credits'}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
