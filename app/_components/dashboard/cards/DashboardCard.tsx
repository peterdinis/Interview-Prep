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
    Text
} from '@chakra-ui/react';

interface DashboardCardProps {
    title: string;
    description: string;
    techStack: string[];
    url: string;
}

const DashboardCard = (props: DashboardCardProps) => {
    const { title, techStack, url } = props;
    const { onOpen} = useDisclosure();

    const handleClick = () => {
        onOpen();
    };

    const handleLinkClick = (
        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
        link: string,
    ) => {
        window.open(link);
        e.stopPropagation();
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
                                    onClick={(e) => handleLinkClick(e, url)}
                                >
                                    {title}
                                </Text>
                            </HStack>
                        </Tooltip>
                    </Flex>
                    <Flex justifyContent='space-between' width='100%'>
                        <Box>
                            <HStack spacing='1'>
                                {techStack!.map((tech, index) => (
                                    <Tag
                                        key={index}
                                        size='sm'
                                        colorScheme='cyan'
                                    >
                                        <Text
                                            fontSize={[
                                                '0.55rem',
                                                'inherit',
                                                'inherit',
                                            ]}
                                        >
                                            {tech}
                                        </Text>
                                    </Tag>
                                ))}
                            </HStack>
                        </Box>
                    </Flex>
                    <Button mt={4} colorScheme='red' display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Link href="/">
                                <Text>Detail</Text>
                        </Link>
                    </Button>
                </VStack>
            </VStack>
        </Box>
    );
};

export default DashboardCard;
