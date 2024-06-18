'use client';

import { FC } from 'react';
import { Sidebar, SidebarSection, NavItem } from '@saas-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Icon, Text } from '@chakra-ui/react';
import { Home, Settings } from 'lucide-react';
import InterviewModal from '../interviews/InterviewModal';

const DashboardSidebar: FC = () => {
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
            </SidebarSection>
        </Sidebar>
    );
};

export default DashboardSidebar;
