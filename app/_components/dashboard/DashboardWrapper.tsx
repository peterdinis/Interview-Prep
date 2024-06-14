'use client';

import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import {
    AppShell,
} from '@saas-ui/react';
import DashboardContent from './DashboardContent';
import DashboardSidebar from './DashboardSidebar';

const DashboardWrapper: FC = () => {
    return (
        <AppShell
            variant='static'
            minH='$100vh'
            maxW={'6xl'} mt={20}
            sidebar={<DashboardSidebar />}
        >
            <Box as='main' flex='1' py='2' px='4'>
                <DashboardContent />
            </Box>
        </AppShell>
    );
};

export default DashboardWrapper;
