'use client';

import { FC, useState } from 'react';
import {
    Box,
    Flex,
    Icon,
    Text,
    Button,
    useToast,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    AddIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BellIcon,
} from '@chakra-ui/icons';
import { Home, LogOut } from 'lucide-react';
import InterviewModal from '../interviews/InterviewModal';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from 'app/_store/countStore';

const DashboardSidebar: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { data: session } = useSession();
    const { count } = useCounterStore();
    const loggedUser = session?.user?.email;
    const router = useRouter();
    const toast = useToast();
    const bgColor = useColorModeValue('gray.100', 'gray.800');
    const color = useColorModeValue('black', 'white');
    const hoverBgColor = useColorModeValue('gray.200', 'gray.700');

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
            bg={bgColor}
            color={color}
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
                    _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
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
                    _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
                >
                    <AddIcon boxSize={6} />
                    {!collapsed && (
                        <Text ml={4}>
                            <InterviewModal
                                onSuccess={() => {
                                    // Update count after successful interview creation
                                    const decrement =
                                        useCounterStore.getState().decrement;
                                    decrement();
                                }}
                            />
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
                        _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
                        onClick={loggedOut}
                    >
                        <LogOut />
                        {!collapsed && <Text ml={4}>Logout</Text>}
                    </Flex>
                )}

                {loggedUser && (
                    <Flex
                        align='center'
                        p={5}
                        mt={10}
                        fontWeight='bold'
                        fontSize='1.3rem'
                        _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
                    >
                        <BellIcon />
                        {!collapsed && (
                            <Text ml={4}>
                                You have {count} interview attempts
                            </Text>
                        )}
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default DashboardSidebar;