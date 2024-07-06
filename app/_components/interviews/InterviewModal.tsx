'use client';

import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Textarea,
    Input,
    Stack,
} from '@chakra-ui/react';
import { FC, FormEvent, useState } from 'react';
import axios from 'axios';
import { useCounterStore } from 'app/_store/countStore';

const InterviewModal: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const { count } = useCounterStore();
    const [jobExperience, setJobExperience] = useState('0');
    const [loading, setLoading] = useState(false);

    const onHandleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('/api/interview', {
                jobPosition,
                jobDesc,
                jobExperience,
            });

            setJobPosition('');
            setJobDesc('');
            setJobExperience('0');
            onClose();
        } catch (error: any) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Text onClick={onOpen} cursor='pointer'>
                New Interview
            </Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        display={'flex'}
                        justifyContent={'center'}
                        fontSize={'2rem'}
                        mt={5}
                        alignItems={'center'}
                    >
                        New Interview
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight={'bold'} color='red.600' p={1}>
                            Tell us more about your job interviewing <br />
                            Add details about your job position/description and
                            more..
                        </Text>
                        <Stack mt={5} spacing={3}>
                            <form onSubmit={onHandleSubmit}>
                                <Text mt={3} fontWeight={'bold'}>
                                    Your Job position / role
                                </Text>
                                <Input
                                    mt={2}
                                    type='text'
                                    required
                                    value={jobPosition}
                                    onChange={(e) =>
                                        setJobPosition(e.target.value)
                                    }
                                    placeholder='Ex. Fullstack developer'
                                />

                                <Text mt={3} fontWeight={'bold'}>
                                    Job Description / stack
                                </Text>
                                <Textarea
                                    mt={2}
                                    required
                                    placeholder='Ex. React Angular Node.js'
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                />

                                <Text mt={3} fontWeight={'bold'}>
                                    Years of experience
                                </Text>
                                <Input
                                    mt={2}
                                    required
                                    type='text'
                                    value={jobExperience}
                                    onChange={(e) =>
                                        setJobExperience(e.target.value)
                                    }
                                />
                                <Button
                                    colorScheme='purple'
                                    mt={4}
                                    type='submit'
                                    disabled={count === 0}
                                    isLoading={loading}
                                >
                                    {count !== 0
                                        ? 'Generate'
                                        : 'You must have paid account to generate more interviews'}
                                </Button>
                            </form>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InterviewModal;
