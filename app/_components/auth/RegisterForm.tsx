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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './authSchemas';

const RegisterForm: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const router = useRouter();
    const toast = useToast();

    const registerUserMut = useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (data: any) => {
            await axios.post('/api/register', data);
        },
        onSuccess: () => {
            toast({
                title: 'Successfully registered to the app',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            router.push('/login');
        },
        onError: () => {
            toast({
                title: 'Something went wrong',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const onSubmit = (data: any) => {
        registerUserMut.mutate(data);
        reset();
    };

    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Register
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <FormControl mt={3} id='name' isInvalid={!!errors.name}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    {...register('name')}
                                    type='text'
                                    size={'lg'}
                                />
                                {errors.name && (
                                    <Text color='red.500'>{errors.name.message as unknown as ReactNode}</Text>
                                )}
                            </FormControl>
                            <FormControl mt={3} id='email' isInvalid={!!errors.email}>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    {...register('email')}
                                    type='email'
                                    size={'lg'}
                                />
                                {errors.email && (
                                    <Text color='red.500'>{errors.email.message as unknown as ReactNode}</Text>
                                )}
                            </FormControl>
                            <FormControl mt={3} id='password' isInvalid={!!errors.password}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
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
                                    isLoading={registerUserMut.isPending}
                                    type='submit'
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
                                    <Link color={'blue.400'} href='/login'>
                                        Login
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

export default RegisterForm;