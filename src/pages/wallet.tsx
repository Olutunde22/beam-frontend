import { BalanceSection } from "@/components/balance-section";
import { TransactionSection } from "@/components/transaction-section";

export function Component() {
	return (
		<section>
			<h4 className="text-[#0C110D] font-bold text-2xl">Wallet</h4>

			<div className="bg-[#C8CBD9] h-[0.5px] mt-[43px]" />

			<div className="flex mt-10 flex-col lg:flex-row gap-10">
				<BalanceSection />
				<TransactionSection />
			</div>

			<div className="bg-[#C8CBD9] h-[0.5px] mt-[18px] hidden lg:block" />
		</section>
	);
}
