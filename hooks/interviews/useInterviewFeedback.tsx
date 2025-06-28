"use client"

import { useMutation } from "@tanstack/react-query";

interface InterviewAnswer {
	question: string;
	answer: string;
}

interface FeedbackResponse {
	feedback: string;
}

export function useInterviewFeedback() {
	return useMutation({
		mutationFn: async ({
			interviewId,
			answers,
		}: {
			interviewId: string;
			answers: InterviewAnswer[];
		}): Promise<FeedbackResponse> => {
			const response = await fetch(`/api/interviews/${interviewId}/feedback`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ answers }),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error?.error || "Failed to get feedback");
			}

			return await response.json();
		},
	});
}
