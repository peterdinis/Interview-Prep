import { db } from "@/db";
import { interviews, users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const { position, company, result, date } = body;

		if (!position || !company || !date) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// ✅ Ensure user exists in users table
		const existingUser = await db.query.users.findFirst({
			where: eq(users.id, user.id),
		});

		if (!existingUser) {
			await db.insert(users).values({
				id: user.id,
				firstName: user.given_name ?? "",
				lastName: user.family_name ?? "",
				email: user.email ?? "",
			});
		}

		const newInterview = {
			id: nanoid(),
			userId: user.id,
			position,
			company,
			result: result ?? "",
			date,
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
