'use client';

import { FC, FormEvent, useState } from 'react';
import axios from 'axios';
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
    Spinner,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Question } from '@prisma/client';
import { useRouter } from 'next/navigation';

const InterviewModal: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('0');
    const [numQuestions, setNumQuestions] = useState(1);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const router = useRouter();
    const queryClient = useQueryClient();

    const createInterviewMutation = useMutation({
        mutationKey: ['createInterview'],
        mutationFn: async (newInterview: {
            jobPosition: string;
            jobDesc: string;
            jobExperience: string;
            numQuestions: number;
        }) => {
            const response = await axios.post('/api/interview', newInterview);
            return response.data;
        },
        onSuccess: (data) => {
            setQuestions(data.interview.questions);
            setJobPosition('');
            setJobDesc('');
            setJobExperience('0');
            setNumQuestions(1);
            queryClient.invalidateQueries({
                queryKey: ["interviews"]
            })
        },
        onError: (error) => {
            console.error('Error creating interview:', error);
        },
    });

    const submitAnswerMutation = useMutation({
        mutationKey: ['submitAnswer'],
        mutationFn: async ({
            questionId,
            answer,
        }: {
            questionId: number;
            answer: string;
        }) => {
            await axios.patch('/api/interview', { questionId, answer });
        },
        onError: (error) => {
            console.error('Error submitting answer:', error);
        },
    });

    const onHandleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createInterviewMutation.mutate({
            jobPosition,
            jobDesc,
            jobExperience,
            numQuestions,
        });
    };

    const onHandleAnswerSubmit = (questionId: number, answer: string) => {
        submitAnswerMutation.mutate({ questionId, answer });
        setAnswers((prev: any) => ({ ...prev, [questionId]: answer }));
        router.prefetch('/dashboard');
    };

    const onSaveInterview = () => {
        onClose();
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
                        display='flex'
                        justifyContent='center'
                        fontSize='2rem'
                        mt={5}
                        alignItems='center'
                    >
                        New Interview
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='bold' color='red.600' p={1}>
                            Tell us more about your job interviewing <br />
                            Add details about your job position/description and
                            more..
                        </Text>
                        <Stack mt={5} spacing={3}>
                            <form onSubmit={onHandleSubmit}>
                                <Text mt={3} fontWeight='bold'>
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

                                <Text mt={3} fontWeight='bold'>
                                    Job Description / stack
                                </Text>
                                <Textarea
                                    mt={2}
                                    required
                                    placeholder='Ex. React Angular Node.js'
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                />

                                <Text mt={3} fontWeight='bold'>
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

                                <Text mt={3} fontWeight='bold'>
                                    Number of Questions (1-10)
                                </Text>
                                <Input
                                    mt={2}
                                    type='number'
                                    min={1}
                                    max={10}
                                    value={numQuestions}
                                    onChange={(e) =>
                                        setNumQuestions(
                                            parseInt(e.target.value),
                                        )
                                    }
                                    required
                                />

                                <Button
                                    colorScheme='purple'
                                    mt={4}
                                    type='submit'
                                    isLoading={
                                        createInterviewMutation.isPending
                                    }
                                >
                                    Generate
                                </Button>
                            </form>
                        </Stack>
                        {createInterviewMutation.isPending && <Spinner />}
                        {questions.length > 0 && (
                            <Stack mt={5} spacing={3}>
                                {questions.map((q: Question, index: number) => (
                                    <div key={q.id}>
                                        <Text mt={3} fontWeight='bold'>
                                            Question {index + 1}
                                        </Text>
                                        <Text mt={2}>{q.question}</Text>
                                        <Textarea
                                            mt={2}
                                            placeholder='Your answer...'
                                            value={answers[q.id] || ''}
                                            onChange={(e) =>
                                                setAnswers((prev) => ({
                                                    ...prev,
                                                    [q.id]: e.target.value,
                                                }))
                                            }
                                            onBlur={() =>
                                                onHandleAnswerSubmit(
                                                    q.id,
                                                    answers[
                                                        q.id
                                                    ] as unknown as string,
                                                )
                                            }
                                        />
                                    </div>
                                ))}
                            </Stack>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={onSaveInterview}
                        >
                            Save Interview
                        </Button>
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