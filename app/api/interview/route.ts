import { NextRequest, NextResponse } from 'next/server';
import { db } from 'database/db';
import { useCounterStore } from 'app/_store/countStore';

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

        const newInterview = await db.interview.create({
            data: {
                jobPosition,
                jobDesc,
                jobExperience,
                mockInterview: generatedText,
            },
        });

        // Decrease the counter using Zustand store
        const decrement = useCounterStore.getState().decrement;
        decrement();
        const remainingCount = useCounterStore.getState().getCount();

        return NextResponse.json(
            { ...newInterview, remainingCount },
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
