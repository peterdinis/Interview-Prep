'use client';

import {
    Image,
    Stack,
    Text,
    Button,
    CardFooter,
    Card,
    CardBody,
    Heading,
    Box,
} from '@chakra-ui/react';
import { FC } from 'react';

const InterviewCard: FC = () => {
    return (
        <Box
            p={{ base: '4', md: '6' }}
            maxW={{ base: '100%', md: 'container.sm' }}
            mx='auto'
        >
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    alt='Caffe Latte'
                />

                <Stack
                    spacing={{ base: '4', sm: '6' }}
                    p={{ base: '4', sm: '6' }}
                >
                    <CardBody>
                        <Heading size='md'>The perfect latte</Heading>

                        <Text py='2'>
                            Caffè latte is a coffee beverage of Italian origin
                            made with espresso and steamed milk.
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                            Buy Latte
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </Box>
    );
};

export default InterviewCard;
