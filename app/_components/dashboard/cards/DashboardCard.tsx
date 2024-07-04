'use client';

import { format } from 'date-fns';
import {
    Box,
    useColorModeValue,
    VStack,
    HStack,
    useDisclosure,
    Flex,
    Tooltip,
    Button,
    Link,
    Text,
} from '@chakra-ui/react';
import { InterviewsWrapper } from 'app/_types/interviewTypes';
import InterviewRemoveModal from 'app/_components/interviews/InterviewRemoveModal';

const DashboardCard = (props: InterviewsWrapper) => {
    const { interviewId, jobPosition, createdAt } = props;
    const { onOpen } = useDisclosure();

    const handleClick = () => {
        onOpen();
    };

    return (
        <Box onClick={handleClick} cursor='pointer'>
            <VStack
                rounded='xl'
                borderWidth='1px'
                bg={useColorModeValue('white', 'gray.800')}
                borderColor={useColorModeValue('gray.100', 'gray.700')}
                _hover={{
                    shadow: 'lg',
                    textDecoration: 'none',
                }}
                overflow='hidden'
                align='start'
                spacing={0}
            >
                <VStack py={2} px={[2, 4]} spacing={1} align='start' w='100%'>
                    <Flex justifyContent='space-between' width='100%'>
                        <Tooltip hasArrow label='Github link' placement='top'>
                            <HStack>
                                <Text
                                    fontSize='lg'
                                    noOfLines={1}
                                    fontWeight='600'
                                    align='left'
                                >
                                    {jobPosition}
                                </Text>
                            </HStack>
                        </Tooltip>
                        <Text>
                            {format(
                                new Date(createdAt as unknown as string),
                                'yyyy-MM-dd',
                            )}
                        </Text>
                    </Flex>
                    <Flex
                        width='100%'
                        mt={4}
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Button
                            disabled={true}
                            colorScheme='red'
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Link href={`/interview/${interviewId}`}>
                                <Text>Interview Detail</Text>
                            </Link>
                        </Button>
                        <Box>
                            <InterviewRemoveModal interviewId={interviewId as unknown as string} />
                        </Box>
                    </Flex>
                </VStack>
            </VStack>
        </Box>
    );
};

export default DashboardCard;
