'use client';

import * as React from 'react';
import {
    Box,
    useColorModeValue,
    VStack,
    HStack,
    Tag,
    useDisclosure,
    Flex,
    Tooltip,
    Button,
    Link,
    Text,
} from '@chakra-ui/react';
import { InterviewsWrapper } from 'app/_types/interviewTypes';

const DashboardCard = (props: InterviewsWrapper) => {
    const { createdAt, jobPosition, jobExpirience, jobDesc } = props;
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
                    </Flex>
                    <Button
                        mt={4}
                        colorScheme='red'
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Link href='/'>
                            <Text>Detail</Text>
                        </Link>
                    </Button>
                </VStack>
            </VStack>
        </Box>
    );
};

export default DashboardCard;
