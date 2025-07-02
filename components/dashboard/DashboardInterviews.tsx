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
import { useInterviewLimit } from "@/hooks/interviews/useInterviewLimit";
import { Eye, Ghost, Play } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import DashboardPagination from "./DashboardPagination";
import UserPlanBadge from "../payments/UserPlanBadge";

const DashboardInterviews = () => {
	const [activePage, setActivePage] = useState(1);
	const [finishedPage, setFinishedPage] = useState(1);
	const limit = 5;
	const {
		data: limitData,
		loading: limitLoading,
		error: limitError,
	} = useInterviewLimit();
	const { interviews, loading, error } = useGetInterviews(1, 1000);

	const { activeInterviews, finishedInterviews } = useMemo(() => {
		return {
			activeInterviews: interviews.filter((i) => !i.isFinished),
			finishedInterviews: interviews.filter((i) => i.isFinished),
		};
	}, [interviews]);

	const paginate = (data: typeof interviews, page: number) => {
		const start = (page - 1) * limit;
		return data.slice(start, start + limit);
	};

	const getPageNumbers = (total: number, current: number) => {
		const totalPages = Math.ceil(total / limit);
		if (totalPages <= 1) return [];
		const delta = 2;
		const range: (number | -1 | -2)[] = [];

		const left = Math.max(2, current - delta);
		const right = Math.min(totalPages - 1, current + delta);

		range.push(1);
		if (left > 2) range.push(-1);
		for (let i = left; i <= right; i++) range.push(i);
		if (right < totalPages - 1) range.push(-2);
		range.push(totalPages);

		return range;
	};

	const renderInterviews = (
		list: typeof interviews,
		type: "active" | "finished",
	) => {
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
					<Card
						key={interview.id}
						className="transition-shadow hover:shadow-xl duration-200"
					>
						<CardHeader>
							<CardTitle>
								{interview.position} @ {interview.company}
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							<p>Date: {new Date(interview.date).toLocaleDateString()}</p>
						</CardContent>
						<CardFooter>
							<Button asChild variant={"default"}>
								<Link
									href={
										type === "active"
											? `/interview/start/${interview.id}`
											: `/interview/${interview.id}`
									}
									className="flex items-center gap-2"
								>
									{type === "active" ? (
										<>
											<Play className="w-4 h-4" />
											Start Interview
										</>
									) : (
										<>
											<Eye className="w-4 h-4" />
											View Details
										</>
									)}
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

			{!limitLoading && limitData && (
				<div className="text-sm text-muted-foreground mb-4">
					{limitData.remaining > 0 ? (
						<p>
							You can create{" "}
							<span className="font-medium">{limitData.remaining}</span> more{" "}
							{limitData.remaining === 1 ? "interview" : "interviews"} today (
							{limitData.count}/{limitData.limit})
						</p>
					) : (
						<p className="text-red-500 font-medium">
							You’ve reached your daily limit of {limitData.limit} interviews.
						</p>
					)}
				</div>
			)}

			{limitError && (
				<p className="text-sm text-red-500 mb-4">
					Failed to load interview limit.
				</p>
			)}

			<div className="space-y-6">
				<h1 className="text-2xl font-semibold">My Interviews</h1>
				<UserPlanBadge />

				{loading ? (
					<div className="space-y-4">
						{[...Array(limit)].map((_, i) => (
							<Skeleton key={i} className="h-24 w-full rounded-xl" />
						))}
					</div>
				) : error ? (
					<p className="text-red-500">Error: {error}</p>
				) : (
					<Tabs defaultValue="active" className="w-full">
						<TabsList className="mb-4">
							<TabsTrigger value="active">Active</TabsTrigger>
							<TabsTrigger value="finished">Finished</TabsTrigger>
						</TabsList>

						<TabsContent value="active">
							{renderInterviews(
								paginate(activeInterviews, activePage),
								"active",
							)}

							<DashboardPagination
								getPageNumbers={() =>
									getPageNumbers(activeInterviews.length, activePage)
								}
								handlePageChange={(newPage: number) => {
									const maxPage = Math.ceil(activeInterviews.length / limit);
									if (newPage >= 1 && newPage <= maxPage) {
										setActivePage(newPage);
									}
								}}
								currentPage={activePage}
							/>
						</TabsContent>

						<TabsContent value="finished">
							{renderInterviews(
								paginate(finishedInterviews, finishedPage),
								"finished",
							)}

							<DashboardPagination
								getPageNumbers={() =>
									getPageNumbers(finishedInterviews.length, finishedPage)
								}
								handlePageChange={(newPage: number) => {
									const maxPage = Math.ceil(finishedInterviews.length / limit);
									if (newPage >= 1 && newPage <= maxPage) {
										setFinishedPage(newPage);
									}
								}}
								currentPage={finishedPage}
							/>
						</TabsContent>
					</Tabs>
				)}
			</div>
		</>
	);
};

export default DashboardInterviews;
