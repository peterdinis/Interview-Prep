"use client";

import { FC, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMockInterview } from "@/hooks/interviews/useInterviewStart";
import { useSubmitInterviewAnswers } from "@/hooks/interviews/useSubmitInterviewsAnswers";

interface Props {
  id: string;
}

const StartInterview: FC<Props> = ({ id }: Props) => {
  const { data, isLoading, error } = useMockInterview(id);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const {
    mutate,
    isPending,
    isError,
    error: submitError,
  } = useSubmitInterviewAnswers();

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

    mutate(
      { interviewId: id, answers: formattedAnswers },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
      }
    );
  };

  const handleRestart = () => {
    setAnswers(Array(questions.length).fill(""));
    setSubmitted(false);
  };

  const score = answers.filter((a) => a.trim().length > 0).length;

  if (isLoading) return <p className="p-4">Loading interview questions...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading questions.</p>;
  if (!questions.length) return <p className="p-4">No questions found.</p>;

  if (submitted) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Interview Summary</CardTitle>
            <CardDescription>Here’s how you did!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              You answered <strong>{score}</strong> out of{" "}
              <strong>{questions.length}</strong> questions.
            </p>
            <ul className="list-disc list-inside space-y-2">
              {answers.map((answer, index) => (
                <li key={index}>
                  <span className="font-semibold">{questions[index]}</span>
                  <br />
                  <span className="text-muted-foreground">
                    {answer.trim() ? answer : <em>No answer provided.</em>}
                  </span>
                </li>
              ))}
            </ul>
            <Button className="mt-6" onClick={handleRestart}>
              Start Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Left: AI Questions */}
      <Card className="flex-1 max-h-[70vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>AI Generated Questions</CardTitle>
          <CardDescription>
            Read the questions on the left and write your answers on the right.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="p-3 bg-background rounded-md shadow-sm">
              <p className="font-semibold">
                {index + 1}. {question}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Right: Answer Form */}
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
          {isPending && <p className="text-blue-500">Submitting your answers...</p>}
          {isError && (
            <p className="text-red-500">
              Failed to submit: {submitError?.message}
            </p>
          )}
          <Button onClick={handleSubmit} className="mt-4">
            Submit Answers
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartInterview;
