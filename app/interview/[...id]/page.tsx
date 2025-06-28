"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInterviewDetail } from "@/hooks/interviews/useInterviewDetail";

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
			<p className="text-red-500">
				{error instanceof Error ? error.message : "Unable to load interview."}
			</p>
		);
	}

	if (!interview) {
		return <p className="text-muted-foreground">Interview not found.</p>;
	}

	return (
		<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<Card>
				<CardHeader>
					<CardTitle className="text-xl sm:text-2xl">
						{interview.position} @ {interview.company}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2 text-sm sm:text-base">
					<p>
						<strong>Date:</strong>{" "}
						{new Date(interview.date).toLocaleDateString()}
					</p>
					<p>
						<strong>Level:</strong> {interview.level}
					</p>
					<p>
						<strong>Years of Experience:</strong> {interview.years}
					</p>
					<p>
						<strong>Questions:</strong> {interview.questionsLength}
					</p>
					<p>
						<strong>Status:</strong>{" "}
						{interview.isFinished ? "Finished" : "In Progress"}
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default InterviewDetailPage;
