import { IErrorResponse, IModalProps } from "@/types/app";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { transferSchema, TransferType } from "@/lib/schemas";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransferMutation } from "@/state/api/wallet-api-slice";
import { toast } from "sonner";

export default function TransferModal({
	onOpenChange,
	open,
}: IModalProps<void>) {
	const [isLoading, startTransition] = useTransition();
	const [transfer] = useTransferMutation();

	const handleTransfer = (
		values: TransferType,
		{ resetForm }: FormikHelpers<TransferType>
	) => {
		startTransition(async () => {
			try {
				const response = await transfer(values).unwrap();
				if (response.success) {
					toast.success("Funds sent!");
					resetForm();
					onClose();
				} else {
					toast.error(response.message);
				}
			} catch (err) {
				toast.error((err as IErrorResponse).message);
			}
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
					className="max-w-[90%] md:max-w-[500px]  w-full space-y-4 drop-shadow-2xl pt-6 pb-4 bg-white rounded-[20px]"
				>
					<DialogTitle className="font-semibold !mb-[10px] flex items-center justify-between px-4 text-neutral-headlines text-lg lg:text-2xl">
						Withdraw Amount
					</DialogTitle>
					<p className="px-4">Please confirm the amount</p>
					<div className="w-full h-[0.5px] bg-[#E6E8F0]" />

					<Formik
						initialValues={{ amount: 0, email: "" }}
						validationSchema={transferSchema}
						onSubmit={handleTransfer}
					>
						<Form className="mt-8 space-y-4 px-4">
							<div>
								<Label
									className="mb-[10px] text-neutral-800 font-semibold leading-[100%]"
									htmlFor="email"
								>
									Receiver Email
								</Label>
								<Field
									placeholder="Enter the email of the person you want to transfer to"
									name="email"
									className="border-[#D8DAE5] h-[65px] text-sm text-neutral-text placeholder:text-[#696F8C] font-medium"
									type="email"
									as={Input}
								/>
								<ErrorMessage
									component="span"
									className="text-xs text-red-500"
									name="email"
								/>
							</div>
							<div>
								<Label
									className="mb-[10px] text-neutral-800 font-semibold leading-[100%]"
									htmlFor="amount"
								>
									Amount
								</Label>
								<Field
									placeholder="Enter the amount to send"
									name="amount"
									className="border-[#D8DAE5] h-[65px] text-sm text-neutral-text placeholder:text-[#696F8C] font-medium"
									type="number"
									as={Input}
								/>
								<ErrorMessage
									component="span"
									className="text-xs text-red-500"
									name="amount"
								/>
							</div>

							<div>
								<Label
									className="mb-[10px] text-neutral-800 font-semibold leading-[100%]"
									htmlFor="note"
								>
									Note
								</Label>
								<Field
									name="note"
									type="date"
									className="border-[#D8DAE5] p-3 rounded-lg outline-none w-full border text-sm text-neutral-text placeholder:text-[#696F8C] font-medium"
									as="textarea"
									rows={8}
								/>
							</div>

							<Button
								loading={isLoading}
								type="submit"
								size="lg"
								className="w-full font-semibold mt-[67px]"
							>
								Transfer
							</Button>
						</Form>
					</Formik>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
