import { DAILY_LIMIT } from "@/constants/applicationConstants";
import { redis } from "@/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const today = new Date().toISOString().slice(0, 10);
		const redisKey = `interview_limit:${user.id}:${today}`;
		const count = (await redis.get<number>(redisKey)) || 0;

		return NextResponse.json({
			count,
			remaining: Math.max(0, DAILY_LIMIT - count),
			limit: DAILY_LIMIT,
		});
	} catch (error) {
		console.error("[INTERVIEW_LIMIT]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
