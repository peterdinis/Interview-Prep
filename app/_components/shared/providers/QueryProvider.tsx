'use client';

import { FC, ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from 'app/_store/queryClient';

interface IQueryProviderProps {
    children?: ReactNode;
}

const QueryProvider: FC<IQueryProviderProps> = ({
    children,
}: IQueryProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default QueryProvider;
