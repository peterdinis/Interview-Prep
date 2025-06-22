"use client";

import { useCreateInterview } from "@/hooks/interviews/useCreateInterview";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import type { FC } from "react";
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
				onError: (error: Error) => {
					setErrorMessage(error.message || "Something went wrong.");
				},
			},
		);
	};

	return (
		<div className="mt-6 lg:mt-0">
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
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
