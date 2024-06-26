'use client';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { FC, useState, FormEvent } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginForm: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const loginUser = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast({
                    title: 'Something went wrong',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Successfully login',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                router.push('/dashboard');
            }
        } catch (error) {
            toast({
                title: 'Something went wrong',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={6}>
                        <form onSubmit={loginUser}>
                            <FormControl mt={3} id='email' isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    disabled={loading}
                                    type='email'
                                    size={'lg'}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </FormControl>
                            <FormControl mt={3} id='password' isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        disabled={loading}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        size={'lg'}
                                        value={password}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword(
                                                    (showPassword) =>
                                                        !showPassword,
                                                )
                                            }
                                        >
                                            {showPassword ? (
                                                <ViewIcon />
                                            ) : (
                                                <ViewOffIcon />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack mt={3} spacing={10} pt={2}>
                                <Button
                                    loadingText='Submitting'
                                    size='lg'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type='submit' // Ensure the button submits the form
                                    isLoading={loading} // Display loading state
                                >
                                    Login
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    No account?{' '}
                                    <Link href='/register' color={'blue.400'}>
                                        Register
                                    </Link>
                                </Text>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default LoginForm;
