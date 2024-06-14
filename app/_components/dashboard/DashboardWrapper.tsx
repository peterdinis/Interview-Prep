'use client';

import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import {
    AppShell,
    Sidebar,
    SidebarSection,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    SearchInput,
} from '@saas-ui/react';

const DashboardWrapper: FC = () => {
    return (
        <AppShell
            variant='static'
            minH='$100vh'
            sidebar={
                <Sidebar position='sticky' top='56px' toggleBreakpoint='sm'>
                    <SidebarSection>
                        <NavItem>Home</NavItem>
                        <NavItem>Settings</NavItem>
                    </SidebarSection>
                </Sidebar>
            }
        >
            <Box as='main' flex='1' py='2' px='4'>
                Your application content
            </Box>
        </AppShell>
    );
};

export default DashboardWrapper;
