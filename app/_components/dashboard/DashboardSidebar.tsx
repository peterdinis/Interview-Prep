'use client';

import { FC } from 'react';
import { Sidebar, SidebarSection, NavItem } from '@saas-ui/react';
const DashboardSidebar: FC = () => {
    return (
        <Sidebar position='sticky' top='56px' toggleBreakpoint='sm'>
            <SidebarSection>
                <NavItem p={5} mt={5} fontWeight={"bold"} fontSize={"1.3rem"}>Home</NavItem>
                <NavItem p={5} mt={10} fontWeight={"bold"} fontSize={"1.3rem"}>Settings</NavItem>
            </SidebarSection>
        </Sidebar>
    );
};

export default DashboardSidebar;
