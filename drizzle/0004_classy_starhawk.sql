ALTER TABLE `interviews` ADD `is_finished` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `interviews` ADD `questions_length` text;--> statement-breakpoint
ALTER TABLE `interviews` DROP COLUMN `questionsLength`;