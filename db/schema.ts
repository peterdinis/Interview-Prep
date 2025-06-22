import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: text("email"),
});

export const interviews = sqliteTable("interviews", {
	id: text("id").primaryKey(),
	userId: text("user_id").references(() => users.id),
	position: text("position"),
	company: text("company"),
	date: text("date"),
	level: text("level"),
	years: text("years"),
	questionsLength: text("questionsLength")
});

export const interviewQuestions = sqliteTable("interview_questions", {
	id: text("id").primaryKey(),
	interviewId: text("interview_id").references(() => interviews.id),
	question: text("question"),
	answer: text("answer"),
});

export const mockInterviews = sqliteTable("mock_interviews", {
	id: text("id").primaryKey(),
	interviewId: text("interview_id").references(() => interviews.id),
	content: text("content"),
});