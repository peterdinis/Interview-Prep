'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type QueryProviderProps = {
    children?: ReactNode;
};

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default QueryProvider;