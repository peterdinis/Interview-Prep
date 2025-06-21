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

export interface InterviewsResponse {
	interviews: Interview[];
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

const fetchInterviews = async (
	page: number,
	limit: number,
): Promise<InterviewsResponse> => {
	const res = await fetch(`/api/interviews/me?page=${page}&limit=${limit}`);

	if (!res.ok) {
		throw new Error("Failed to fetch interviews");
	}

	return res.json();
};

export function useGetInterviews(page = 1, limit = 10) {
	const {
		data,
		isLoading: loading,
		isError,
		error,
	} = useQuery<InterviewsResponse, Error>({
		queryKey: ["interviews", "me", page, limit],
		queryFn: () => fetchInterviews(page, limit),
		staleTime: Number.POSITIVE_INFINITY,
	});

	return {
		interviews: data?.interviews ?? [],
		meta: data?.meta ?? { page, limit, total: 0, totalPages: 0 },
		loading,
		error: isError ? error.message : null,
	};
}
