'use client';

import { FC } from 'react';
import { SimpleGrid, Container, Text, Box } from '@chakra-ui/react';
import dashboardList from './dashboard-list';
import DashboardCard from './DashboardCard';
import { Ghost } from 'lucide-react';

interface DashboardCardsProps {
    searchQuery: string;
}

const DashboardCards: FC<DashboardCardsProps> = ({ searchQuery }) => {
    const filteredList = dashboardList().filter((repo) =>
        repo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <Container maxW='7xl' p='5' mx='auto'>
            {filteredList.length > 0 ? (
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
            ) : (
                <Box mt={8} textAlign='center'>
                    <Text fontSize='lg'>
                        <Ghost className='ghost-icon' /> No Interview found
                    </Text>
                </Box>
            )}
        </Container>
    );
};

export default DashboardCards;
