"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Target } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import ProfileDropdown from "../auth/ProfileDropdown";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";

const Navigation: FC = () => {
	const { user } = useKindeBrowserClient();

	return (
		<header className="bg-white/80 dark:bg-background backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-neutral-500 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					<div className="flex items-center space-x-3 group">
						<div className="bg-gradient-to-r from-primary to-secondary p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
							<Target className="h-6 w-6 text-white" />
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
							Interview Prep
						</h1>
					</div>
					<div className="flex justify-end items-center space-x-2">
						{user ? (
							<ProfileDropdown user={user} />
						) : (
							<Button className="rounded-lg">
								<Link href={"/account/create"}>Create new account</Link>
							</Button>
						)}
						<ModeToggle />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
