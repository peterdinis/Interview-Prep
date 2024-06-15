'use client';

import { FC } from 'react';
import { AppShell } from '@saas-ui/react';
import DashboardSidebar from './DashboardSidebar';
import { Box } from '@chakra-ui/react';
import DashboardContent from './DashboardContent';

const DashboardWrapper: FC = () => {
    return (
        <AppShell minH='100vh' mt={20} sidebar={<DashboardSidebar />}>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <DashboardContent />
            </Box>
        </AppShell>
    );
};

export default DashboardWrapper;
