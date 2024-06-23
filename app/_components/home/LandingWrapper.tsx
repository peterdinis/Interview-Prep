'use client';

import {
    Box,
    Container,
    Text,
    Button,
    Stack,
    Flex,
    Link,
} from '@chakra-ui/react';
import { FC } from 'react';
import Header from '../shared/Header';

const LandingWrapper: FC = () => {
    return (
        <>
            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}
                >
                    <Header text='Interview Prep' />
                    <Text color={'gray.500'}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magnam, qui, eos minus ipsum consectetur
                        voluptatum nesciunt, architecto accusamus sapiente
                        dignissimos error reprehenderit perspiciatis velit
                        aliquam inventore voluptate officiis temporibus
                        distinctio.
                    </Text>
                    <Flex alignContent={'top'} justifyContent={'center'}>
                        <Stack
                            direction={'column'}
                            spacing={3}
                            align={'center'}
                            alignSelf={'center'}
                            position={'relative'}
                        >
                            <Button
                                colorScheme={'green'}
                                bg={'green.500'}
                                fontSize={'1.3rem'}
                                rounded={'full'}
                                px={6}
                                _hover={{
                                    bg: 'green.600',
                                }}
                            >
                                <Link
                                    textUnderlineOffset={'auto'}
                                    href='/login'
                                >
                                    Get Started
                                </Link>
                            </Button>
                            <Button
                                colorScheme={'green'}
                                bg={'blue.500'}
                                rounded={'full'}
                                fontSize={'1.3rem'}
                                px={6}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                            >
                                How Interview Prep work
                            </Button>
                        </Stack>
                    </Flex>
                </Stack>
            </Container>
        </>
    );
};

export default LandingWrapper;
