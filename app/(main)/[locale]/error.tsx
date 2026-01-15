'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('common');

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('error')}</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                {error.message || "Something went wrong!"}
                {error.digest && <span className="block text-xs mt-2 opacity-50">Digest: {error.digest}</span>}
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()}>{t('loading')}</Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                    {t('close')}
                </Button>
            </div>
        </div>
    );
}
