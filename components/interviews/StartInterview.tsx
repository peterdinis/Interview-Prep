"use client";

import { useInterviewFeedback } from "@/hooks/interviews/useInterviewFeedback";
import { useMockInterview } from "@/hooks/interviews/useInterviewStart";
import { useSubmitInterviewAnswers } from "@/hooks/interviews/useSubmitInterviewsAnswers";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { type FC, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface Props {
	id: string;
}

const StartInterview: FC<Props> = ({ id }) => {
	const { data, isLoading, error } = useMockInterview(id);
	const [answers, setAnswers] = useState<string[]>([]);
	const [showDialog, setShowDialog] = useState(false);
	const [aiFeedback, setAiFeedback] = useState<string | null>(null);

	const {
		mutate: submitAnswers,
		isPending,
		isError,
		error: submitError,
	} = useSubmitInterviewAnswers();

	const {
		mutate: getFeedback,
		isPending: isFeedbackLoading,
		error: feedbackError,
	} = useInterviewFeedback();

	const questions = useMemo(() => {
		if (!data?.content) return [];

		return data.content
			.split(/\n+/)
			.filter((line) => /^\d+\.\s/.test(line))
			.map((line) => line.replace(/^\d+\.\s*/, "").trim());
	}, [data]);

	useEffect(() => {
		if (questions.length) {
			setAnswers(Array(questions.length).fill(""));
		}
	}, [questions]);

	const handleAnswerChange = (index: number, value: string) => {
		const newAnswers = [...answers];
		newAnswers[index] = value;
		setAnswers(newAnswers);
	};

	const handleSubmit = () => {
		const formattedAnswers = questions.map((question, index) => ({
			question,
			answer: answers[index] ?? "",
		}));

		submitAnswers(
			{ interviewId: id, answers: formattedAnswers },
			{
				onSuccess: async () => {
					await fetch(`/api/interviews/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ isFinished: 1 }),
					});

					getFeedback(
						{ interviewId: id, answers: formattedAnswers },
						{
							onSuccess: (data) => {
								setAiFeedback(data.feedback);
								setShowDialog(true);
							},
						},
					);
				},
			},
		);
	};

	const handleRestart = () => {
		setAnswers(Array(questions.length).fill(""));
		setShowDialog(false);
		setAiFeedback(null);
	};

	if (isLoading)
		return (
			<p className="p-4">
				<Loader2 className="animate-spin w-8 h-8" />
			</p>
		);
	if (error)
		return <p className="p-4 text-red-500">Error loading questions.</p>;
	if (!questions.length) return <p className="p-4">No questions found.</p>;

	return (
		<>
			<div className="flex flex-col md:flex-row gap-6 p-4">
				<Card className="flex-1 max-h-[70vh] overflow-y-auto">
					<CardHeader>
						<CardTitle>AI Generated Questions</CardTitle>
						<CardDescription>
							Read the questions on the left and write your answers on the
							right.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{questions.map((question, index) => (
							<div
								key={index}
								className="p-3 bg-background rounded-md shadow-sm"
							>
								<p className="font-semibold">
									{index + 1}. {question}
								</p>
							</div>
						))}
					</CardContent>
				</Card>

				<Card className="flex-1 max-h-[70vh] overflow-y-auto">
					<CardHeader>
						<CardTitle>Your Answers</CardTitle>
						<CardDescription>Write your answers here.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{questions.map((question, index) => (
							<div key={index}>
								<label
									htmlFor={`answer-${index}`}
									className="block mb-1 font-semibold"
								>
									{index + 1}. {question}
								</label>
								<Textarea
									id={`answer-${index}`}
									placeholder="Type your answer..."
									value={answers[index]}
									onChange={(e) => handleAnswerChange(index, e.target.value)}
									rows={4}
									className="resize-none"
								/>
							</div>
						))}
						{isPending && (
							<p className="text-blue-500">Submitting your answers...</p>
						)}
						{isFeedbackLoading && (
							<p className="text-blue-500">Generating AI feedback...</p>
						)}
						{isError && (
							<p className="text-red-500">
								Failed to submit: {submitError?.message}
							</p>
						)}
						{feedbackError && (
							<p className="text-red-500">
								Feedback error: {(feedbackError as Error)?.message}
							</p>
						)}
						<Button
							disabled={
								answers.some((a) => a.trim() === "") ||
								isPending ||
								isFeedbackLoading
							}
							onClick={handleSubmit}
							className="mt-4"
						>
							Submit Answers
						</Button>
					</CardContent>
				</Card>
			</div>

			<div className="w-[700px]">
				<Dialog open={showDialog} onOpenChange={setShowDialog}>
					<DialogContent className="max-w-4xl w-full">
						<DialogTitle>AI Evaluation</DialogTitle>
						<DialogDescription>
							{aiFeedback ? (
								<pre className="whitespace-pre-wrap max-h-80 overflow-auto text-sm">
									{aiFeedback}
								</pre>
							) : (
								<Loader2 className="animate-spin w-8 h-8" />
							)}
						</DialogDescription>
						<div className="flex justify-end gap-2 mt-4">
							<Button variant="outline" onClick={() => setShowDialog(false)}>
								<Link href={"/dashboard"}>Close and return to dashboard</Link>
							</Button>
							<Button onClick={handleRestart}>Try Again</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default StartInterview;
