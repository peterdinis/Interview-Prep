"use client";

import { useCreateInterview } from "@/hooks/interviews/useCreateInterview";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2, Plus } from "lucide-react";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
	position: z.string().min(2, "Position must be at least 2 characters"),
	company: z.string().min(2, "Company must be at least 2 characters"),
	level: z.string().optional(),
	years: z.string().optional(),
	questionsLength: z.string().optional(),
});

type InterviewFormValues = z.infer<typeof formSchema>;

const DashboardDialog: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const { createInterview, loading } = useCreateInterview();

	const form = useForm<InterviewFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			position: "",
			company: "",
			level: "",
			years: "",
			questionsLength: "",
		},
	});

	const onSubmit = (values: InterviewFormValues) => {
		setErrorMessage("");

		createInterview(
			{
				...values,
				date: new Date().toISOString(),
			},
			{
				onSuccess: () => {
					form.reset();
					setIsOpen(false);
				},
				onError: (error: Error & { status?: number }) => {
					if (error.status === 429) {
						setErrorMessage("You've reached your daily limit of interviews.");
					} else if (error.status === 400) {
						setErrorMessage("Please fill in all required fields correctly.");
					} else {
						setErrorMessage("Something went wrong. Please try again later.");
					}
				},
			},
		);
	};

	return (
		<div className="mt-6 lg:mt-0">
			<Dialog
				open={isOpen}
				onOpenChange={(open) => {
					setIsOpen(open);
					if (open) setErrorMessage("");
				}}
			>
				<DialogTrigger asChild>
					<Button
						className="bg-sky-600 hover:bg-sky-900 rounded-lg text-base"
						size="lg"
					>
						<Plus className="h-7 w-7 mr-2" />
						Create New Interview
					</Button>
				</DialogTrigger>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Interview</DialogTitle>
					</DialogHeader>

					{errorMessage && (
						<Alert variant="destructive">
							<AlertTriangle className="h-5 w-5" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{errorMessage}</AlertDescription>
						</Alert>
					)}

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4 mt-4"
						>
							<FormField
								control={form.control}
								name="position"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Position</FormLabel>
										<FormControl>
											<Input placeholder="e.g. Frontend Developer" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="company"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company</FormLabel>
										<FormControl>
											<Input placeholder="e.g. OpenAI" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="level"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Level</FormLabel>
										<FormControl>
											<Input placeholder="e.g. Junior, Senior" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="years"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Years of Experience</FormLabel>
										<FormControl>
											<Input placeholder="e.g. 3" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="questionsLength"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Questions Count</FormLabel>
										<FormControl>
											<Input placeholder="e.g. 5" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter className="mt-6 space-x-2">
								<DialogClose asChild>
									<Button type="button" variant="outline">
										Cancel
									</Button>
								</DialogClose>
								<Button
									type="submit"
									className="bg-sky-600 text-white"
									disabled={loading}
								>
									{loading ? (
										<Loader2 className="animate-spin w-8 h-8" />
									) : (
										"Create"
									)}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default DashboardDialog;
