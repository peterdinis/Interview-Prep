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
    Input,
    Stack,
} from '@chakra-ui/react';
import { FC } from 'react';

const InterviewModal: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                        <Text fontWeight={"bold"} color="red.600" p={1}>Tell me something about your job</Text>
                        <Stack mt={5} spacing={3}>
                            <form>
                                <Text mt={3} fontWeight={'bold'}>
                                    Your Job
                                </Text>
                                <Input mt={2} placeholder='Here is a sample placeholder' />

                                <Text mt={3} fontWeight={'bold'}>
                                    Your Job
                                </Text>
                                <Input mt={2} placeholder='Here is a sample placeholder' />

                                <Text mt={3} fontWeight={'bold'}>
                                    Your Job
                                </Text>
                                <Input mt={2} placeholder='Here is a sample placeholder' />

                                <Text mt={3} fontWeight={'bold'}>
                                    Your Job
                                </Text>
                                <Input mt={2} placeholder='Here is a sample placeholder' />

                                <Text mt={3} fontWeight={'bold'}>
                                    Your Job
                                </Text>
                                <Input mt={2} placeholder='Here is a sample placeholder' />
                            </form>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Generate</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InterviewModal;
