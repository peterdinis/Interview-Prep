export const pricingList = {
    pricing: [
        {
            planTitle: 'Starter',
            price: '5€',
            description:
                'Get access to basic mock interviews and prepare for entry-level positions.',
                features: [
                    { isActive: true, label: 'Advanced Mock Interviews' },
                    { isActive: true, label: 'You can create 10 mock interviews' },
                ],
            isActive: false,
        },
        {
            planTitle: 'Pro',
            price: '50€',
            description:
                'Prepare for higher-level interviews and improve your chances of success.',
            features: [
                { isActive: true, label: 'Advanced Mock Interviews' },
                { isActive: true, label: 'You can create 50 mock interviews' },
            ],
            isActive: false,
        },
        {
            planTitle: 'Expert',
            price: '150€',
            description:
                'Comprehensive preparation for any interview with unlimited access to all features.',
            features: [
                { isActive: true, label: 'Advanced Mock Interviews' },
                { isActive: true, label: 'Unlimited mock interviews' },
            ],
            isActive: true,
        },
    ],
};
