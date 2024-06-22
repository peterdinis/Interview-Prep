'use client';

import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Link,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { type FC, useState } from 'react';

const Navbar: FC = () => {
    const [scroll] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLargerThanMD] = useMediaQuery('(min-width: 48em)');
    const { data: session } = useSession();
    const descriptionScroll = () => {
        const heroSection = document.querySelector(
            '#description',
        ) as unknown as HTMLElement;
        heroSection.scrollIntoView({ behavior: 'smooth' });
    };

    const loggedUser = session?.user?.email;

    return (
        <Flex
            bg={useColorModeValue('gray.100', 'gray.900')}
            px={4}
            h={16}
            boxShadow={scroll ? 'base' : 'none'}
            zIndex='sticky'
            position='fixed'
            as='header'
            alignItems={'center'}
            justifyContent={'space-between'}
            w='100%'
        >
            <Link href='/'>
                <HStack>
                    <Text fontSize={'1.2rem'} fontWeight={'bold'}>
                        Interview Prep
                    </Text>
                </HStack>
            </Link>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    {isLargerThanMD ? (
                        <>
                            <>
                                {loggedUser ? (
                                    <>
                                        <Button
                                            fontSize={'1.2rem'}
                                            onClick={descriptionScroll}
                                            variant='ghost'
                                        >
                                            {loggedUser}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            fontSize={'1.2rem'}
                                            variant='ghost'
                                        >
                                            <Link href='/login'>Login</Link>
                                        </Button>
                                    </>
                                )}
                            </>
                        </>
                    ) : (
                        <></>
                    )}
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <Moon /> : <Sun />}
                    </Button>

                    {isLargerThanMD ? (
                        <></>
                    ) : (
                        <>
                            <Button
                                as={IconButton}
                                icon={<Menu />}
                                onClick={onOpen}
                            ></Button>
                            <Drawer
                                placement='top'
                                onClose={onClose}
                                isOpen={isOpen}
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerBody>
                                        <>
                                            {loggedUser ? (
                                                <>
                                                    <Button
                                                        fontSize={'1.2rem'}
                                                        onClick={
                                                            descriptionScroll
                                                        }
                                                        variant='ghost'
                                                    >
                                                        {loggedUser}
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        fontSize={'1.2rem'}
                                                        variant='ghost'
                                                    >
                                                        <Link href='/login'>
                                                            Login
                                                        </Link>
                                                    </Button>
                                                </>
                                            )}
                                        </>
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        </>
                    )}
                </Stack>
            </Flex>
        </Flex>
    );
};

export default Navbar;
