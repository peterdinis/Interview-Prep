'use client';

import { Button, Center, Flex, Link, Text } from '@chakra-ui/react';
import { FC } from 'react';

const NotAllowedWrapper: FC = () => {
    return (
        <>
            <Flex
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Center mt={20}>
                    <Text fontWeight={'bold'} fontSize={36}>
                        You must be logged in first
                    </Text>
                </Center>
                <Button mt={8}>
                    <Link fontSize={22} href='/login'>
                        Login
                    </Link>
                </Button>
            </Flex>
        </>
    );
};

export default NotAllowedWrapper;
