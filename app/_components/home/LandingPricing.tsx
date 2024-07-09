'use client';

import {
    Box,
    Button,
    Flex,
    Text,
    VStack,
    useColorMode,
} from '@chakra-ui/react';
import {  PricingItemProps } from 'app/_types/pricingTypes';
import { FC, useState } from 'react';
import { pricingList } from './pricingData';

const PricingItem: FC<PricingItemProps> = ({ pricing }) => {
    const { planTitle, price, timeline, description, features, isActive } =
        pricing;
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

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
                <Text ml={2} opacity={0.7}>
                    {timeline}
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
            >
                Choose plan
            </Button>
        </Box>
    );
};

const LandingPricing: FC = () => {
    const [activeTimeline,] = useState('yearly');
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    let content = null;
    if (activeTimeline === 'monthly') {
        content = pricingList.monthlyPricings.map((pricing, i) => (
            <Box maxW='md' mt={6} key={i}>
                <PricingItem pricing={pricing} />
            </Box>
        ));
    }
    if (activeTimeline === 'yearly') {
        content = pricingList.yearlyPricings.map((pricing, i) => (
            <Box maxW='md' mt={6} key={i}>
                <PricingItem pricing={pricing} />
            </Box>
        ));
    }

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
