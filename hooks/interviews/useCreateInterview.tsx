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
		const errorData = await res.json();
		throw new Error(errorData.error || "Failed to create interview");
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
			// Invalidate interview queries to refetch updated data
			queryClient.invalidateQueries({ queryKey: ["interviews", "me"] });
		},
	});

	return {
		createInterview,
		loading,
		error: isError ? (error as Error).message : null,
	};
}
