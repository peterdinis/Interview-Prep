"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetInterviews } from "@/hooks/interviews/useGetInterviews";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import DashboardPagination from "./DashboardPagination";

const DashboardInterviews = () => {
	const [page, setPage] = useState(1);
	const limit = 5;

	const { interviews, meta, loading, error } = useGetInterviews(page, limit);

	const getPageNumbers = useMemo(() => {
		if (!meta?.totalPages) return [];
		const totalPages = meta.totalPages;
		const current = meta.page;
		const delta = 2;
		const range: (number | -1 | -2)[] = [];
		const left = Math.max(2, current - delta);
		const right = Math.min(totalPages - 1, current + delta);

		range.push(1);
		if (left > 2) range.push(-1);
		for (let i = left; i <= right; i++) range.push(i);
		if (right < totalPages - 1) range.push(-2);
		if (totalPages > 1) range.push(totalPages);

		return range;
	}, [meta]);

	const { activeInterviews, finishedInterviews } = useMemo(() => {
		return {
			activeInterviews: interviews.filter((i) => !i.isFinished),
			finishedInterviews: interviews.filter((i) => i.isFinished),
		};
	}, [interviews]);

	const renderInterviews = (list: typeof interviews) => {
		if (list.length === 0) {
			return (
				<p className="text-muted-foreground flex items-center gap-2">
					<Ghost className="animate-bounce w-8 h-8" />
					No interviews here.
				</p>
			);
		}

		return (
			<div className="grid gap-4">
				{list.map((interview) => (
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
							<Button variant={"default"}>
								<Link href={`/interview/start/${interview.id}`}>
									Start Interview
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		);
	};

	return (
		<>
			<div className="mb-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
					<div
						className="animate-fade-in-up"
						style={{ animationDelay: "200ms" }}
					>
						<h2 className="text-2xl dark:text-sky-50 font-bold text-gray-900 mb-2">
							Your Test Interviews
						</h2>
						<p className="text-gray-600 dark:text-blue-100">
							Practice and improve your interview skills with personalized mock
							interviews.
						</p>
					</div>
				</div>
			</div>

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
						<Tabs defaultValue="active" className="w-full">
							<TabsList className="mb-4">
								<TabsTrigger value="active">Active</TabsTrigger>
								<TabsTrigger value="finished">Finished</TabsTrigger>
							</TabsList>

							<TabsContent value="active">
								{renderInterviews(activeInterviews)}
							</TabsContent>
							<TabsContent value="finished">
								{renderInterviews(finishedInterviews)}
							</TabsContent>
						</Tabs>

						<DashboardPagination
							getPageNumbers={() => getPageNumbers}
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
		</>
	);
};

export default DashboardInterviews;
