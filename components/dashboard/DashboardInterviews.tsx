"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetInterviews } from "@/hooks/interviews/useGetInterviews";
import { useState } from "react";

const DashboardInterviews = () => {
	const [page, setPage] = useState(1);
	const limit = 5;

	const { interviews, meta, loading, error } = useGetInterviews(page, limit);

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">My Interviews</h1>

			{loading ? (
				<div className="space-y-4">
					{[...Array(limit)].map((_, i) => (
						<Skeleton key={i} className="h-24 w-full rounded-xl" />
					))}
				</div>
			) : error ? (
				<p className="text-red-500">Error: {error}</p>
			) : (
				<>
					{interviews.length === 0 ? (
						<p className="text-muted-foreground">No interviews found.</p>
					) : (
						<div className="grid gap-4">
							{interviews.map((interview) => (
								<Card key={interview.id}>
									<CardHeader>
										<CardTitle>
											{interview.position} @ {interview.company}
										</CardTitle>
									</CardHeader>
									<CardContent className="text-sm text-muted-foreground">
										<p>Date: {new Date(interview.date).toLocaleDateString()}</p>
										<p>Result: {interview.result || "Pending"}</p>
									</CardContent>
								</Card>
							))}
						</div>
					)}

					<div className="flex justify-between items-center pt-4">
						<Button
							variant="outline"
							disabled={page === 1}
							onClick={() => setPage((p) => Math.max(p - 1, 1))}
						>
							Previous
						</Button>
						<p className="text-sm text-muted-foreground">
							Page {meta.page} of {meta.totalPages}
						</p>
						<Button
							variant="outline"
							disabled={page === meta.totalPages}
							onClick={() => setPage((p) => p + 1)}
						>
							Next
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default DashboardInterviews;
