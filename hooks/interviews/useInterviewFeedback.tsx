"use client"

import { useMutation } from "@tanstack/react-query";

export const useSubmitInterviewAnswers = () => {
	return useMutation({
		mutationFn: async ({
			interviewId,
			answers,
		}: {
			interviewId: string;
			answers: { question: string; answer: string }[];
		}) => {
			const res = await fetch(`/api/interviews/${interviewId}/feedback`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ answers }),
			});

			if (!res.ok) {
				throw new Error("Failed to get feedback");
			}

			return res.json(); // expects { feedback: string }
		},
	});
};