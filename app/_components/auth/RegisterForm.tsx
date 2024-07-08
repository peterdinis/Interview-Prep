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
import { FC, useState, FormEvent } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

const RegisterForm: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const toast = useToast();

    const registerUserMut = useMutation({
        mutationKey: ["registerUser"],
        mutationFn: async () => {
            await axios.post("/api/register", {
                name,
                email,
                password,
            })
        }
    })

    const registerUser = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            registerUserMut.mutate();
            toast({
                title: 'Successfully register to app',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            router.push('/login');
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
                        Register
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <form onSubmit={registerUser}>
                        <Stack spacing={4}>
                            <FormControl mt={3} id='name' isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    disabled={loading}
                                    type='text'
                                    size={'lg'}
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </FormControl>
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
                                        size={'lg'}
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
                                                setShowPassword(!showPassword)
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
                                    isLoading={loading}
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
