import { Link } from "react-router";

interface IProps {
	message?: string;
}

export default function ErrorFallback({ message }: IProps) {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
			<h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
			<h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
			<p className="text-gray-600 mb-6">
				Something broke on our end : {message}.
			</p>
			<Link
				to="/login"
				className="px-6 py-2 bg-beam-yellow text-white rounded hover:bg-beam-yellow/50 transition"
			>
				Go Home
			</Link>
		</div>
	);
}
