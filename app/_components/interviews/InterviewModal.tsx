'use client';

import { chatSession } from '@/app/_utils/gemini-ai';
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
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [jobExperience, setJobExperience] = useState("0");
    const [result, setResult] = useState<string | null>(null);
    const [jsonResponse, setJsonResponse] = useState([]);

    const onHandleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const inputPrompt = `Job position: ${jobPosition} JobDescription: ${jobDesc} Years of experience: ${jobExperience}`;

        try {
            const response = await chatSession.sendMessage(inputPrompt);
            const text = (response.response.text()).replace('``json``', '');
            console.log(JSON.parse(text));
            setLoading(false);
            setResult(text);
            console.log(text);
        } catch (error) {
            setLoading(true);
            console.error("Error:", error);
        }
    };

    console.log(jobDesc, jobPosition, jobExperience);

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
                            Add details about your job position/description and more..
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
                                    onChange={(e) => setJobPosition(e.target.value)}
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
                                    onChange={(e) => setJobExperience(e.target.value)}
                                />

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button disabled={loading} colorScheme='purple' type='submit'>Generate</Button>
                                </ModalFooter>
                            </form>
                        </Stack>
                        {result && (
                            <Text mt={5} fontWeight={'bold'} color='green.600'>
                                {result}
                            </Text>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InterviewModal;