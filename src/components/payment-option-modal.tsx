import { IModalProps, PaymentOption } from "@/types/app";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	Radio,
	RadioGroup,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import VueSaxBank from "@/assets/icons/vue-sax-bank";
import VueSaxCard from "@/assets/icons/vue-sax-card";
import VueSaxAddCircle from "@/assets/icons/vue-sax-add-circle";

export default function PaymentOptionModal({
	onOpenChange,
	open,
	onOkay,
}: IModalProps<string>) {
	const [selectedOption, setSelectedOption] = useState("");

	const onClose = () => {
		setSelectedOption("");
		onOpenChange(false);
	};

	const handleContinue = () => {
		onOkay(selectedOption);
		onClose();
	};
	return (
		<Dialog open={open} onClose={onClose} className="relative z-50 font-inter">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/30 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
			/>
			<div className="fixed inset-0 flex w-screen items-center justify-center">
				<DialogPanel
					transition
					className="max-w-[500px] w-full space-y-4 drop-shadow-2xl pt-6 pb-4 bg-white rounded-[20px]"
				>
					<DialogTitle className="font-semibold flex items-center justify-between px-4 text-neutral-headlines text-2xl">
						Payment Option
						<XIcon onClick={() => onClose()} className="size-4" />
					</DialogTitle>
					<div className="w-full h-[0.5px] bg-[#E6E8F0]" />

					<RadioGroup
						value={selectedOption}
						onChange={setSelectedOption}
						aria-label="Payment Option"
						className="space-y-3 px-4"
					>
						<Radio
							value={PaymentOption.BANK_TRANSFER}
							className="group relative flex cursor-pointer rounded-lg border px-4 py-6 transition border-[#D8DAE5] data-[checked]:border-[#5E5204] data-[checked]:border-2"
						>
							<div className="flex w-full items-center flex-1 space-x-4">
								<VueSaxBank className="size-5 text-neutral-headlines" />
								<span className="text-neutral-text font-semibold">
									Bank Transfer
								</span>
							</div>
							<div className="border-2 border-[#8F95B2] flex items-center justify-center group-data-[checked]:border-[#5E5204] size-5 rounded-full transition-all duration-200">
								<div className="bg-[#5E5204] h-[10px] w-[10px] rounded-full hidden group-data-[checked]:block transition-all duration-200" />
							</div>
						</Radio>

						<Radio
							value={PaymentOption.CREDIT_OR_DEBIT}
							className="group relative flex cursor-pointer rounded-lg border px-4 py-6 transition border-[#D8DAE5] data-[checked]:border-[#5E5204] data-[checked]:border-2"
						>
							<div className="flex w-full items-center flex-1 space-x-4">
								<VueSaxCard className="size-5 text-neutral-headlines" />
								<span className="text-neutral-text font-semibold">
									Add Debit/Credit Card
								</span>
							</div>
							<div className="border-2 border-[#8F95B2] flex items-center justify-center group-data-[checked]:border-[#5E5204] size-5 rounded-full transition-all duration-200">
								<div className="bg-[#5E5204] h-[10px] w-[10px] rounded-full hidden group-data-[checked]:block transition-all duration-200" />
							</div>
						</Radio>
					</RadioGroup>

					<div className="px-6 flex items-center space-x-4 mt-7">
						<VueSaxAddCircle className="size-5 text-neutral-headlines" />
						<p className="text-neutral-text font-semibold">
							Add Payment Method
						</p>
					</div>

					<div className="px-4 mt-[78px]">
						<Button
							disabled={!selectedOption}
							onClick={handleContinue}
							size="lg"
							className="w-full font-semibold"
						>
							Continue
						</Button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
