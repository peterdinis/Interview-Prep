'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spinner, Box, Text, Button } from '@chakra-ui/react';
import Header from '../shared/Header';
import Link from 'next/link';

const fetchInterview = async (id: string) => {
    const response = await axios.get(`/api/interview/${id}`);
    return response.data;
};

const InterviewDetail: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['interviewDetail', id],
        queryFn: async () => fetchInterview(id),
        staleTime: Infinity,
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
        return (
            <Box mt={8} textAlign='center'>
                <Text fontSize='lg' fontWeight={'bold'}>
                    Something went wrong
                </Text>
            </Box>
        );
    }

    console.log('D', data);

    return (
        <Box mt={8} textAlign='center'>
            <Header text={data.jobPosition} />
            <Box mt={2}>
                <Button>
                    <Link href="/dashboard">Go back</Link>
                </Button>
            </Box>
        </Box>
    );
};

export default InterviewDetail;
