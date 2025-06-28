import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    const { answers } = await req.json();

    const prompt = `
You're an AI interview coach. A user just completed a mock interview.

For each question and answer, provide:
1. A brief evaluation of the answer.
2. A suggestion to improve it (if necessary).

Then give an overall score (0–100) and final summary advice.

Questions and answers:
${answers
            .map((item: { question: string; answer: string; }, i: number) => `${i + 1}. Q: ${item.question}\nA: ${item.answer}`)
            .join("\n\n")}
`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
    });

    return NextResponse.json({ feedback: completion.choices[0].message.content });
}