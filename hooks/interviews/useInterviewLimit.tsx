"use client"

import { useEffect, useState } from "react";

type LimitData = {
	count: number;
	remaining: number;
	limit: number;
};

export const useInterviewLimit = () => {
	const [data, setData] = useState<LimitData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLimit = async () => {
			try {
				const res = await fetch("/api/interviews/limit");
				if (!res.ok) throw new Error("Failed to fetch limit");
				const json = await res.json();
				setData(json);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchLimit();
	}, []);

	return { data, loading, error };
};