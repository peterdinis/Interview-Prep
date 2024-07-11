import { QA } from 'app/_types/interviewTypes';

export const parseMockInterview = (text: string): QA[] => {
    const lines = text.split('\n');
    const qaPairs: QA[] = [];
    let currentQuestion = '';
    let currentAnswer = '';

    lines.forEach((line) => {
        if (line.startsWith('Interviewer:')) {
            if (currentQuestion && currentAnswer) {
                qaPairs.push({
                    question: currentQuestion,
                    answer: currentAnswer,
                });
                currentAnswer = '';
            }
            currentQuestion = line.replace('Interviewer:', '').trim();
        } else if (line.startsWith('Candidate:')) {
            currentAnswer = line.replace('Candidate:', '').trim();
        } else if (currentAnswer) {
            currentAnswer += ' ' + line.trim();
        }
    });
    if (currentQuestion && currentAnswer) {
        qaPairs.push({ question: currentQuestion, answer: currentAnswer });
    }

    return qaPairs;
};
