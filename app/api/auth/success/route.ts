import { db } from "@/db";
import { users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || !user.id) {
		throw new Error(
			"Something went wrong with authentication: " + JSON.stringify(user),
		);
	}

	const [dbUser] = await db.select().from(users).where(eq(users.id, user.id));

	if (!dbUser) {
		await db.insert(users).values({
			id: user.id,
			firstName: user.given_name,
			lastName: user.family_name ?? user.given_name,
			email: user.email,
		});
	}

	const host = req.headers.get("host");
	
	const baseUrl =
		host?.includes("localhost") || host?.startsWith("127.")
			? "http://localhost:3000"
			: process.env.APP_URL;

	return NextResponse.redirect(`${baseUrl}/dashboard`);
}
