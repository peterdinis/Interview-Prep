'use client';

import React, { FC } from 'react';
import {
    Box,
    chakra,
    Container,
    Text,
    HStack,
    VStack,
    Flex,
    useColorModeValue,
    useBreakpointValue,
} from '@chakra-ui/react';
import Header from '../shared/Header';

const milestones = [
    {
        id: 1,
        date: 'Step 1',
        title: 'Sign Up and Create Profile',
        description: `Users sign up and create a detailed profile to tailor the interview preparation experience to their needs.`,
    },
    {
        id: 2,
        date: 'Step 2',
        title: 'Create mock interview',
        description: `Test your knowledge on a mock interview so that you can star in the real interview.`,
    },
    {
        id: 3,
        date: 'Step 3',
        title: 'After experience, you will succeed in a real interview',
        description: `Try try try and you'll see 😉`,
    },
];

const LandingInfo: FC = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const isDesktop = useBreakpointValue({ base: false, md: true });

    return (
        <Container id='description' maxWidth='7xl' p={{ base: 2, sm: 10 }}>
            <Header text='How InterviewPrep Works' />
            {milestones.map((milestone) => (
                <Flex key={milestone.id} mb='10px'>
                    {/* Desktop view(left card) */}
                    {isDesktop && milestone.id % 2 === 0 && (
                        <>
                            <EmptyCard />
                            <LineWithDot />
                            <Card {...milestone} />
                        </>
                    )}

                    {/* Mobile view */}
                    {isMobile && (
                        <>
                            <LineWithDot />
                            <Card {...milestone} />
                        </>
                    )}

                    {/* Desktop view(right card) */}
                    {isDesktop && milestone.id % 2 !== 0 && (
                        <>
                            <Card {...milestone} />

                            <LineWithDot />
                            <EmptyCard />
                        </>
                    )}
                </Flex>
            ))}
        </Container>
    );
};

interface CardProps {
    id: number;
    title: string;
    description: string;
    date: string;
}

const Card = ({ id, title, description, date }: CardProps) => {
    const isEvenId = id % 2 == 0;
    let borderWidthValue = isEvenId ? '15px 15px 15px 0' : '15px 0 15px 15px';
    let leftValue = isEvenId ? '-15px' : 'unset';
    let rightValue = isEvenId ? 'unset' : '-15px';

    const isMobile = useBreakpointValue({ base: true, md: false });
    if (isMobile) {
        leftValue = '-15px';
        rightValue = 'unset';
        borderWidthValue = '15px 15px 15px 0';
    }

    return (
        <HStack
            flex={1}
            p={{ base: 3, sm: 6 }}
            bg={useColorModeValue('gray.100', 'gray.800')}
            spacing={5}
            rounded='lg'
            alignItems='center'
            pos='relative'
            _before={{
                content: `""`,
                w: '0',
                h: '0',
                borderColor: `transparent ${useColorModeValue('#edf2f6', '#1a202c')} transparent`,
                borderStyle: 'solid',
                borderWidth: borderWidthValue,
                position: 'absolute',
                left: leftValue,
                right: rightValue,
                display: 'block',
            }}
        >
            <Box>
                <Text fontSize='lg' color={isEvenId ? 'teal.400' : 'blue.400'}>
                    {date}
                </Text>

                <VStack spacing={2} mb={3} textAlign='left'>
                    <chakra.h1
                        fontSize='2xl'
                        lineHeight={1.2}
                        fontWeight='bold'
                        w='100%'
                    >
                        {title}
                    </chakra.h1>
                    <Text fontSize='1rem' mt={2}>{description}</Text>
                </VStack>
            </Box>
        </HStack>
    );
};

const LineWithDot = () => {
    return (
        <Flex
            pos='relative'
            alignItems='center'
            mr={{ base: '40px', md: '40px' }}
            ml={{ base: '0', md: '40px' }}
        >
            <chakra.span
                position='absolute'
                left='50%'
                height='calc(100% + 10px)'
                border='1px solid'
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                top='0px'
            ></chakra.span>
            <Box pos='relative' p='10px'>
                <Box
                    pos='absolute'
                    top='0'
                    left='0'
                    bottom='0'
                    right='0'
                    width='100%'
                    height='100%'
                    backgroundSize='cover'
                    backgroundRepeat='no-repeat'
                    backgroundPosition='center center'
                    bg={useColorModeValue('gray.600', 'gray.200')}
                    borderRadius='100px'
                    backgroundImage='none'
                    opacity={1}
                ></Box>
            </Box>
        </Flex>
    );
};

const EmptyCard = () => {
    return (
        <Box
            flex={{ base: 0, md: 1 }}
            p={{ base: 0, md: 6 }}
            bg='transparent'
        ></Box>
    );
};

export default LandingInfo;
