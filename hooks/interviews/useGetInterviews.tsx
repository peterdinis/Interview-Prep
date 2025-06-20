"use client"

import { useEffect, useState } from "react";

export interface Interview {
  id: string;
  userId: string;
  position: string;
  company: string;
  result?: string;
  date: string;
}

export function useGetInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch("/api/interviews", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch interviews");
        }

        const data = await res.json();
        setInterviews(data.interviews);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return { interviews, loading, error };
}