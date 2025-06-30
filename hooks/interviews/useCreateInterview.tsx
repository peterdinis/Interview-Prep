"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface InterviewPayload {
	position: string;
	company: string;
	result?: string;
	date: string;
}

async function createInterviewRequest(data: InterviewPayload) {
	const res = await fetch("/api/interviews/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		let message = "Failed to create interview";
		let status = res.status;

		try {
			const errorData = await res.json();
			message = errorData.error || message;
		} catch {
			// fallback if response is not JSON
		}

		const error = new Error(message) as Error & { status?: number };
		error.status = status;
		throw error;
	}

	const result = await res.json();
	return result.interview;
}

export function useCreateInterview() {
	const queryClient = useQueryClient();

	const {
		mutate: createInterview,
		isPending: loading,
		isError,
		error,
	} = useMutation({
		mutationFn: createInterviewRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["interviews", "me"] });
		},
	});

	return {
		createInterview,
		loading,
		error: isError ? (error as Error & { status?: number }) : null,
	};
}
