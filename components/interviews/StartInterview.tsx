"use client";

import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const aiQuestions = [
  "Tell me about yourself.",
  "What are your strengths?",
  "Describe a challenging project you've worked on.",
  "Why do you want this position?",
];

const StartInterview: FC = () => {
  const [answers, setAnswers] = useState<string[]>(
    Array(aiQuestions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRestart = () => {
    setAnswers(Array(aiQuestions.length).fill(""));
    setSubmitted(false);
  };

  // Count non-empty answers for a fake "score"
  const score = answers.filter((a) => a.trim().length > 0).length;

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
              <strong>{aiQuestions.length}</strong> questions.
            </p>
            <ul className="list-disc list-inside space-y-2">
              {answers.map((answer, index) => (
                <li key={index}>
                  <span className="font-semibold">
                    {aiQuestions[index]}
                  </span>
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
          {aiQuestions.map((question, index) => (
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
          {aiQuestions.map((question, index) => (
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
          <Button onClick={handleSubmit} className="mt-4">
            Submit Answers
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartInterview;
