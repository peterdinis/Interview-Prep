"use client"

import { useQuery } from "@tanstack/react-query";

export const useInterviewDetail = (id: string | undefined) => {
	return useQuery({
		queryKey: ["interview", id],
		queryFn: async () => {
			if (!id) throw new Error("Interview ID is required");
			const res = await fetch(`/api/interviews/${id}`);
			if (!res.ok) {
				throw new Error("Failed to fetch interview");
			}
			const data = await res.json();
			return data.interview;
		},
		enabled: !!id,
	});
};