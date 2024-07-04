'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
    Spinner,
    Box,
    Text,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import Header from '../shared/Header';
import Link from 'next/link';
import { format } from 'date-fns';

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

    return (
        <Box mt={8}>
            <Header text={data.jobPosition} />
            <Box textAlign={'center'} mt={2}>
                <Button>
                    <Link href='/dashboard'>Go back</Link>
                </Button>
            </Box>

            <Box mt={3}>
                <Text fontWeight={'bold'} fontSize={'2rem'}>
                    Interview info
                </Text>
            </Box>

            <Accordion mt={3} defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Interview Date
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Interview was created at:{' '}
                        {format(data.createdAt, 'yyyy-MM-dd')}
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Interview Position
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Position is: {data?.jobPosition} with{' '}
                        {data.jobExpirience} years
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Interview questions / answers
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>TODO: Later</AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default InterviewDetail;
