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

const InterviewModal: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExpirience, setJobExpirience] = useState('0');

    const onHandleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
    };

    return (
        <>
            <Text onClick={onOpen}>New Interview</Text>

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
                                    Yeasrs of expirience
                                </Text>
                                <Input
                                    mt={2}
                                    required
                                    type='text'
                                    value={jobExpirience}
                                    onChange={(e) =>
                                        setJobExpirience(e.target.value)
                                    }
                                />
                            </form>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='purple'>Generate</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InterviewModal;
