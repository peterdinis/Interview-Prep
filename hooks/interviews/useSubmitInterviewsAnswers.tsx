"use client";

import { useMutation } from "@tanstack/react-query";

type Answer = {
  question: string;
  answer: string;
};

type Payload = {
  interviewId: string;
  answers: Answer[];
};

export function useSubmitInterviewAnswers() {
  return useMutation({
    mutationFn: async ({ interviewId, answers }: Payload) => {
      const res = await fetch("/api/interviews/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interviewId, answers }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to submit answers");
      }

      return res.json();
    },
  });
}