'use client';

import { FC } from 'react';
import { SimpleGrid, Container } from '@chakra-ui/react';
import dashboardList from './dashboard-list';
import DashboardCard from './DashboardCard';

interface DashboardCardsProps {
    searchQuery: string;
}

const DashboardCards: FC<DashboardCardsProps> = ({ searchQuery }) => {
    const filteredList = dashboardList().filter(repo =>
        repo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container maxW='7xl' p='5' mx='auto'>
            <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={8}>
                {filteredList.map((repo, index) => (
                    <DashboardCard
                        key={index}
                        title={repo.title}
                        description={repo.description}
                        techStack={repo.techStack}
                        url={repo.url}
                    />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default DashboardCards;