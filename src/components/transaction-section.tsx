import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "./ui/button";
import Select from "./ui/select";
import { format } from "date-fns";
import { ITransactionResponse } from "@/types/app";
import { useListTransactionsQuery } from "@/state/api/transaction-api-slice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import StatusIndicator from "./status-indicator";

export const TransactionSection = () => {
	const [pageSize] = useState(50);
	const [pageNumber, setPageNumber] = useState(1);
	const { isLoading, data } = useListTransactionsQuery({
		page: pageNumber,
		limit: pageSize,
	});

	useEffect(() => {
		if (!isLoading && !data?.success && data?.message) {
			toast.error(data?.message);
		}
	}, [data?.message, data?.success, isLoading]);

	const columns: ColumnDef<ITransactionResponse>[] = [
		{
			header: "Transaction ID",
			accessorKey: "id",
		},
		{
			header: "Transaction Type",
			accessorKey: "type",
			cell: ({ row }) => (
				<span className="capitalize">{row.original.type}</span>
			),
		},
		{
			header: "Credit/Debit",
			accessorKey: "direction",
			cell: ({ row }) => (
				<span className="capitalize">{row.original.direction}</span>
			),
		},
		{
			header: "Amount (₦)",
			accessorKey: "amount",
			cell: ({ row }) => (
				<span>
					{new Intl.NumberFormat("en-NG", {
						style: "currency",
						currency: "NGN",
					}).format(row.original.amount)}
				</span>
			),
		},
		{
			header: "Status",
			accessorKey: "status",
			cell: ({ row }) => <StatusIndicator status={row.original.status} />,
		},
		{
			header: "Date",
			accessorKey: "createdAt",
			cell: ({ row }) => (
				<span>{format(row.original.createdAt ?? new Date(), "dd-MM-yyy")}</span>
			),
		},
		{
			header: "Action",
			cell: () => (
				<Button
					disabled
					variant="ghost"
					className="h-[30px] text-[11px] w-[60px]"
					size="sm"
				>
					View
				</Button>
			),
		},
	];
	return (
		<div className="flex-1 lg:border-l lg:border-[#C8CBD9] pb-[21px] font-inter">
			<h1 className="text-[#1F384C] lg:pl-10 font-semibold text-base">
				Transaction History
			</h1>

			<div className="flex lg:pl-10 flex-col lg:flex-row justify-between gap-4 mt-5">
				<div className="flex  items-center gap-[6px]">
					<Button variant="ghost" size="sm" className="w-[92px]" disabled>
						3 years
					</Button>
					<Button variant="ghost" size="sm" className="w-[92px]" disabled>
						Approved
					</Button>
					<Button variant="ghost" size="sm" className="w-[92px]" disabled>
						Pending
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="w-[92px] border-beam-1000 text-beam-1000"
					>
						History
					</Button>
				</div>

				<div className="flex items-center space-x-[6px]">
					<span className="text-gray-50 text-xs font-medium tracking-[0.5px]">
						Filter by
					</span>
					<Select
						placeholder="Spot"
						options={[
							{
								label: "Week",
								value: "week",
							},
							{
								label: "Month",
								value: "month",
							},
						]}
					/>
				</div>
			</div>

			<DataTable
				pageSize={pageSize}
				currentPage={pageNumber}
				onPageChange={(page) => setPageNumber(page)}
				totalPages={data?.data?.totalPages}
				isLoading={isLoading}
				rootClassName="mt-5"
				columns={columns}
				data={data?.data ? data?.data.data : []}
			/>
		</div>
	);
};
