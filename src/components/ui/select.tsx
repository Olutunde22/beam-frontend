import { cn } from "@/lib/utils";
import { IOption } from "@/types/app";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Select({
	options,
	placeholder,
}: {
	options?: IOption[];
	placeholder: string;
}) {
	const [selected, setSelected] = useState<IOption>();

	return (
		<div className="border-beam-300 border rounded-[5px]">
			<Listbox value={selected} onChange={setSelected}>
				<ListboxButton
					className={cn(
						"flex items-center w-full rounded-lg py-1.5 px-[18px] text-left text-xs text-gray-50 cursor-pointer",
						"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
					)}
				>
					{selected ? selected.label : placeholder}
					<ChevronDownIcon
						className="group pointer-events-none size-[18px] ml-[10px] fill-black"
						aria-hidden="true"
					/>
				</ListboxButton>
				<ListboxOptions
					anchor="bottom"
					transition
					className={cn(
						"w-[var(--button-width)] bg-white mt-1 rounded-lg border border-beam-300 focus:outline-none",
						"transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
					)}
				>
					{options?.map((option) => (
						<ListboxOption
							key={option.value}
							value={option}
							className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none"
						>
							<CheckIcon className="invisible size-3 fill-black group-data-[selected]:visible" />
							<div className="text-xs text-gray-50">{option.label}</div>
						</ListboxOption>
					))}
				</ListboxOptions>
			</Listbox>
		</div>
	);
}
