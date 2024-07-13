export const pricingList = {
    pricing: [
        {
            planTitle: 'Starter',
            price: '5€',
            description:
                'Get access to basic mock interviews and prepare for entry-level positions.',
            features: [
                { isActive: true, label: 'Basic Mock Interviews' },
                { isActive: true, label: 'Access to 10 Questions' },
                { isActive: false, label: 'Performance Analysis' },
                { isActive: false, label: 'Advanced Simulations' },
                { isActive: false, label: '24/7 Support' },
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
                { isActive: true, label: 'Access to 50 Questions' },
                { isActive: true, label: 'Performance Analysis' },
                { isActive: true, label: 'Advanced Simulations' },
                { isActive: false, label: '24/7 Support' },
            ],
            isActive: false,
        },
        {
            planTitle: 'Expert',
            price: '150€',
            description:
                'Comprehensive preparation for any interview with unlimited access to all features.',
            features: [
                { isActive: true, label: 'Unlimited Mock Interviews' },
                { isActive: true, label: 'Access to Unlimited Questions' },
                { isActive: true, label: 'Performance Analysis' },
                { isActive: true, label: 'Advanced Simulations' },
                { isActive: true, label: '24/7 Support' },
            ],
            isActive: true,
        },
    ],
};
