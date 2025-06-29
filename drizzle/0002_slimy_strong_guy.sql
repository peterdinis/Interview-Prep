ALTER TABLE "users" ALTER COLUMN "plan" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "plan" SET DEFAULT 'free';--> statement-breakpoint
DROP TYPE "public"."plan";