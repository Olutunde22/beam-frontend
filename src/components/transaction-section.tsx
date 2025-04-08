import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "./ui/button";
import Select from "./ui/select";
import { format } from "date-fns";

export const TransactionSection = () => {
	const columns: ColumnDef<any>[] = [
		{
			header: "Transaction ID",
			accessorKey: "transactionId",
		},
		{
			header: "Transaction Type",
			accessorKey: "transactionType",
		},
		{
			header: "Amount (₦)",
			accessorKey: "amount",
		},
		{
			header: "Status",
			accessorKey: "status",
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
			id: "status",
		},
	];
	return (
		<div className="flex-1 lg:border-l lg:border-[#C8CBD9] pb-[21px] font-inter">
			<h1 className="text-[#1F384C] lg:pl-10 font-semibold text-base">
				Transaction History
			</h1>

			<div className="flex lg:pl-10 justify-between space-x-4 mt-5">
				<div className="flex items-center gap-[6px]">
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

			<DataTable rootClassName="mt-5" columns={columns} data={[]} />
		</div>
	);
};
