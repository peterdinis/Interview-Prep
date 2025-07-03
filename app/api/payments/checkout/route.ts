import { createCheckoutSession } from "@/lib/polar/checkout-session";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


export async function POST() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || !user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionUrl = await createCheckoutSession(user.id);

    return NextResponse.json({ url: sessionUrl });
}