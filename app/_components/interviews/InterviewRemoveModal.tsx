'use client';

import { FC } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    Box,
    Text,
    Spinner
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useMutation} from '@tanstack/react-query';


interface InterviewRemoveModalIProps {
    interviewId: string;
}

const deleteInterview = async(id: string) => {
    const response = await axios.delete(`/api/interview/${id}`);
    return response.data;
}

const InterviewRemoveModal: FC<InterviewRemoveModalIProps> = ({interviewId}: InterviewRemoveModalIProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const router = useRouter();

    const removeMut = useMutation({
        mutationKey: ["removeInterview", interviewId],
        mutationFn: async() => deleteInterview(interviewId)
    });

    if (removeMut.isPending) {
        return (
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        );
    }

    if (removeMut.isError) {
        return (
            <Box mt={8} textAlign='center'>
                <Text fontSize='lg' fontWeight={'bold'}>
                    Something went wrong
                </Text>
            </Box>
        );
    } 
    const removeInterview = () => {
        toast({
            title: 'Interview was deleted.',
            status: 'success',
            duration: 4000,
            isClosable: true,
        });

        removeMut.mutate();
        window.location.reload();
    };

    return (
        <>
            <Button onClick={onOpen}>
                <CloseIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Do you want to delete this mock interview  ?
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur, numquam?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={removeInterview} colorScheme='red'>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InterviewRemoveModal;
