"use client";

import StartInterview from "@/components/interviews/StartInterview";
import type { NextPage } from "next";
import { useParams } from "next/navigation";

const InterviewDetailPage: NextPage = () => {
	const { id } = useParams();
	return <StartInterview id={id as unknown as string} />;
};

export default InterviewDetailPage;
