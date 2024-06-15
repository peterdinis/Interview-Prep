'use client';

import { SaasProvider } from '@saas-ui/react';
import { FC, ReactNode } from 'react';

interface ISassUiProviderProps {
    children?: ReactNode;
}

const SassUiProvider: FC<ISassUiProviderProps> = ({
    children,
}: ISassUiProviderProps) => {
    return <SaasProvider>{children}</SaasProvider>;
};

export default SassUiProvider;
