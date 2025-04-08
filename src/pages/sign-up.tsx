import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/lib/schemas";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useTransition } from "react";
import { Link } from "react-router";

export const Signup = () => {
	const [isLoading, startTransition] = useTransition();

	const handleSignUp = () => {
		startTransition(async () => {});
	};
	return (
		<section className="lg:mt-[156px]">
			<h1 className="text-beam-1000 text-4xl tracking-[0.5%] font-semibold">
				Create an account
			</h1>
			<p className="mt-3 text-neutral-text leading-[140%]">
				Already have an account?{" "}
				<Link to="/login" className="underline">
					Login
				</Link>
			</p>
			<Formik
				initialValues={{
					fullName: "",
					email: "",
					password: "",
					agreeToTerms: false,
				}}
				validationSchema={registerSchema}
				onSubmit={handleSignUp}
			>
				<Form className="mt-8 space-y-6">
					<div>
						<Label className="mb-[10px]" htmlFor="email">
							Full name
						</Label>
						<Field
							placeholder="Enter first name"
							name="fullName"
							type="text"
							as={Input}
						/>
						<ErrorMessage
							component="span"
							className="text-xs text-red-500"
							name="fullName"
						/>
					</div>
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

					<div className="!mb-0">
						<Label className="mb-[10px]" htmlFor="password">
							Password
						</Label>
						<Field
							placeholder="Enter your password"
							name="password"
							as={InputPassword}
						/>
						<ErrorMessage
							component="span"
							className="text-xs text-red-500"
							name="password"
						/>
					</div>

					<div className="!mt-3 font-normal text-neutral-800 items-center flex gap-3">
						<Field
							name="agreeToTerms"
							type="checkbox"
							className="size-4 rounded-[4px]"
						/>
						<p className="text-sm">
							I agree to BeamMarkets{" "}
							<span className="text-beam-blue text-sm underline">
								Terms of Service
							</span>{" "}
							and{" "}
							<span className="text-beam-blue text-sm underline">
								Privacy Policy
							</span>
						</p>
					</div>

					<Button
						loading={isLoading}
						variant="secondary"
						className="w-full rounded-[100px]"
						type="submit"
					>
						Register
					</Button>
				</Form>
			</Formik>

			<div className="flex items-center gap-x-6 mt-6">
				<div className="h-[1px] w-full bg-beam-separator" />
				<p className="text-neutral-800 whitespace-nowrap">OR SIGNIN WITH</p>
				<div className="h-[1px] w-full bg-beam-separator" />
			</div>
			<div className="flex items-center justify-center gap-x-3 mt-4">
				<div className="px-12 py-3 border border-gray-icons-normal rounded-[30px]">
					<img src="/google.svg" alt="google logo" className="size-6" />
				</div>
				<div className="px-12 py-3 border border-gray-icons-normal rounded-[30px]">
					<img src="/apple.svg" alt="apple logo" className="size-6 " />
				</div>
			</div>
		</section>
	);
};
