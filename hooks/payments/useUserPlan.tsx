"use client"

import { MOCK_PLAN } from "@/constants/applicationConstants";
import { useState, useEffect } from "react";

export const useUserPlan = () => {
	const [plan, setPlan] = useState<"free" | "pro" | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadPlan = async () => {
			await new Promise((res) => setTimeout(res, 500));
			setPlan(MOCK_PLAN);
			setLoading(false);
		};

		loadPlan();
	}, []);

	return { plan, loading, error: null };
};