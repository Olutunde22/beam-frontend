import { createBrowserRouter } from "react-router";
import { AuthLayout } from "./layouts/auth-layout";
import { Login } from "./pages/login";
import { NotFound } from "./pages/not-found";
import { ForgotPassword } from "./pages/forgot-password";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { Register } from "./pages/register";
import AuthGuard from "./guards/auth.guard";
import ErrorBoundary from "./components/error-boundary";

export const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/",
				element: <Login />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/forgot-password",
				element: <ForgotPassword />,
			},
		],
		errorElement: <ErrorBoundary />,
	},
	{
		element: <AuthGuard />,
		children: [
			{
				element: <DashboardLayout />,
				children: [
					{
						path: "/wallet",
						lazy:() => import("./pages/wallet")
					},
				],
			},
		],
		errorElement: <ErrorBoundary />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
