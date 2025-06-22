CREATE TABLE `mock_interviews` (
	`id` text PRIMARY KEY NOT NULL,
	`interview_id` text,
	`content` text,
	FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON UPDATE no action ON DELETE no action
);
