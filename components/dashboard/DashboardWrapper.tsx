"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
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
							<h1 className="text-3xl font-bold mb-2">
								Welcome back {user?.email}👋
							</h1>
							<p className="text-blue-100 text-lg">
								Ready to practice and improve your interview skills today?
							</p>
						</div>

						<DashboardDialog />
					</div>
				</div>
			</div>
			<DashboardInterviews />
		</main>
	);
};

export default DashboardWrapper;
