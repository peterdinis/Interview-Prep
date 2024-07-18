import { NextRequest, NextResponse } from 'next/server';
import { db } from 'database/db';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';
import { CustomSession } from 'app/_types/sessionTypes';

interface OpenAIResponse {
    choices: Array<{ text: string }>;
}

export async function POST(req: NextRequest) {
    try {
        const {
            jobPosition,
            jobDesc,
            jobExperience,
            numQuestions,
            showQuestions,
        }: {
            jobPosition: string;
            jobDesc: string;
            jobExperience: string;
            numQuestions: number;
            showQuestions: boolean;
        } = await req.json();

        // Get the session
        const session = (await getServerSession(authOptions)) as CustomSession;

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 },
            );
        }

        const userId = session.user.id;

        if (
            !jobPosition ||
            !jobDesc ||
            !jobExperience ||
            (showQuestions && !numQuestions)
        ) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 },
            );
        }

        const openaiResponse = await fetch(
            'https://api.openai.com/v1/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    prompt: showQuestions
                        ? `Create a mock interview for a ${jobPosition} with experience in ${jobDesc} and ${jobExperience} years of experience. Generate ${numQuestions} questions. Do not generate answers.`
                        : `Create a mock interview for a ${jobPosition} with experience in ${jobDesc} and ${jobExperience} years of experience. Generate ${numQuestions} questions with detailed answers.`,
                    model: 'gpt-3.5-turbo-instruct',
                    max_tokens: 2048,
                    n: 1,
                    temperature: 0.7,
                }),
            },
        );

        if (!openaiResponse.ok) {
            const errorText = await openaiResponse.text();
            console.error('OpenAI API error:', errorText);
            return NextResponse.json(
                { error: 'Error generating mock interview from OpenAI API' },
                { status: openaiResponse.status },
            );
        }

        const data: OpenAIResponse = await openaiResponse.json();

        if (!data.choices || data.choices.length === 0) {
            return NextResponse.json(
                { error: 'No choices returned from OpenAI API' },
                { status: 500 },
            );
        }

        const generatedText = data.choices[0]!.text.trim();
        let questions: string[] = [];
        let answers: string[] = [];

        if (showQuestions) {
            questions = generatedText
                .split('\n')
                .filter((q) => q.trim().length > 0)
                .slice(0, numQuestions); // Limit the number of questions to the requested number
        } else {
            const qnaPairs = generatedText
                .split('\n\n')
                .filter((qna) => qna.trim().length > 0)
                .slice(0, numQuestions); // Limit the number of questions to the requested number

            qnaPairs.forEach((pair) => {
                const [question, ...answerParts] = pair.split('\n');
                const answer = answerParts.join(' ').trim();
                if (question && answer) {
                    questions.push(question.trim());
                    answers.push(answer);
                }
            });
        }

        const newInterview = await db.interview.create({
            data: {
                jobPosition,
                jobDesc,
                jobExperience,
                mockInterview: generatedText,
                userId,
                questions: {
                    create: questions.map((question, index) => ({
                        question,
                        answer: showQuestions ? '' : answers[index] || '',
                    })),
                },
            },
            include: {
                questions: true,
            },
        });

        return NextResponse.json({ interview: newInterview }, { status: 200 });
    } catch (error: unknown) {
        console.error('Error generating mock interview:', error);
        return NextResponse.json(
            { error: 'Error generating mock interview' },
            { status: 500 },
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { questionId, answer }: { questionId: number; answer: string } = await req.json();

        if (!questionId || !answer) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 },
            );
        }

        const updatedQuestion = await db.question.update({
            where: { id: questionId },
            data: { answer },
        });

        return NextResponse.json(updatedQuestion, { status: 200 });
    } catch (error: unknown) {
        console.error('Error saving answer:', error);
        return NextResponse.json(
            { error: 'Error saving answer' },
            { status: 500 },
        );
    }
}
