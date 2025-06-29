import { v4 as uuidv4 } from "uuid";
import { db } from ".";
import {
	interviewQuestions,
	interviews,
	mockInterviews,
	users,
} from "./schema";

async function seed() {
	console.log("🌱 Seeding database...");

	const userId = uuidv4();
	const interviewId = uuidv4();
	const mockInterviewId = uuidv4();

	await db.insert(users).values({
		id: userId,
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		plan: "pro",
	});

	await db.insert(interviews).values({
		id: interviewId,
		userId,
		position: "Frontend Engineer",
		company: "TechCorp",
		date: new Date().toISOString(),
		level: "Mid",
		isFinished: 0,
		years: "2",
		questionsLength: "3",
	});

	await db.insert(interviewQuestions).values([
		{
			id: uuidv4(),
			interviewId,
			question: "What is the virtual DOM?",
			answer: "A lightweight copy of the actual DOM.",
		},
		{
			id: uuidv4(),
			interviewId,
			question: "Explain useEffect in React.",
			answer: "A hook for handling side effects.",
		},
	]);

	await db.insert(mockInterviews).values({
		id: mockInterviewId,
		interviewId,
		content: `1. What is the virtual DOM?\n2. Explain useEffect in React.`,
	});

	console.log("✅ Seeding complete.");
}

seed().catch((err) => {
	console.error("❌ Seeding failed:", err);
	process.exit(1);
});
