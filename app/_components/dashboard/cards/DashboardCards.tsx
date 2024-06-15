'use client';

import { FC } from 'react';
import { SimpleGrid, Container } from '@chakra-ui/react';
import dashboardList from './dashboard-list';
import DashboardCard from './DashboardCard';

const DashboardCards: FC = () => {
    return (
        <Container maxW='7xl' p='5' mx='auto'>
            <SimpleGrid columns={[1, 2]} spacing={4} mt={8}>
                {dashboardList().map((repo, index) => (
                    <DashboardCard
                        key={index}
                        title={repo.title}
                        description={repo.description}
                        cover={repo.cover}
                        techStack={repo.techStack}
                        url={repo.url}
                        stargazers_count={repo.stargazers_count}
                    />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default DashboardCards;
