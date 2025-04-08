import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
	currentPage: number;
	pageSize: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({
	currentPage = 1,
	pageSize = 50,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages || totalPages < currentPage;

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	const renderPageButtons = () => {
		const pageNumbers = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 3; i++) {
					pageNumbers.push(i);
				}
				pageNumbers.push("ellipsis");
				pageNumbers.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pageNumbers.push(1);
				pageNumbers.push("ellipsis");
				for (let i = totalPages - 2; i <= totalPages; i++) {
					pageNumbers.push(i);
				}
			} else {
				pageNumbers.push(1);
				pageNumbers.push("ellipsis");
				pageNumbers.push(currentPage - 1);
				pageNumbers.push(currentPage);
				pageNumbers.push(currentPage + 1);
				pageNumbers.push("ellipsis");
				pageNumbers.push(totalPages);
			}
		}

		return pageNumbers.map((page, index) => {
			if (page === "ellipsis") {
				return (
					<span key={`ellipsis-${index}`} className="px-2 hidden sm:inline">
						...
					</span>
				);
			}
			return (
				<Button
					key={page}
					variant="ghost"
					size="sm"
					className={cn(
						"hidden sm:inline-flex p-0 text-[#949CA9] font-normal h-6 w-6 border-0",
						currentPage === page &&
							"text-beam-1000 border border-beam-yellow "
					)}
					onClick={() => handlePageChange(page as number)}
				>
					{page}
				</Button>
			);
		});
	};

	return (
		<div className="flex mt-2 flex-col sm:flex-row items-center justify-end space-x-6 w-full">
			<span className="text-xs font-medium leading-[145%] text-beam-1000">
				Page {(currentPage - 1) * pageSize + 1} to {totalPages}
			</span>
			<div className="flex gap-1">{renderPageButtons()}</div>
			<div className="flex items-center">
				<Button
					variant="ghost"
					className={cn(
						"h-9 w-9 p-0 text-beam-1000 hover:bg-white/50 border-beam-500 rounded-l-lg rounded-r-none disabled:text-beam-300",
						isFirstPage && "pointer-events-none border-beam-300"
					)}
					size="sm"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={isFirstPage}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					className={cn(
						"h-9 w-9 p-0 text-beam-1000 hover:bg-white/50 border-l-0 border-beam-500 rounded-l-none rounded-r-lg disabled:text-beam-300",
						isLastPage && "pointer-events-none border-beam-300"
					)}
					size="sm"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={isLastPage}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
