'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface IChakraUiProviderProps {
    children?: ReactNode;
}

const ChakraUiProvider: FC<IChakraUiProviderProps> = ({
    children,
}: IChakraUiProviderProps) => {
    return <ChakraProvider>{children}</ChakraProvider>;
};

export default ChakraUiProvider;
