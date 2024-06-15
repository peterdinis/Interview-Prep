'use client';

import { FC } from 'react';
import { AppShell } from '@saas-ui/react';
import DashboardSidebar from './DashboardSidebar';
import { Box } from '@chakra-ui/react';
import DashboardContent from './DashboardContent';
import DashboardCards from './cards/DashboardCards';
import SearchInput from '../shared/SearchInput';

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
            <SearchInput />
            <DashboardCards />
        </AppShell>
    );
};

export default DashboardWrapper;
