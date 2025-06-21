"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../shared/use-toast";

export function useDeleteInterview() {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: async (id: string) => {
			const res = await fetch(`/api/interviews/${id}`, {
				method: "DELETE",
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data?.error || "Failed to delete interview");
			}

			return data;
		},
		onSuccess: () => {
			toast({
				title: "Deleted interview",
				duration: 2000,
				className: "bg-green-800 text-white font-bold text-base leading-[130%]",
			});
			queryClient.invalidateQueries({ queryKey: ["interviews"] });
		},
		onError: (error: Error) => {
			toast({
				title: "Failed to delete interview",
				duration: 2000,
				className: "bg-red-800 text-white font-bold text-base leading-[130%]",
			});
		},
	});
}
