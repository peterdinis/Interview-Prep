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
    useToast,
} from '@chakra-ui/react';
import { FC, ReactNode, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './authSchemas';

const LoginForm: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const loginUser = async (data: any) => {
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                ...data,
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
                    title: 'Successfully logged in',
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
                        <form onSubmit={handleSubmit(loginUser)}>
                            <FormControl mt={3} id='email' isInvalid={!!errors.email}>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    disabled={loading}
                                    type='email'
                                    size={'lg'}
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <Text color='red.500'>{errors.email.message as unknown as ReactNode}</Text>
                                )}
                            </FormControl>
                            <FormControl mt={3} id='password' isInvalid={!!errors.password}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        disabled={loading}
                                        {...register('password')}
                                        size={'lg'}
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password && (
                                    <Text color='red.500'>{errors.password.message as unknown as ReactNode}</Text>
                                )}
                            </FormControl>
                            <Stack mt={3} spacing={10} pt={2}>
                                <Button
                                    isLoading={loading}
                                    type='submit'
                                    size='lg'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
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