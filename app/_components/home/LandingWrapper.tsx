'use client';

import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import Header from '../shared/Header';

const LandingWrapper: FC = () => {
    const descriptionScroll = () => {
        const heroSection = document.querySelector(
            '#description',
        ) as unknown as HTMLElement;
        heroSection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}
                >
                    <Header text="Interview Prep" />
                    <Text color={'gray.500'}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magnam, qui, eos minus ipsum consectetur
                        voluptatum nesciunt, architecto accusamus sapiente
                        dignissimos error reprehenderit perspiciatis velit
                        aliquam inventore voluptate officiis temporibus
                        distinctio.
                    </Text>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}
                    >
                        <Button
                            colorScheme={'green'}
                            bg={'green.400'}
                            rounded={'full'}
                            px={6}
                            _hover={{
                                bg: 'green.500',
                            }}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant={'link'}
                            colorScheme={'blue'}
                            size={'sm'}
                            onClick={descriptionScroll}
                        >
                            How Interview Prep work
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
};

export default LandingWrapper;
