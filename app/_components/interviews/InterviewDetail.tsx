'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spinner, Box, Text } from '@chakra-ui/react';

const InterviewDetail: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['interviewDetail', id],
        queryFn: async () => {
            const response = await axios.get('/interview/' + id);
            return response.data;
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
            <Text fontSize='lg' fontWeight={'bold'}>
              DETAIL
            </Text>
        </Box>
    );
};

export default InterviewDetail;
