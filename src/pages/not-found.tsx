import { Link } from "react-router";

export const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
			<h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
			<h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
			<p className="text-gray-600 mb-6">
				Sorry, the page you are looking for does not exist.
			</p>
			<Link
				to="/login"
				className="px-6 py-2 bg-beam-yellow text-white rounded hover:bg-beam-yellow/50 transition"
			>
				Go Home
			</Link>
		</div>
	);
};
