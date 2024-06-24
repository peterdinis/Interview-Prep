'use client';

import { FC, useEffect, useState } from 'react';
import { AppShell } from '@saas-ui/react';
import DashboardSidebar from './DashboardSidebar';
import { Box } from '@chakra-ui/react';
import DashboardContent from './DashboardContent';
import DashboardCards from './cards/DashboardCards';
import SearchInput from '../shared/SearchInput';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardWrapper: FC = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!session) {
            router.push('/not-allowed');
        }
    }, [session]);

    return (
        <AppShell minH='100vh' mt={20} sidebar={<DashboardSidebar />}>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <DashboardContent />
            </Box>
            <SearchInput setSearchQuery={setSearchQuery} />
            <DashboardCards searchQuery={searchQuery} />
        </AppShell>
    );
};

export default DashboardWrapper;