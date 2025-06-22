import { db } from "@/db";
import { interviews } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

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

		return NextResponse.json({ interview: newInterview }, { status: 201 });
	} catch (error) {
		console.error("[INTERVIEWS_POST]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
