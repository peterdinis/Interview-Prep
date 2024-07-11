'use client';

import { FC, useState, useEffect } from 'react';
import { AppShell } from '@saas-ui/react';
import DashboardSidebar from './DashboardSidebar';
import { Box } from '@chakra-ui/react';
import DashboardContent from './DashboardContent';
import DashboardCards from './cards/DashboardCards';
import SearchInput from '../shared/SearchInput';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const DashboardWrapper: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Do nothing while loading
        if (!session) {
            router.push("/login");
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return <Loader2 className='loader' />
    }

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