import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/schemas";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useTransition } from "react";
import { Link } from "react-router";

export const Login = () => {
	const [isLoading, startTransition] = useTransition();

	const handleLogin = () => {
		startTransition(async () => {});
	};
	return (
		<section className="lg:mt-[156px]">
			<h1 className="text-beam-1000 text-4xl tracking-[0.5%] font-semibold">
				Sign in to Beam.
			</h1>
			<p className="mt-3 text-neutral-text leading-[140%]">
				Please sign in with the your assigned login details
			</p>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={loginSchema}
				onSubmit={handleLogin}
			>
				<Form className="mt-8 space-y-6">
					<div>
						<Label className="mb-[10px]" htmlFor="email">
							Email Address
						</Label>
						<Field placeholder="Enter your email" name="email" type="email" as={Input} />
						<ErrorMessage
							component="span"
							className="text-xs text-red-500"
							name="email"
						/>
					</div>

					<div>
						<Label className="mb-[10px]" htmlFor="password">
							Password
						</Label>
						<Field placeholder="Enter your password" name="password" as={InputPassword} />
						<ErrorMessage
							component="span"
							className="text-xs text-red-500"
							name="password"
						/>
						<p className="text-right mt-[6px] font-normal">
							<Link className="text-beam-700 text-sm" to="/forgot-password">
								Forgot Password?
							</Link>
						</p>
					</div>

					<Button
						loading={isLoading}
						variant="secondary"
						className="w-full rounded-[100px]"
						type="submit"
					>
						Log in
					</Button>
				</Form>
			</Formik>
		</section>
	);
};
