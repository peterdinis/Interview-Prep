'use client';

import { FC } from 'react';
import { Sidebar, SidebarSection, NavItem } from '@saas-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Icon, Text, useToast } from '@chakra-ui/react';
import { Home, LogOut} from 'lucide-react';
import InterviewModal from '../interviews/InterviewModal';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardSidebar: FC = () => {
    const { data: session } = useSession();
    const loggedUser = session?.user?.email;
    const router = useRouter();
    const toast = useToast();
    
    const loggedOut = () => {
        signOut({
            redirect: true
        });
        toast({
            title: "Successfully logged out",
            duration: 4000,
            isClosable: true,
            status: "success"
        })
        router.push("/login")
    }

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
                    <NavItem p={5} mt={10} fontWeight={'bold'} fontSize={'1.3rem'}>
                    <LogOut /> <Text onClick={loggedOut}>Logout</Text>
                </NavItem>
                )}
            </SidebarSection>
        </Sidebar>
    );
};

export default DashboardSidebar;
