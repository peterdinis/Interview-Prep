"use client";

import { Badge } from "@/components/ui/badge";
import { useUserPlan } from "@/hooks/payments/useUserPlan";
import { Loader2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sparkles } from "lucide-react";

const UserPlanBadge = () => {
	const { plan, loading } = useUserPlan();
	const [open, setOpen] = useState(false);

	if (loading) {
		return (
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Loader2 className="w-4 h-4 animate-spin" />
				Loading plan...
			</div>
		);
	}

	const isFree = plan === "free";
	const label = isFree ? "Free Plan" : "Pro Plan";
	const variant = isFree ? "secondary" : "default";

	return (
		<div className="flex items-center gap-3">
			<Badge variant={variant}>{label}</Badge>

			{isFree && (
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm">
							Upgrade
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="flex items-center gap-2">
								<Sparkles className="w-5 h-5 text-yellow-500" />
								Upgrade to Pro
							</DialogTitle>
							<DialogDescription>
								Unlock unlimited mock interviews, advanced analytics, and
								priority support by upgrading to Pro.
							</DialogDescription>
						</DialogHeader>

						<div className="mt-4 space-y-2 text-sm text-muted-foreground">
							<ul className="list-disc list-inside">
								<li>Unlimited interview sessions</li>
								<li>Advanced feedback & insights</li>
								<li>Early access to new features</li>
								<li>Priority customer support</li>
							</ul>
						</div>

						<Button className="w-full mt-6" onClick={() => {
							console.log("Redirecting to upgrade...");
							setOpen(false);
						}}>
							Upgrade to Pro
						</Button>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
};

export default UserPlanBadge;
