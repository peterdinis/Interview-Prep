"use client";

import { useQuery } from "@tanstack/react-query";

type LimitData = {
	count: number;
	remaining: number;
	limit: number;
};

const fetchInterviewLimit = async (): Promise<LimitData> => {
	const res = await fetch("/api/interviews/limit");
	if (!res.ok) {
		throw new Error("Failed to fetch limit");
	}
	return res.json();
};

export const useInterviewLimit = () => {
	const {
		data,
		isLoading: loading,
		isError,
		error,
	} = useQuery<LimitData, Error>({
		queryKey: ["interviewLimit"],
		queryFn: fetchInterviewLimit,
	});

	return {
		data,
		loading,
		error: isError ? error.message : null,
	};
};