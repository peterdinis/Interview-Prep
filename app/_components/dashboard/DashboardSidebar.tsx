"use client"

import { FC } from 'react';
import { Sidebar, SidebarSection, NavItem } from '@saas-ui/react';
const DashboardSidebar: FC = () => {
    return (
        <Sidebar position='sticky' top='56px' toggleBreakpoint='sm'>
            <SidebarSection>
                <NavItem>Home</NavItem>
                <NavItem>Settings</NavItem>
            </SidebarSection>
        </Sidebar>
    );
};

export default DashboardSidebar;
