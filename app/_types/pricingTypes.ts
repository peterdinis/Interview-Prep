export interface Feature {
    isActive: boolean;
    label: string;
}

export interface Pricing {
    planTitle: string;
    price: string;
    description: string;
    features: Feature[];
    isActive: boolean;
}

export interface PricingItemProps {
    pricing: Pricing;
}
