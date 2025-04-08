import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

function Input({
	className,
	rootClassName,
	type,
	suffix,
	...props
}: React.ComponentProps<"input"> & { suffix?: React.ReactNode, rootClassName?: string }) {
	return (
		<div className={cn("relative flex justify-center items-center w-full", rootClassName)}>
			<input
				type={type}
				data-slot="input"
				className={cn(
					"placeholder:text-beam-700 placeholder:font-normal text-beam-1000 border-beam-700 flex h-12 w-full min-w-0 rounded-xl border bg-transparent p-3 text-base tracking-[0.5%] transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
					"focus-visible:border-beam-1000 focus-visible:ring-none focus-visible:border-2",
					className,
					suffix && "pr-10"
				)}
				{...props}
			/>
			{suffix && (
				<div className="absolute right-1 top-1/2 mr-3 flex -translate-y-1/2 transform items-center justify-center">
					{suffix}
				</div>
			)}
		</div>
	);
}

function InputPassword({ className, ...props }: React.ComponentProps<"input">) {
	const [showPassword, setShowPassword] = React.useState(false);
	return (
		<Input
			type={showPassword ? "text" : "password"}
			suffix={
				<span role="button" onClick={() => setShowPassword(!showPassword)}>
					{showPassword ? (
						<EyeIcon className="h-[18px] text-gray-900" />
					) : (
						<EyeSlashIcon className="h-[18px] text-gray-900" />
					)}
				</span>
			}
			className={className}
			{...props}
		/>
	);
}

export { Input, InputPassword };
