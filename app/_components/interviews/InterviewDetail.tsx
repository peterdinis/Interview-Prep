'use client';

import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
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
    Tag,
} from '@chakra-ui/react';
import Header from '../shared/Header';
import Link from 'next/link';
import { format } from 'date-fns';
import { QA } from 'app/_types/interviewTypes';
import { parseMockInterview } from '../_utils/interviewHelpers';
import {
    tagColorScheme,
    answerColorScheme,
} from '../_constants/colorConstants';
import { fetchInterview } from 'app/_store/queries/interviewQueries';

const InterviewDetail: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['interviewDetail', id],
        queryFn: async () => fetchInterview(id),
        staleTime: Infinity,
    });

    const [qaList, setQaList] = useState<QA[]>([]);

    useEffect(() => {
        if (data && data.mockInterview) {
            const parsedQA = parseMockInterview(data.mockInterview);
            setQaList(parsedQA);
        }
    }, [data]);

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

            <Box textAlign={'center'} mt={4}>
                <Tag colorScheme={tagColorScheme}>
                    Blue Question for Interview
                </Tag>
                <Tag colorScheme={answerColorScheme} ml={4}>
                    Green is your answer
                </Tag>
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
                            <Box
                                as='span'
                                fontSize={'1.2rem'}
                                flex='1'
                                textAlign='left'
                            >
                                Interview Date
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Interview was created at:{' '}
                        {format(new Date(data.createdAt), 'yyyy-MM-dd')}
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box
                                as='span'
                                flex='1'
                                fontSize={'1.2rem'}
                                textAlign='left'
                            >
                                Interview Position
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Position is: {data?.jobPosition} with{' '}
                        {data.jobExperience} years of experience
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box
                                as='span'
                                fontSize={'1.2rem'}
                                flex='1'
                                textAlign='left'
                            >
                                Technologies
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>{data?.jobDesc}</AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box
                                as='span'
                                flex='1'
                                fontSize={'1.2rem'}
                                textAlign='left'
                            >
                                Interview questions / answers
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {qaList.map((qa, index) => (
                            <Box key={index} mb={4}>
                                <Text
                                    fontWeight={'bold'}
                                    color={tagColorScheme + '.500'}
                                >
                                    {qa.question}
                                </Text>
                                <Text color={answerColorScheme + '.700'}>
                                    {qa.answer}
                                </Text>
                            </Box>
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default InterviewDetail;
