import { TransactionStatus } from "@/types/app";

export default function StatusIndicator({
	status,
}: {
	status: TransactionStatus;
}) {
	const getStatusColor = (status: TransactionStatus): string => {
		switch (status) {
			case "pending":
				return "bg-[#FFB020]";
			case "failed":
				return "bg-red-500";
			case "successful":
				return "bg-[#429777]";
			default:
				return "bg-gray-400";
		}
	};

	return (
		<div className="flex items-center">
			<div
				className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}
				aria-hidden="true"
			/>
			<span className="ml-[6px] text-xs capitalize text-beam-800">{status}</span>
		</div>
	);
}
