'use client';

import { FC, ReactNode } from 'react';
import { useQueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface IQueryProviderProps {
    children?: ReactNode;
}

const QueryProvider: FC<IQueryProviderProps> = ({
    children,
}: IQueryProviderProps) => {
    const queryClient = useQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default QueryProvider;
