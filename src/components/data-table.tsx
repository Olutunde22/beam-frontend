import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Pagination from "./pagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data?: TData[] | null;
	className?: string;
	rootClassName?: string;
	emptyState?: React.ReactNode;
	isLoading?: boolean;
	currentPage?: number;
	pageSize?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
	columns,
	className,
	rootClassName,
	data,
	emptyState,
	pageSize,
	isLoading,
	currentPage = 1,
	totalPages = 1,
	onPageChange = () => {},

}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data: data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div
			className={cn(
				"flex h-[calc(100vh-450px)] bg-white space-y-4 flex-col justify-between lg:pl-5 rounded-[10px]",
				rootClassName
			)}
		>
			<div className={cn("w-full lg:pl-5 overflow-auto", className)}>
				<Table>
					<TableHeader className={cn("sticky bg-white z-10 top-0")}>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							Array.from({ length: 15 }).map((_, index) => (
								<TableRow key={index}>
									{columns.map((_, colIndex) => (
										<TableCell key={colIndex}>
											<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
										</TableCell>
									))}
								</TableRow>
							))
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow className="hover:bg-transparent">
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center border-none"
								>
									{emptyState || "No results."}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<Pagination
				currentPage={currentPage}
				pageSize={pageSize ?? 50}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	);
}
