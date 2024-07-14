'use client';

import {
    Box,
    Button,
    Flex,
    Text,
    VStack,
    useColorMode,
} from '@chakra-ui/react';
import { PricingItemProps } from 'app/_types/pricingTypes';
import { FC, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { pricingList } from './pricingData';

const createCheckoutSession = async (planId: string) => {
    const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
    });
    if (!response.ok) {
        throw new Error('Failed to create checkout session');
    }
    return response.json();
};

const PricingItem: FC<PricingItemProps> = ({ pricing }) => {
    const { planTitle, price, description, features, isActive, planId } =
        pricing; // Ensure planId is included
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    const mutation = useMutation(createCheckoutSession, {
        onSuccess: (data) => {
            const { id } = data;
            const stripe = window.Stripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
            );
            stripe.redirectToCheckout({ sessionId: id });
        },
        onError: (error) => {
            console.error('Error creating checkout session:', error);
        },
    });

    const handleCheckout = () => {
        mutation.mutate(planId);
    };

    return (
        <Box
            bg={isActive ? 'blue.600' : isDarkMode ? 'gray.700' : 'blue.50'}
            color={isActive ? 'white' : isDarkMode ? 'white' : 'black'}
            borderRadius='2xl'
            shadow='md'
            p={8}
            h='full'
        >
            <Text fontSize='3xl' fontWeight='bold' mb={2}>
                {planTitle}
            </Text>
            <Box mb={4}>
                <Text fontSize='3xl' fontWeight='bold'>
                    {price}
                </Text>
            </Box>
            <Text opacity={0.7} mb={6}>
                {description}
            </Text>
            <VStack align='start' spacing={4}>
                {features.map((item, i) => (
                    <Flex align='center' key={i}>
                        <Text opacity={0.7}>{item.label}</Text>
                    </Flex>
                ))}
            </VStack>
            <Button
                mt={6}
                w='full'
                bg={isActive ? 'white' : 'blue.600'}
                color={isActive ? 'black' : 'white'}
                _hover={{ bg: isActive ? 'gray.200' : 'blue.700' }}
                borderRadius='md'
                onClick={handleCheckout}
            >
                Choose plan
            </Button>
        </Box>
    );
};

const LandingPricing: FC = () => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    const content = useMemo(() => {
        return pricingList.pricing.map((pricing, i) => (
            <Box maxW='md' mt={6} key={i}>
                <PricingItem pricing={pricing} />
            </Box>
        ));
    }, []);

    return (
        <Box
            as='section'
            py={{ base: 14, md: 24 }}
            bg={isDarkMode ? 'gray.800' : 'white'}
            color={isDarkMode ? 'white' : 'black'}
            textAlign='center'
        >
            <Box px={4} mx='auto'>
                <Flex justify='center' mb={12}>
                    <Box maxW='xl'>
                        <Text
                            fontSize={{ base: '3xl', md: '45px' }}
                            fontWeight='bold'
                            mb={4}
                        >
                            Flexible Plan for you
                        </Text>
                    </Box>
                </Flex>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    justify='center'
                    gap={6}
                    mt={6}
                >
                    {content}
                </Flex>
            </Box>
        </Box>
    );
};

export default LandingPricing;
