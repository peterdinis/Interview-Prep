'use client';

import { FC, Key, useEffect, useState } from 'react';
import { SimpleGrid, Container, Text, Box, Spinner } from '@chakra-ui/react';
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

    const [filteredData, setFilteredData] = useState<
        InterviewsWrapper[] | undefined
    >(undefined);

    // Filter data based on searchQuery
    useEffect(() => {
        if (data?.data) {
            const filteredList = data.data.filter((item: InterviewsWrapper) =>
                item
                    .jobPosition!.toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            );
            setFilteredData(filteredList);
        }
    }, [data, searchQuery]);

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

    return (
        <Container maxW='7xl' p='5' mx='auto'>
            {filteredData && filteredData.length > 0 ? (
                <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={8}>
                    {filteredData.map((item: InterviewsWrapper, index: Key) => (
                        <DashboardCard
                            key={index}
                            createdAt={item.createdAt}
                            jobPosition={item.jobPosition}
                            jobExpirience={item.jobExpirience}
                            jobDesc={item.jobDesc}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Box mt={8} textAlign='center'>
                    <Text fontSize='lg' fontWeight={'bold'}>
                        No Interviews found
                    </Text>
                </Box>
            )}
        </Container>
    );
};

export default DashboardCards;
