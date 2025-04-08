import { IModalProps } from "@/types/app";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { cardDetailsSchema } from "@/lib/schemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function CardDetailsModal({
	onOpenChange,
	open,
}: IModalProps<void>) {
	const [isLoading, startTransition] = useTransition();

	const handlePayNow = () => {
		startTransition(async () => {
			onClose();
		});
	};

	const onClose = () => {
		onOpenChange(false);
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
					<DialogTitle className="font-semibold !mb-[10px] flex items-center justify-between px-4 text-neutral-headlines text-2xl">
						Payment Details
					</DialogTitle>
					<p className="px-4">Please confirm your card details</p>
					<div className="w-full h-[0.5px] bg-[#E6E8F0]" />

					<Formik
						initialValues={{ email: "", password: "" }}
						validationSchema={cardDetailsSchema}
						onSubmit={handlePayNow}
					>
						<Form className="mt-8 space-y-4 px-4">
							<div>
								<Label
									className="mb-[10px] text-neutral-800 font-semibold leading-[100%]"
									htmlFor="cardNumber"
								>
									Card details
								</Label>
								<Field
									placeholder="Enter your card number"
									name="cardNumber"
									className="border-[#D8DAE5] h-[65px] text-sm text-neutral-text placeholder:text-[#696F8C] font-medium"
									type="text"
									suffix={<img src="/master-card.svg" alt="master card logo" />}
									as={Input}
									maxLength={16}
								/>
								<ErrorMessage
									component="span"
									className="text-xs text-red-500"
									name="cardNumber"
								/>
							</div>

							<div>
								<Label
									className="mb-[10px] text-neutral-800 font-semibold leading-[100%]"
									htmlFor="expiryDate"
								>
									Expiry date
								</Label>
								<Field
									name="expiryDate"
									type="date"
									className="border-[#D8DAE5] h-[65px] text-sm text-neutral-text placeholder:text-[#696F8C] font-medium"
									as={Input}
								/>
								<ErrorMessage
									component="span"
									className="text-xs text-red-500"
									name="expiryDate"
								/>
							</div>

							<div className="!mb-0">
								<Label
									className="mb-[10px] text-neutral-800 font-semibold leading-[100%]"
									htmlFor="cvv"
								>
									CVV
								</Label>
								<Field
									placeholder="Enter your cvv"
									name="cvv"
									type="text"
									maxLength={4}
									className="border-[#D8DAE5] h-[65px] text-sm text-neutral-text placeholder:text-[#696F8C] font-medium"
									as={Input}
								/>
								<ErrorMessage
									component="span"
									className="text-xs text-red-500"
									name="cvv"
								/>
							</div>

							<Button
								loading={isLoading}
								type="submit"
								size="lg"
								className="w-full font-semibold mt-[67px]"
							>
								Pay Now
							</Button>
						</Form>
					</Formik>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
