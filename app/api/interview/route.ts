import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { db } from 'database/db';

export async function POST(req: NextRequest) {
    const { jobPosition, jobDesc, jobExperience } = await req.json();

    try {
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: `Create a mock interview for a ${jobPosition} with experience in ${jobDesc} and ${jobExperience} years of experience.`,
                max_tokens: 150,
                model: "text-davinci-003"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY!}`,
                },
            },
        );
        const mockInterview = openaiResponse.data.choices[0].text.trim();
        const newInterview = await db.interview.create({
            data: {
                jobPosition,
                jobDesc,
                jobExperience,
                mockInterview,
            },
        });

        return NextResponse.json(newInterview, { status: 200 });
    } catch (error) {
        console.error('Error generating mock interview:', error);
        return NextResponse.json(
            { error: 'Error generating mock interview' },
            { status: 500 },
        );
    }
}
