import { db } from "@/db";
import { interviews, mockInterviews } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: Request) {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const { position, company, date, level, years, questionsLength } = body;

		if (!position || !company || !date) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		const newInterview = {
			id: nanoid(),
			userId: user.id,
			position,
			company,
			date,
			level: level || "",
			years: years || "",
			questionsLength: questionsLength || "",
		};

		await db.insert(interviews).values(newInterview);

		const prompt = `Generate a mock interview for a ${position} role at ${company}. The candidate has ${years || "some"} years of experience at ${level || "an unspecified level"}. Provide ${questionsLength || 5} relevant and realistic interview questions.`;

		const completion = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			temperature: 0.7,
		});

		const generatedInterview = completion.choices[0].message.content ?? "";

		await db.insert(mockInterviews).values({
			id: nanoid(),
			interviewId: newInterview.id,
			content: generatedInterview,
		});

		return NextResponse.json(
			{ interview: newInterview, mockInterview: generatedInterview },
			{ status: 201 },
		);
	} catch (error) {
		console.error("[INTERVIEWS_POST]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}