'use client';

import { FC, Key } from 'react';
import { SimpleGrid, Container, Text, Box, Spinner } from '@chakra-ui/react';
import dashboardList from './dashboard-list';
import DashboardCard from './DashboardCard';
import { Ghost } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { InterviewsWrapper } from 'app/_types/interviewTypes';

interface DashboardCardsProps {
    searchQuery: string;
}

const DashboardCards: FC<DashboardCardsProps> = ({ searchQuery }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['interviews'],
        queryFn: async () => {
            return await axios.get('/api/interviews');
        },
    });

    if (isLoading) {
        return (
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        );
    }

    if (isError) {
        throw new Error('Something went wrong');
    }

    console.log('D', data?.data!);

    /* const filteredList = data?.data! && data?.data!.filter((repo: {title: string}) =>
        repo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    ); */

    return (
        <Container maxW='7xl' p='5' mx='auto'>
            {data && data.data!.length > 0 ? (
                <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={8}>
                    {data &&
                        data.data!.map(
                            (repo: InterviewsWrapper, index: Key) => (
                                <DashboardCard
                                    key={index}
                                    createdAt={repo.createdAt}
                                    jobPosition={repo.jobPosition}
                                    jobExpirience={repo.jobExpirience}
                                    jobDesc={repo.jobDesc}
                                />
                            ),
                        )}
                </SimpleGrid>
            ) : (
                <Box mt={8} textAlign='center'>
                    <Text fontSize='lg'>
                        <Ghost className='ghost-icon' /> No Interviews found
                    </Text>
                </Box>
            )}
        </Container>
    );
};

export default DashboardCards;
