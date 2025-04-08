import { createBrowserRouter } from "react-router";
import { AuthLayout } from "./layouts/auth-layout";
import { Login } from "./pages/login";
import { NotFound } from "./pages/not-found";
import { Signup } from "./pages/sign-up";
import { ForgotPassword } from "./pages/forgot-password";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { Wallet } from "./pages/wallet";

export const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/sign-up",
				element: <Signup />,
			},
			{
				path: "/forgot-password",
				element: <ForgotPassword />,
			},
		],
	},
	{
		element: <DashboardLayout />,
		children: [
			{
				path: "/wallet",
				element: <Wallet />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
