'use client';

import { FC } from 'react';
import { Sidebar, SidebarSection, NavItem } from '@saas-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Icon, Text, useToast } from '@chakra-ui/react';
import { Home, LogOut } from 'lucide-react';
import InterviewModal from '../interviews/InterviewModal';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardSidebar: FC = () => {
    const { data: session } = useSession();
    const loggedUser = session?.user?.email;
    const router = useRouter();
    const toast = useToast();

    const loggedOut = async () => {
        try {
            await signOut({
                redirect: false,
            });
            toast({
                title: 'Successfully logged out',
                duration: 3000,
                isClosable: true,
                status: 'success',
            });
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            toast({
                title: 'Failed to log out',
                description: 'Please try again',
                duration: 3000,
                isClosable: true,
                status: 'error',
            });
        }
    };

    return (
        <Sidebar position='sticky' top='56px' toggleBreakpoint='sm'>
            <SidebarSection>
                <NavItem p={5} mt={5} fontWeight={'bold'} fontSize={'1.3rem'}>
                    <Icon as={Home} boxSize={6} /> <Text ml={4}>Home</Text>
                </NavItem>
                <NavItem p={5} mt={10} fontWeight={'bold'} fontSize={'1.3rem'}>
                    <AddIcon boxSize={6} />{' '}
                    <Text ml={4}>
                        <InterviewModal />
                    </Text>
                </NavItem>
                {loggedUser && (
                    <NavItem
                        p={5}
                        mt={10}
                        fontWeight={'bold'}
                        fontSize={'1.3rem'}
                    >
                        <LogOut /> <Text onClick={loggedOut}>Logout</Text>
                    </NavItem>
                )}
            </SidebarSection>
        </Sidebar>
    );
};

export default DashboardSidebar;
