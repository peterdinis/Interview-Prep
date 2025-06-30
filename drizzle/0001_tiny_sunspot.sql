CREATE TYPE "public"."plan" AS ENUM('free', 'pro', 'enterprise');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "plan" "plan" DEFAULT 'free';