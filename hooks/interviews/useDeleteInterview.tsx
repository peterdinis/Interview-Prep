import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteInterview() {
	const queryClient = useQueryClient();
    const {toast} = useToast()

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
			toast.success("Interview deleted"); // optional
			queryClient.invalidateQueries({ queryKey: ["interviews"] });
		},
		onError: (error: Error) => {
			toast.error(error.message); // optional
		},
	});
}