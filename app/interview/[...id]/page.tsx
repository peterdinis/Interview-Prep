"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Interview = {
	id: string;
	position: string;
	company: string;
	date: string;
	level: string;
	isFinished: boolean;
	years: string;
	questionsLength: number;
};

const InterviewDetailPage = () => {
	const { id } = useParams();
	const [interview, setInterview] = useState<Interview | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchInterview = async () => {
			try {
				const res = await fetch(`/api/interviews/${id}`);
				if (!res.ok) {
					throw new Error("Failed to fetch interview");
				}
				const data = await res.json();
				setInterview(data.interview);
			} catch (err) {
				setError("Unable to load interview.");
			} finally {
				setLoading(false);
			}
		};

		if (id) fetchInterview();
	}, [id]);

	if (loading) {
		return <Skeleton className="w-full h-48 rounded-xl" />;
	}

	if (error) {
		return <p className="text-red-500">{error}</p>;
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