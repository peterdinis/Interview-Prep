import { db } from "@/db";
import { interviewQuestions } from "@/db/schema";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { interviewId, answers } = body;

		if (!interviewId || !Array.isArray(answers)) {
			return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
		}
 
		const values = answers.map(
			(item: { question: string; answer: string }) => ({
				id: nanoid(),
				interview_id: interviewId,
				question: item.question,
				answer: item.answer,
			}),
		);

		await db.insert(interviewQuestions).values(values);

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (error) {
		console.error("[INTERVIEW_ANSWERS_POST]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
