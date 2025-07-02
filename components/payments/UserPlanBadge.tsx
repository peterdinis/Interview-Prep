"use client"

import { Badge } from "@/components/ui/badge";
import { useUserPlan } from "@/hooks/payments/useUserPlan";
import { Loader2 } from "lucide-react";

const UserPlanBadge = () => {
	const { plan, loading } = useUserPlan();

	if (loading) {
		return (
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Loader2 className="w-4 h-4 animate-spin" />
				Loading plan...
			</div>
		);
	}

	const label = plan === "pro" ? "Pro Plan" : "Free Plan";
	const variant = plan === "pro" ? "default" : "secondary";

	return <Badge variant={variant}>{label}</Badge>;
};

export default UserPlanBadge;