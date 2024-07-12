'use client';

import { FC, Key, useEffect, useState } from 'react';
import { SimpleGrid, Container, Text, Box, Spinner } from '@chakra-ui/react';
import DashboardCard from './DashboardCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { InterviewsWrapper } from 'app/_types/interviewTypes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardPagination from './DashboardPagination';
import { DashboardCardsProps } from 'app/_types/dashboardTypes';

const DashboardCards: FC<DashboardCardsProps> = ({ searchQuery }) => {
    const { data: sessionData, status: sessionStatus } = useSession();
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['interviews'],
        queryFn: async () => {
            return await axios.get('/api/interviews');
        },
    });

    const [filteredData, setFilteredData] = useState<InterviewsWrapper[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 9 as const;

    useEffect(() => {
        if (sessionStatus === 'loading') return;
        if (!sessionData) {
            router.push('/login');
        }
    }, [sessionData, sessionStatus, router]);

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    if (sessionStatus === 'loading' || isLoading) {
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
        return (
            <Box mt={8} textAlign='center'>
                <Text fontSize='lg' fontWeight={'bold'}>
                    Something went wrong
                </Text>
            </Box>
        );
    }

    return (
        <Container maxW='7xl' p='5' mx='auto'>
            {paginatedData.length > 0 ? (
                <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={8}>
                    {paginatedData.map(
                        (item: InterviewsWrapper, index: Key) => (
                            <DashboardCard
                                key={index}
                                interviewId={item.id}
                                createdAt={item.createdAt}
                                jobPosition={item.jobPosition}
                                jobExpirience={item.jobExpirience}
                                jobDesc={item.jobDesc}
                            />
                        ),
                    )}
                </SimpleGrid>
            ) : (
                <Box mt={8} textAlign='center'>
                    <Text fontSize='lg' fontWeight={'bold'}>
                        No Interviews found
                    </Text>
                </Box>
            )}

            <Box
                mt={12}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                p={4}
            >
                <DashboardPagination
                    totalItems={filteredData.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </Box>
        </Container>
    );
};

export default DashboardCards;
