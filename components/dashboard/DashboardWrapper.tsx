"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Filter, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DashboardDialog from "./DashboardDialog";
import DashboardInterviews from "./DashboardInterviews";

const DashboardWrapper = () => {
	const { user } = useKindeBrowserClient();

	return (
		<main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8 animate-fade-in-up">
				<div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white shadow-xl">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
						<div>
							<h1 className="text-3xl font-bold mb-2">Welcome back {user?.email}👋</h1>
							<p className="text-blue-100 text-lg">
								Ready to practice and improve your interview skills today?
							</p>
						</div>

						<DashboardDialog />
					</div>
				</div>
			</div>
			<div className="mb-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
					<div
						className="animate-fade-in-up"
						style={{ animationDelay: "200ms" }}
					>
						<h2 className="text-2xl dark:text-sky-50 font-bold text-gray-900 mb-2">
							Your Test Interviews
						</h2>
						<p className="text-gray-600 dark:text-blue-100">
							Practice and improve your interview skills with personalized mock
							interviews.
						</p>
					</div>
				</div>
				<div
					className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
					style={{ animationDelay: "300ms" }}
				>
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
						<Input
							placeholder="Search interviews by title, category, or description..."
							className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200 shadow-sm"
						/>
					</div>
					<Button
						variant="outline"
						className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50 shadow-sm"
					>
						<Filter className="h-4 w-4 mr-2" />
						Filter
					</Button>
				</div>
			</div>

			<DashboardInterviews />
		</main>
	);
};

export default DashboardWrapper;
