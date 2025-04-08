import * as React from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="label"
			className={cn(
				"flex items-center gap-2 text-base text-beam-700 tracking-[0.5%] leading-none font-normal",
				className
			)}
			{...props}
		/>
	);
}

export { Label };
