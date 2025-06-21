"use client";

import { useQuery } from "@tanstack/react-query";

export interface Interview {
  id: string;
  userId: string;
  position: string;
  company: string;
  result?: string;
  date: string;
}

const fetchInterviews = async (): Promise<Interview[]> => {
  const res = await fetch("/api/interviews/me");

  if (!res.ok) {
    throw new Error("Failed to fetch interviews");
  }

  const data = await res.json();
  return data.interviews;
};

export function useGetInterviews() {
  const {
    data: interviews = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery<Interview[], Error>({
    queryKey: ["interviews", "me"],
    queryFn: fetchInterviews,
  });

  return {
    interviews,
    loading,
    error: isError ? error.message : null,
  };
}