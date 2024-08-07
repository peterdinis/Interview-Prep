export type InterviewsWrapper = {
    createdAt?: string | Date;
    interviewId?: string;
    id?: string;
    jobDesc?: string;
    jobExpirience?: string;
    jobPosition?: string;
    mockInterview?: string;
    updatedAt?: string | Date;
    userId?: string;
};

export interface Answer {
    [questionId: string]: string;
}

export interface QA {
    question: string;
    answer: string;
}
