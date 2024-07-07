import { NextRequest, NextResponse } from 'next/server';
import { db } from 'database/db';
import { useCounterStore } from 'app/_store/countStore';
import { Question } from '@prisma/client';

export async function POST(req: NextRequest) {
    try {
        const { jobPosition, jobDesc, jobExperience, numQuestions } =
            await req.json();

        if (!jobPosition || !jobDesc || !jobExperience || !numQuestions) {
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
                    prompt: `Create a mock interview for a ${jobPosition} with experience in ${jobDesc} and ${jobExperience} years of experience. Generate ${numQuestions} questions.`,
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

        const data = await openaiResponse.json();

        if (!data.choices || data.choices.length === 0) {
            return NextResponse.json(
                { error: 'No choices returned from OpenAI API' },
                { status: 500 },
            );
        }

        const generatedText = data.choices[0].text.trim();
        let questions = generatedText
            .split('\n')
            .filter((q: any) => q.trim().length > 0)
            .slice(0, numQuestions); // Limit the number of questions to the requested number

        const newInterview = await db.interview.create({
            data: {
                jobPosition,
                jobDesc,
                jobExperience: jobExperience,
                mockInterview: generatedText,
                questions: {
                    create: questions.map((question: Question) => ({
                        question,
                    })),
                },
            },
            include: {
                questions: true,
            },
        });

        // Decrease the counter using Zustand store
        const decrement = useCounterStore.getState().decrement;
        decrement();
        const remainingCount = useCounterStore.getState().getCount();

        return NextResponse.json(
            { interview: newInterview, remainingCount },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error generating mock interview:', error);
        return NextResponse.json(
            { error: 'Error generating mock interview' },
            { status: 500 },
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { questionId, answer } = await req.json();

        if (!questionId || !answer) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 },
            );
        }

        const updatedQuestion = await db.question.update({
            where: { id: parseInt(questionId) },
            data: { answer },
        });

        return NextResponse.json(updatedQuestion, { status: 200 });
    } catch (error) {
        console.error('Error saving answer:', error);
        return NextResponse.json(
            { error: 'Error saving answer' },
            { status: 500 },
        );
    }
}