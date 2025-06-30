CREATE TABLE "interview_questions" (
	"id" text PRIMARY KEY NOT NULL,
	"interview_id" text,
	"question" text,
	"answer" text
);
--> statement-breakpoint
CREATE TABLE "interviews" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"position" text,
	"company" text,
	"date" text,
	"level" text,
	"is_finished" integer DEFAULT 0,
	"years" text,
	"questions_length" text
);
--> statement-breakpoint
CREATE TABLE "mock_interviews" (
	"id" text PRIMARY KEY NOT NULL,
	"interview_id" text,
	"content" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text
);
--> statement-breakpoint
ALTER TABLE "interview_questions" ADD CONSTRAINT "interview_questions_interview_id_interviews_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."interviews"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_interviews" ADD CONSTRAINT "mock_interviews_interview_id_interviews_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."interviews"("id") ON DELETE no action ON UPDATE no action;