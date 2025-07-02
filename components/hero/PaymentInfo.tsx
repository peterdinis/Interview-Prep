"use client";

import type React from "react";

import {
	BarChart3,
	Check,
	Crown,
	Headphones,
	Shield,
	Users,
	X,
	Zap,
} from "lucide-react";
import { type FC, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface PlanFeature {
	name: string;
	free: boolean | string;
	pro: boolean | string;
	icon?: React.ReactNode;
}

const features: PlanFeature[] = [
	{
		name: "Projects",
		free: "3 projects",
		pro: "Unlimited projects",
		icon: <BarChart3 className="h-4 w-4" />,
	},
	{
		name: "Team members",
		free: "1 member",
		pro: "Up to 10 members",
		icon: <Users className="h-4 w-4" />,
	},
	{
		name: "Storage",
		free: "1GB",
		pro: "100GB",
		icon: <Shield className="h-4 w-4" />,
	},
	{
		name: "Advanced analytics",
		free: false,
		pro: true,
		icon: <BarChart3 className="h-4 w-4" />,
	},
	{
		name: "Priority support",
		free: false,
		pro: true,
		icon: <Headphones className="h-4 w-4" />,
	},
	{
		name: "Custom integrations",
		free: false,
		pro: true,
		icon: <Zap className="h-4 w-4" />,
	},
	{
		name: "Export data",
		free: false,
		pro: true,
		icon: <Shield className="h-4 w-4" />,
	},
];

const PaymentInfo: FC = () => {
	const [isYearly, setIsYearly] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState<"free" | "pro" | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const monthlyPrice = 29;
	const yearlyPrice = 290; // 10 months price for yearly
	const currentPrice = isYearly ? yearlyPrice : monthlyPrice;

	const handlePlanSelect = (plan: "free" | "pro") => {
		setSelectedPlan(plan);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsProcessing(true);
		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsProcessing(false);
		// Handle successful payment
	};

	const handleFreePlan = () => {
		// Handle free plan selection
		alert("Welcome to the Free plan!");
	};

	return (
		<div className="w-full max-w-6xl mx-auto p-4 space-y-8">
			{/* Header */}
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold">Choose Your Plan</h1>
				<p className="text-xl text-muted-foreground">
					Start free, upgrade when you need more
				</p>

				{/* Billing Toggle */}
				<div className="flex items-center justify-center space-x-4">
					<span
						className={`text-sm ${!isYearly ? "font-medium" : "text-muted-foreground"}`}
					>
						Monthly
					</span>
					<Switch checked={isYearly} onCheckedChange={setIsYearly} />
					<span
						className={`text-sm ${isYearly ? "font-medium" : "text-muted-foreground"}`}
					>
						Yearly
						<Badge variant="secondary" className="ml-2">
							Save 17%
						</Badge>
					</span>
				</div>
			</div>

			{/* Pricing Cards */}
			<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{/* Free Plan */}
				<Card
					className={`relative ${selectedPlan === "free" ? "ring-2 ring-primary" : ""}`}
				>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Zap className="h-5 w-5" />
							Free
						</CardTitle>
						<CardDescription>Perfect for getting started</CardDescription>
						<div className="space-y-1">
							<div className="text-3xl font-bold">$0</div>
							<div className="text-sm text-muted-foreground">Forever free</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<ul className="space-y-3">
							{features.map((feature, index) => (
								<li key={index} className="flex items-center gap-3">
									{feature.icon}
									<span className="text-sm flex-1">{feature.name}</span>
									{typeof feature.free === "boolean" ? (
										feature.free ? (
											<Check className="h-4 w-4 text-green-500" />
										) : (
											<X className="h-4 w-4 text-muted-foreground" />
										)
									) : (
										<span className="text-sm text-muted-foreground">
											{feature.free}
										</span>
									)}
								</li>
							))}
						</ul>
					</CardContent>
					<CardFooter>
						<Button
							variant="outline"
							className="w-full bg-transparent"
							onClick={handleFreePlan}
						>
							Get Started Free
						</Button>
					</CardFooter>
				</Card>

				{/* Pro Plan */}
				<Card
					className={`relative ${selectedPlan === "pro" ? "ring-2 ring-primary" : ""}`}
				>
					<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
						<Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
							<Crown className="h-3 w-3 mr-1" />
							Most Popular
						</Badge>
					</div>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Crown className="h-5 w-5" />
							Pro
						</CardTitle>
						<CardDescription>For growing teams and businesses</CardDescription>
						<div className="space-y-1">
							<div className="text-3xl font-bold">
								${isYearly ? Math.round(yearlyPrice / 12) : monthlyPrice}
								<span className="text-lg font-normal text-muted-foreground">
									/month
								</span>
							</div>
							{isYearly && (
								<div className="text-sm text-muted-foreground">
									Billed annually (${yearlyPrice}/year)
								</div>
							)}
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<ul className="space-y-3">
							{features.map((feature, index) => (
								<li key={index} className="flex items-center gap-3">
									{feature.icon}
									<span className="text-sm flex-1">{feature.name}</span>
									{typeof feature.pro === "boolean" ? (
										feature.pro ? (
											<Check className="h-4 w-4 text-green-500" />
										) : (
											<X className="h-4 w-4 text-muted-foreground" />
										)
									) : (
										<span className="text-sm font-medium">{feature.pro}</span>
									)}
								</li>
							))}
						</ul>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
							onClick={() => handlePlanSelect("pro")}
						>
							Upgrade to Pro
						</Button>
					</CardFooter>
				</Card>
			</div>

			{/* Payment Form - Shows when Pro is selected */}
			{selectedPlan === "pro" && (
				<Card className="max-w-2xl mx-auto">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Shield className="h-5 w-5" />
							Complete Your Pro Subscription
						</CardTitle>
						<CardDescription>
							You're upgrading to Pro - $
							{isYearly ? Math.round(yearlyPrice / 12) : monthlyPrice}/month
							{isYearly && ` (billed annually at $${yearlyPrice})`}
						</CardDescription>
					</CardHeader>

					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-6">
							{/* Account Information */}
							<div className="space-y-4">
								<Label className="text-base font-medium">
									Account Information
								</Label>
								<div className="grid gap-4">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="firstName">First Name</Label>
											<Input id="firstName" placeholder="John" required />
										</div>
										<div className="space-y-2">
											<Label htmlFor="lastName">Last Name</Label>
											<Input id="lastName" placeholder="Doe" required />
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Email Address</Label>
										<Input
											id="email"
											type="email"
											placeholder="john@company.com"
											required
										/>
									</div>
								</div>
							</div>

							<Separator />

							{/* Payment Information */}
							<div className="space-y-4">
								<Label className="text-base font-medium">
									Payment Information
								</Label>
								<div className="grid gap-4">
									<div className="space-y-2">
										<Label htmlFor="cardNumber">Card Number</Label>
										<Input
											id="cardNumber"
											placeholder="1234 5678 9012 3456"
											className="font-mono"
											required
										/>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="expiry">Expiry Date</Label>
											<Input
												id="expiry"
												placeholder="MM/YY"
												className="font-mono"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="cvc">CVC</Label>
											<Input
												id="cvc"
												placeholder="123"
												className="font-mono"
												required
											/>
										</div>
									</div>
								</div>
							</div>

							<Separator />

							{/* Order Summary */}
							<div className="space-y-4">
								<Label className="text-base font-medium">Order Summary</Label>
								<div className="bg-muted/50 rounded-lg p-4 space-y-2">
									<div className="flex justify-between">
										<span>Pro Plan ({isYearly ? "Annual" : "Monthly"})</span>
										<span>${isYearly ? yearlyPrice : monthlyPrice}</span>
									</div>
									{isYearly && (
										<div className="flex justify-between text-sm text-green-600">
											<span>Annual discount</span>
											<span>-${monthlyPrice * 12 - yearlyPrice}</span>
										</div>
									)}
									<Separator />
									<div className="flex justify-between font-medium">
										<span>
											Total{" "}
											{isYearly ? "(billed annually)" : "(billed monthly)"}
										</span>
										<span>${isYearly ? yearlyPrice : monthlyPrice}</span>
									</div>
								</div>
							</div>
						</CardContent>

						<CardFooter className="flex flex-col space-y-4">
							<Button
								type="submit"
								className="w-full"
								size="lg"
								disabled={isProcessing}
							>
								{isProcessing ? (
									<>
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Processing...
									</>
								) : (
									<>
										<Crown className="h-4 w-4 mr-2" />
										Subscribe to Pro - ${isYearly ? yearlyPrice : monthlyPrice}
									</>
								)}
							</Button>

							<div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => setSelectedPlan(null)}
								>
									← Back to plans
								</Button>
							</div>

							<p className="text-xs text-muted-foreground text-center">
								Secure payment with 256-bit SSL encryption. Cancel anytime.
							</p>
						</CardFooter>
					</form>
				</Card>
			)}
		</div>
	);
};

export default PaymentInfo;
