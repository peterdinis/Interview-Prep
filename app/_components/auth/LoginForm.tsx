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
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginForm: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const loginUser = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            toast.success("Login successfully");
            router.push("/dashboard");
        } catch (error) {
            toast.error('Something went wrong');
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
                    <Stack spacing={4}>
                        <form onSubmit={loginUser}>
                            <FormControl id='email' isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    disabled={loading}
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </FormControl>
                            <FormControl id='password' isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        disabled={loading}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
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
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText='Submitting'
                                    size='lg'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user?{' '}
                                    <Link color={'blue.400'}>Login</Link>
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
