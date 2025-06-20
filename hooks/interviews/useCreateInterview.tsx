"use client"

import { useState } from "react";

interface InterviewPayload {
  position: string;
  company: string;
  result?: string;
  date: string;
}

export function useCreateInterview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInterview = async (data: InterviewPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/interviews", {
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
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { createInterview, loading, error };
}