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

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Left side - AI Questions */}
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
              <p className="font-semibold">{index + 1}. {question}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Right side - Answers */}
      <Card className="flex-1 max-h-[70vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Your Answers</CardTitle>
          <CardDescription>Write your answers here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {aiQuestions.map((question, index) => (
            <div key={index}>
              <label htmlFor={`answer-${index}`} className="block mb-1 font-semibold">
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
          <Button
            onClick={() => alert("Submit functionality not implemented yet")}
            className="mt-4"
          >
            Submit Answers
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartInterview;
