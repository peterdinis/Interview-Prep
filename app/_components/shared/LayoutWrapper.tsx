'use client';

import { Box, Spinner } from '@chakra-ui/react';
import { Suspense, type FC, type ReactNode } from 'react';

interface ILayoutProps {
    children?: ReactNode;
}

const LayoutWrapper: FC<ILayoutProps> = ({ children }: ILayoutProps) => {
    return (
        <Box
            px={{ base: '6', md: '6', lg: '20', sm: '10', xl: '28' }}
            pb='0'
            mx='auto'
            pt={{ base: '8', sm: '16', md: '20' }}
        >
            <Suspense
                fallback={
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                }
            >
                {children}
            </Suspense>
        </Box>
    );
};

export default LayoutWrapper;
