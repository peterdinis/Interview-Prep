"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetInterviews } from "@/hooks/interviews/useGetInterviews";
import { Ghost } from "lucide-react";
import { useState } from "react";
import DashboardPagination from "./DashboardPagination";
import { Button } from "../ui/button";

const DashboardInterviews = () => {
	const [page, setPage] = useState(1);
	const limit = 5;

	const { interviews, meta, loading, error } = useGetInterviews(page, limit);

	const getPageNumbers = () => {
		const totalPages = meta.totalPages;
		const current = meta.page;
		const delta = 2;
		const range: (number | -1 | -2)[] = [];
		const left = Math.max(2, current - delta);
		const right = Math.min(totalPages - 1, current + delta);

		range.push(1);
		if (left > 2) range.push(-1); // Ellipsis
		for (let i = left; i <= right; i++) range.push(i);
		if (right < totalPages - 1) range.push(-2); // Ellipsis
		if (totalPages > 1) range.push(totalPages);

		return range;
	};

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
						<p className="text-muted-foreground">
							<Ghost className="animate-bounce w-8 h-8" />
							You do not create any interviews.
						</p>
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
									</CardContent>
									<CardFooter>
										<Button variant={"link"}>Start Interview</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					)}

					<DashboardPagination
						getPageNumbers={getPageNumbers}
						handlePageChange={(newPage: number) => {
							if (newPage >= 1 && newPage <= meta.totalPages) {
								setPage(newPage);
							}
						}}
						currentPage={meta.page}
					/>
				</>
			)}
		</div>
	);
};

export default DashboardInterviews;
