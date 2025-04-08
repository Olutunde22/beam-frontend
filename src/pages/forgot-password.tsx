import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema } from "@/lib/schemas";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useTransition } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export const ForgotPassword = () => {
	const [isLoading, startTransition] = useTransition();

	const handleForgotPassword = () => {
		startTransition(async () => {
			toast.success("An Email has been sent to reset your password");
			// resetForm();
		});
	};
	return (
		<section className="lg:mt-[156px]">
			<h1 className="text-beam-1000 text-4xl tracking-[0.5%] font-semibold">
				Forgot Password?
			</h1>
			<p className="mt-3 text-neutral-text leading-[140%]">
				Enter your email to rest your password{" "}
				<Link to="/login" className="underline">
					or Login
				</Link>
			</p>
			<Formik
				initialValues={{ email: "" }}
				validationSchema={forgotPasswordSchema}
				onSubmit={handleForgotPassword}
			>
				<Form className="mt-8 space-y-6">
					<div>
						<Label className="mb-[10px]" htmlFor="email">
							Email Address
						</Label>
						<Field
							placeholder="Enter your email address"
							name="email"
							type="email"
							as={Input}
						/>
						<ErrorMessage
							component="span"
							className="text-xs text-red-500"
							name="email"
						/>
					</div>

					<Button
						loading={isLoading}
						variant="secondary"
						className="w-full rounded-[100px]"
						type="submit"
					>
						Forgot Password
					</Button>
				</Form>
			</Formik>
		</section>
	);
};
