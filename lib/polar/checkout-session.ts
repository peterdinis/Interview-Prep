export async function createCheckoutSession(userId: string) {
	const res = await fetch("https://api.polar.sh/api/v1/subscription/checkout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.POLAR_API_KEY}`,
		},
		body: JSON.stringify({
			plan: "pro", // or your Polar plan ID
			user_id: userId, // or email if Polar uses that
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings?upgraded=1`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings`,
		}),
	});

	const data = await res.json();
	return data?.url;
}