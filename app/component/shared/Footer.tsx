'use client';

import { Box, Container, Stack, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

const Footer: FC = () => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}
            >
                <Stack direction={'row'} spacing={6}>
                    <Box as='a' href={'#'}>
                        Home
                    </Box>
                    <Box as='a' href={'#'}>
                        About
                    </Box>
                    <Box as='a' href={'#'}>
                        Blog
                    </Box>
                    <Box as='a' href={'#'}>
                        Contact
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
