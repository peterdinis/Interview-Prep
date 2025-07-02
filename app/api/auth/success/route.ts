import { db } from "@/db";
import { users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || !user.id) {
		throw new Error(
			"something went wrong with authentication: " + JSON.stringify(user),
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

	return NextResponse.redirect(`${process.env.APP_URL}/dashboard`);
}
