"use client"

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
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const InterviewRemoveModal: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const router = useRouter();

    const deleteInterview = () => {
        toast({
            title: 'Interview was deleted.',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })

          router.prefetch("/"); // TODO: Close modal somehow 
    }

    return (
        <>
            <Button onClick={onOpen}>
                <CloseIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Do you want to delete this mock interview ?
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
                        <Button onClick={deleteInterview} colorScheme='red'>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InterviewRemoveModal;
