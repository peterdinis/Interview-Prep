'use client';

import { FC, useState } from 'react';
import { Box, Flex, Icon, Text, Button, useToast } from '@chakra-ui/react';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Home, LogOut } from 'lucide-react';
import InterviewModal from '../interviews/InterviewModal';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardSidebar: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
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

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Box
            as='nav'
            position='sticky'
            top='56px'
            width={collapsed ? '60px' : '240px'}
            transition='width 0.2s'
            bg='gray.800'
            color='white'
            height='100vh'
        >
            <Flex justifyContent='flex-end' p={3}>
                <Button onClick={toggleCollapse} size='sm'>
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </Button>
            </Flex>
            <Flex
                direction='column'
                alignItems={collapsed ? 'center' : 'flex-start'}
                p={3}
            >
                <Flex
                    align='center'
                    p={5}
                    mt={5}
                    fontWeight='bold'
                    fontSize='1.3rem'
                >
                    <Icon as={Home} boxSize={6} />
                    {!collapsed && <Text ml={4}>Home</Text>}
                </Flex>
                <Flex
                    align='center'
                    p={5}
                    mt={10}
                    fontWeight='bold'
                    fontSize='1.3rem'
                >
                    <AddIcon boxSize={6} />
                    {!collapsed && (
                        <Text ml={4}>
                            <InterviewModal />
                        </Text>
                    )}
                </Flex>
                {loggedUser && (
                    <Flex
                        align='center'
                        p={5}
                        mt={10}
                        fontWeight='bold'
                        fontSize='1.3rem'
                        onClick={loggedOut}
                    >
                        <LogOut />
                        {!collapsed && <Text ml={4}>Logout</Text>}
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default DashboardSidebar;
