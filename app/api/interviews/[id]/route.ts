import { NextResponse } from "next/server";
import { interviews } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const interviewId = params.id;
        
		const existingInterview = await db
			.select()
			.from(interviews)
			.where(and(eq(interviews.id, interviewId), eq(interviews.userId, user.id)))
			.limit(1);

		if (existingInterview.length === 0) {
			return NextResponse.json({ error: "Interview not found or access denied" }, { status: 404 });
		}

		await db
			.delete(interviews)
			.where(eq(interviews.id, interviewId));

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[INTERVIEWS_DELETE]", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}