import { db } from "@/db";
import { mockInterviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	context: { params: Promise<{ id: string }> },
) {
	try {
		const interviewId = (await context.params).id;

		if (!interviewId || typeof interviewId !== "string") {
			return NextResponse.json(
				{ error: "Missing or invalid interviewId" },
				{ status: 400 },
			);
		}

		const result = await db
			.select()
			.from(mockInterviews)
			.where(eq(mockInterviews.interviewId, interviewId));
		if (result.length === 0) {
			return NextResponse.json(
				{ error: "Mock interview not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ mockInterview: result[0] });
	} catch (error) {
		console.error("[MOCK_INTERVIEW_GET]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
