import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-auto rounded-md transition-all disabled:pointer-events-none",
	{
		variants: {
			variant: {
				default:
					"bg-beam-yellow text-beam-1000 hover:bg-beam-yellow/70 disabled:bg-beam-yellow/50 disabled:text-beam-1000/50 transition-all duration-200",
				secondary:
					"bg-[linear-gradient(135.83deg,_#3E3E39_-59.4%,_#0D0D0C_137.23%)] text-white hover:bg-[linear-gradient(135.83deg,_#3E3E39_-59.4%,_#0D0D0C_137.23%)]/80",
				ghost:
					"bg-transparent border border-beam-300 text-beam-700 hover:bg-beam-300/90 disabled:text-beam-500 rounded-[5px]",
			},
			size: {
				default: "h-12 px-4 py-[13px] font-bold text-base",
				sm: "h-8 rounded-md gap-1.5 px-3 text-[11px]",
				lg: "h-14 rounded-md px-6",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant,
	size,
	disabled,
	loading,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		loading?: boolean;
	}) {
	return (
		<button
			className={cn(buttonVariants({ variant, size, className }))}
			data-slot="button"
			{...props}
			disabled={disabled || loading}
		>
			{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
			{props.children}
		</button>
	);
}

export { Button };
