import PricingClient from "./pricing-client";

export const runtime = 'edge';

export default async function PricingPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    return <PricingClient locale={locale} />;
}
