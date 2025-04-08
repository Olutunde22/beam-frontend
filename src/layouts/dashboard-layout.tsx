import { Outlet } from "react-router";
import { Sidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
	ChevronDownIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import NotificationIcon from "@/assets/icons/notification";

export const DashboardLayout = () => {
	return (
		<main className="h-screen w-screen flex ">
			<Sidebar />
			<section className="flex-1 overflow-y-auto">
				<div className="h-16 sticky flex items-center justify-between px-10 space-x-2 border-b-[0.5px] border-[#C8CBD9]">
					<Input
						rootClassName="max-w-[329px]"
						className="h-8 bg-[#F5F4F2] rounded-3xl border-none placeholder:text-[#1F384C] placeholder:text-xs text-xs "
						placeholder="Search"
						suffix={<MagnifyingGlassIcon className="text-[#627B87] size-3" />}
					/>

					<div className="flex items-center ">
						<span className="bg-[#FFE6CC] size-[30px] text-xs text-[#1F384C] flex items-center justify-center rounded-full font-semibold">
							M
						</span>
						<p className="text-beam-1000 text-xs ml-3">Magnartis LTD</p>
						<ChevronDownIcon className="text-[#1F384C] size-3 ml-3" />
						<div className="relative ml-[30px]">
							<NotificationIcon className="text-[#B0C3CC]" />
							<div className="h-2 absolute w-2 -top-[2px] -right-[2px] p-[1px] bg-white rounded-full flex items-center justify-center">
								<div className="rounded-full h-full w-full bg-[#EC5252]" />
							</div>
						</div>
					</div>
				</div>
				<div className="w-full lg:p-10 p-4 h-[calc(100vh-64px)] overflow-auto">
					<Outlet />
				</div>
			</section>
		</main>
	);
};
