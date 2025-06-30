import { db } from "@/db";
import { interviews, mockInterviews } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { redis } from "@/lib/redis";

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

		// Rate limiting
		const today = new Date().toISOString().slice(0, 10);
		const redisKey = `interview_limit:${user.id}:${today}`;

		const currentCount = await redis.incr(redisKey);
		if (currentCount === 1) {
			await redis.expire(redisKey, 60 * 60 * 24);
		}

		if (currentCount > 4) {
			return NextResponse.json(
				{ error: "Rate limit exceeded: max 4 interviews per day" },
				{ status: 429 },
			);
		}

		const body = await req.json();
		const { position, company, date, level, years, questionsLength } = body;

		if (!position || !company || !date) {
			return NextResponse.json(
				{ error: "Missing required fields: position, company, or date" },
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

		let generatedInterview = "";

		try {
			const completion = await openai.chat.completions.create({
				model: "gpt-4",
				messages: [{ role: "user", content: prompt }],
				temperature: 0.7,
			});

			generatedInterview = completion.choices[0].message.content ?? "";
		} catch (openaiError) {
			console.error("[OPENAI_ERROR]", openaiError);
			return NextResponse.json(
				{ error: "Failed to generate mock interview using OpenAI." },
				{ status: 502 },
			);
		}

		await db.insert(mockInterviews).values({
			id: nanoid(),
			interviewId: newInterview.id,
			content: generatedInterview,
		});

		return NextResponse.json(
			{ interview: newInterview, mockInterview: generatedInterview },
			{ status: 201 },
		);
	} catch (error: any) {
		console.error("[INTERVIEWS_POST]", {
			message: error?.message,
			stack: error?.stack,
			error,
		});
		return NextResponse.json(
			{ error: "Unexpected server error. Please try again later." },
			{ status: 500 },
		);
	}
}
