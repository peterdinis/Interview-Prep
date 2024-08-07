'use client';

import { FC, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    useToast,
    useColorModeValue,
    Tooltip,
} from '@chakra-ui/react';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { LogOut } from 'lucide-react';
import InterviewModal from '../interviews/InterviewModal';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const DashboardSidebar: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session } = useSession();
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <motion.div transition={{ duration: 0.5 }}>
            <Box
                as='nav'
                position='sticky'
                top='56px'
                bg={bgColor}
                color={color}
                height='100vh'
                overflow='hidden'
            >
                <Flex justifyContent='flex-end' p={3}>
                    <Button onClick={toggleCollapse} size='sm'>
                        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </Button>
                </Flex>
                <Flex direction='column' alignItems='flex-start' p={3}>
                    <Flex
                        align='center'
                        p={5}
                        mt={10}
                        fontWeight='bold'
                        fontSize='1.3rem'
                        _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
                        width='100%'
                        onClick={openModal}
                    >
                        <Tooltip hasArrow label='New Interview'>
                            <AddIcon boxSize={collapsed ? 8 : 6} />
                        </Tooltip>
                        <motion.div
                            initial={{ opacity: collapsed ? 0 : 1 }}
                            animate={{ opacity: collapsed ? 0 : 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {!collapsed && <Text ml={4}>Add Interview</Text>}
                        </motion.div>
                    </Flex>
                    {loggedUser && (
                        <Flex
                            align='center'
                            p={5}
                            mt={10}
                            fontWeight='bold'
                            fontSize='1.3rem'
                            _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
                            width='100%'
                            onClick={loggedOut}
                        >
                            <Tooltip hasArrow label='Logout'>
                                <LogOut size={collapsed ? 30 : 24} />
                            </Tooltip>
                            <motion.div
                                initial={{ opacity: collapsed ? 0 : 1 }}
                                animate={{ opacity: collapsed ? 0 : 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {!collapsed && <Text ml={4}>Logout</Text>}
                            </motion.div>
                        </Flex>
                    )}
                </Flex>
                <InterviewModal isOpen={isModalOpen} onClose={closeModal} />
            </Box>
        </motion.div>
    );
};

export default DashboardSidebar;
