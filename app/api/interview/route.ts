import { NextRequest, NextResponse } from 'next/server';
import { db } from 'database/db';

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

        // Generate prompt including user answer placeholders
        const prompt = `Create a mock interview for a ${jobPosition} with experience in ${jobDesc} and ${jobExperience} years of experience. Generate ${numQuestions} questions.\n\n`;
        const userAnswers: string[] = [];
        for (let i = 0; i < numQuestions; i++) {
            userAnswers.push(`Answer: `); // Placeholder for user answer
        }
        const promptWithAnswers = prompt + userAnswers.join('\n');

        // Call OpenAI API
        const openaiResponse = await fetch(
            'https://api.openai.com/v1/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    prompt: promptWithAnswers,
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
        const questions = generatedText
            .split('\n')
            .filter((q: string) => q.trim().length > 0)
            .slice(0, numQuestions); // Limit the number of questions to the requested number

        // Create new interview in the database
        const newInterview = await db.interview.create({
            data: {
                jobPosition,
                jobDesc,
                jobExperience: jobExperience,
                mockInterview: generatedText,
                questions: {
                    create: questions.map((question: string, index: number) => ({
                        question,
                        // Include user answer field for each question
                        userAnswer: index < numQuestions ? '' : undefined,
                    })),
                },
            },
            include: {
                questions: true,
            },
        });

        return NextResponse.json({ interview: newInterview }, { status: 200 });
    } catch (error) {
        console.error('Error generating mock interview:', error);
        return NextResponse.json(
            { error: 'Error generating mock interview' },
            { status: 500 },
        );
    }
}