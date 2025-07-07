import { db } from "@/db";
import { interviews, mockInterviews, users } from "@/db/schema";
import { redis } from "@/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function POST(req: Request) {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Get the user's plan from the DB
		const dbUser = await db.query.users.findFirst({
			where: eq(users.id, user.id),
		});

		if (!dbUser) {
			return NextResponse.json(
				{ error: "User not found in database" },
				{ status: 404 },
			);
		}

		const isPro = dbUser.plan === "pro" || dbUser.plan === "enterprise";

		// Rate limit only free users
		if (!isPro) {
			const today = new Date().toISOString().split("T")[0];
			const rateLimitKey = `interview_limit:${user.id}:${today}`;
			const count = await redis.incr(rateLimitKey);

			if (count === 1) {
				await redis.expire(rateLimitKey, 60 * 60 * 24); // 24 hours
			}

			if (count > 4) {
				return NextResponse.json(
					{ error: "Rate limit exceeded: max 4 interviews per day" },
					{ status: 429 },
				);
			}
		}

		const body = await req.json();
		const {
			position,
			company,
			date,
			level = "",
			years = "",
			questionsLength = 5,
		} = body;

		if (!position || !company || !date) {
			return NextResponse.json(
				{ error: "Missing required fields: position, company, or date" },
				{ status: 400 },
			);
		}

		const interviewId = nanoid();

		const newInterview = {
			id: interviewId,
			userId: user.id,
			position,
			company,
			date,
			level,
			years,
			questionsLength,
		};

		await db.insert(interviews).values(newInterview);

		const prompt = [
			`Create a mock interview for a candidate applying to the role of **${position}** at **${company}**.`,
			`- Candidate experience: ${years || "unspecified"} years`,
			`- Seniority level: ${level || "unspecified"}`,
			`- Generate **${questionsLength}** realistic, relevant interview questions.`,
			`Respond only with the questions, numbered and clearly formatted.`,
		].join("\n");

		let generatedContent = "";

		try {
			const response = await openai.chat.completions.create({
				model: "gpt-4",
				messages: [{ role: "user", content: prompt }],
				temperature: 0.7,
			});

			generatedContent = response.choices[0]?.message?.content?.trim() ?? "";
		} catch (err) {
			console.error("[OPENAI_ERROR]", err);
			return NextResponse.json(
				{ error: "Failed to generate mock interview using OpenAI." },
				{ status: 502 },
			);
		}

		await db.insert(mockInterviews).values({
			id: nanoid(),
			interviewId,
			content: generatedContent,
		});

		return NextResponse.json(
			{ interview: newInterview, mockInterview: generatedContent },
			{ status: 201 },
		);
	} catch (err: any) {
		console.error("[INTERVIEWS_POST]", {
			message: err?.message,
			stack: err?.stack,
			error: err,
		});

		return NextResponse.json(
			{ error: "Unexpected server error. Please try again later." },
			{ status: 500 },
		);
	}
}
