"use client";

import { useParams } from "next/navigation";
import { useInterviewDetail } from "@/hooks/interviews/useInterviewDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Briefcase, Building2, CheckCircle2, Clock } from "lucide-react";

const InterviewDetailPage = () => {
	const { id } = useParams();
	const interviewId = typeof id === "string" ? id : undefined;

	const {
		data: interview,
		isLoading,
		isError,
		error,
	} = useInterviewDetail(interviewId);

	if (isLoading) {
		return <Skeleton className="w-full h-48 rounded-xl" />;
	}

	if (isError) {
		return (
			<p className="text-red-500 text-center">
				{error instanceof Error ? error.message : "Unable to load interview."}
			</p>
		);
	}

	if (!interview) {
		return <p className="text-muted-foreground text-center">Interview not found.</p>;
	}

	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				<Card className="rounded-2xl shadow-md bg-white dark:bg-zinc-900 border border-border">
					<CardHeader>
						<CardTitle className="text-2xl sm:text-3xl font-semibold flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
							<span>{interview.position}</span>
							<Badge variant="secondary">@ {interview.company}</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4 text-base sm:text-lg text-muted-foreground">
						<div className="flex items-center gap-2">
							<CalendarDays className="w-5 h-5 text-primary" />
							<span>
								<strong>Date:</strong>{" "}
								{new Date(interview.date).toLocaleDateString()}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Briefcase className="w-5 h-5 text-primary" />
							<span>
								<strong>Level:</strong> {interview.level}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Building2 className="w-5 h-5 text-primary" />
							<span>
								<strong>Experience:</strong> {interview.years} years
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Clock className="w-5 h-5 text-primary" />
							<span>
								<strong>Questions:</strong> {interview.questionsLength}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2
								className={`w-5 h-5 ${
									interview.isFinished ? "text-green-500" : "text-yellow-500"
								}`}
							/>
							<span>
								<strong>Status:</strong>{" "}
								{interview.isFinished ? "Finished" : "In Progress"}
							</span>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};

export default InterviewDetailPage;
