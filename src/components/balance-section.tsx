import BankIcon from "@/assets/icons/bank";
import CopyIcon from "@/assets/icons/copy";
import WalletIcon from "@/assets/icons/wallet";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import PaymentOptionModal from "./payment-option-modal";
import { useEffect, useState } from "react";
import { PaymentOption } from "@/types/app";
import CardDetailsModal from "./card-details-modal";
import { useGetWalletBalanceQuery } from "@/state/api/wallet-api-slice";
import { toast } from "sonner";
import WithdrawModal from "./withdraw-modal";
import TransferModal from "./transfer-modal";
import FundModal from "./fund-modal";

export const BalanceSection = () => {
	const [openAddFunds, setOpenAddFunds] = useState(false);
	const [openCardDetails, setOpenCardDetails] = useState(false);
	const [openWithdrawal, setOpenWithdrawal] = useState(false);
	const [openFundsModal, setOpenFundsModal] = useState(false);
	const [openTransferModal, setOpenTransferModal] = useState(false);
	const { data, isLoading } = useGetWalletBalanceQuery();

	useEffect(() => {
		if (!data?.success) {
			toast.error(data?.message);
		}
	}, [data?.message, data?.success]);

	return (
		<div className="w-full max-w-[369px] font-inter">
			<div className="bg-[#F9F9F7] w-full rounded-[2px]">
				<p className="mx-5 py-6 flex border-b-[0.5px] border-[#C8D9D1] items-center justify-between text-beam-700 text-xs font-medium">
					Actual Balance <WalletIcon className="text-beam-1000 size-[19px]" />
				</p>
				<p className="mx-5 py-[27px] flex items-end border-b-[0.5px] border-[#C8D9D1] text-beam-1000 text-xl font-semibold">
					{isLoading && (
						<span className="animate-pulse rounded-full w-60 h-5 bg-gray-50" />
					)}

					{data?.data && (
						<>
							{" "}
							{new Intl.NumberFormat("en-NG", {
								style: "currency",
								currency: "NGN",
							}).format(data?.data.balance)}
							.
							<span className="text-base text-beam-700 mb-1">
								{data?.data?.balance.toFixed(2).split(".")[1]}
							</span>
						</>
					)}
				</p>
				<p className="mx-5 py-[27px] flex items-center font-medium space-x-3">
					<BankIcon className="size-[40px]" />{" "}
					{isLoading && (
						<span className="animate-pulse rounded-full w-60 h-3 bg-gray-50" />
					)}
					{data?.data && (
						<span className="text-xs ">{data.data.bank.name} 010 210 2020</span>
					)}
					<CopyIcon className="size-[18px]" />
				</p>
				<div className="border-1 w-full border-dashed border-beam-500" />
				<p className="mx-5 py-6 flex border-b-[0.5px] border-[#C8D9D1] items-center justify-between text-beam-700 text-xs font-medium">
					Pending Amount <ClockIcon className="text-beam-1000 size-[18px]" />
				</p>
				<p className="mx-5 pt-[27px] pb-12 flex items-end text-beam-1000 text-xl font-semibold">
					₦0.<span className="text-base text-beam-700 mb-[1px]">00</span>
				</p>
			</div>

			<div className="gap-3 flex mt-[18px]">
				<Button
					onClick={() => setOpenAddFunds(true)}
					className="w-full"
					size="sm"
				>
					Add Funds
				</Button>
				<Button
					onClick={() => setOpenWithdrawal(true)}
					variant="ghost"
					className="w-full"
					size="sm"
				>
					Withdrawal
				</Button>
				<Button
					onClick={() => setOpenTransferModal(true)}
					className="w-full"
					size="sm"
				>
					Transfer
				</Button>
			</div>

			<div className="gap-3 flex mt-3">
				<Button disabled className="w-full" variant="ghost" size="sm">
					PND Amount
				</Button>
				<Button disabled variant="ghost" className="w-full" size="sm">
					Place Lien
				</Button>
				<Button disabled variant="ghost" className="w-full" size="sm">
					Freeze Wallet
				</Button>
			</div>

			<PaymentOptionModal
				onOkay={(selected) => {
					if (selected === PaymentOption.CREDIT_OR_DEBIT) {
						setOpenCardDetails(true);
					} else {
						setOpenFundsModal(true);
					}
				}}
				open={openAddFunds}
				onOpenChange={setOpenAddFunds}
			/>

			<WithdrawModal open={openWithdrawal} onOpenChange={setOpenWithdrawal} />
			<TransferModal
				open={openTransferModal}
				onOpenChange={setOpenTransferModal}
			/>
			<FundModal open={openFundsModal} onOpenChange={setOpenFundsModal} />
			<CardDetailsModal
				onOkay={() => {
					setOpenFundsModal(true);
				}}
				open={openCardDetails}
				onOpenChange={setOpenCardDetails}
			/>
		</div>
	);
};
