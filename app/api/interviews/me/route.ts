"use client";

import { useEffect, useState } from "react";

export interface Interview {
  id: string;
  userId: string;
  position: string;
  company: string;
  result?: string;
  date: string;
}

export interface InterviewsResponse {
  interviews: Interview[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useGetInterviews(page = 1, limit = 10) {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [meta, setMeta] = useState<InterviewsResponse["meta"]>({
    page,
    limit,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/interviews/me?page=${page}&limit=${limit}`);

        if (!res.ok) {
          throw new Error("Failed to fetch interviews");
        }

        const data: InterviewsResponse = await res.json();
        setInterviews(data.interviews);
        setMeta(data.meta);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [page, limit]);

  return { interviews, meta, loading, error };
}