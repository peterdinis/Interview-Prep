CREATE TABLE `interview_questions` (
	`id` text PRIMARY KEY NOT NULL,
	`interview_id` text,
	`question` text,
	`answer` text,
	FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `interviews` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`position` text,
	`company` text,
	`result` text,
	`date` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
