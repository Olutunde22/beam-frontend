import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, LoginType } from "@/lib/schemas";
import { useLoginMutation } from "@/state/api/auth-api-slice";
import { useAppDispatch } from "@/state/hook";
import { setCredentials } from "@/state/slice/auth-slice";
import { IErrorResponse } from "@/types/app";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import { useTransition } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export const Login = () => {
	const [isLoading, startTransition] = useTransition();
	const [loginUser] = useLoginMutation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLogin = (
		values: LoginType,
		{ resetForm }: FormikHelpers<LoginType>
	) => {
		startTransition(async () => {
			try {
				const response = await loginUser(values).unwrap();
				if (response.success) {
					toast.success("Welcome back!");
					resetForm();
					dispatch(setCredentials({ user: response.data }));
					navigate("/wallet");
				} else {
					toast.error(response.message);
				}
			} catch (err) {
				toast.error((err as IErrorResponse).message);
			}
		});
	};
	return (
		<section className="lg:mt-[156px]">
			<h1 className="text-beam-1000 text-2xl lg:text-4xl tracking-[0.5%] font-semibold">
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
						<Field
							placeholder="Enter your email"
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

					<div>
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
