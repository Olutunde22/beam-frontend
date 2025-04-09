import { Outlet } from "react-router";
import { Sidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
	ChevronDownIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import NotificationIcon from "@/assets/icons/notification";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import { MenuIcon } from "lucide-react";
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { closeSidebar, openSidebar } from "@/state/slice/side-bar-slice";
import { useCallback, useEffect, Fragment } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardLayout = () => {
	const user = useAppSelector((state) => state.auth.user);
	const sideBar = useAppSelector((state) => state.sidebar.sidebar);
	const dispatch = useAppDispatch();
	const mobile = useIsMobile();

	const onClose = useCallback(() => {
		dispatch(closeSidebar());
	}, [dispatch]);

	const onOpen = () => {
		dispatch(openSidebar());
	};

	useEffect(() => {
		if (!mobile) {
			onClose();
		}
	}, [mobile, onClose]);

	return (
		<main className="h-screen w-screen flex">
			{/** Desktop sidebar */}
			<Sidebar className="hidden lg:flex" />

			{/** Mobile sidebar */}
			<Transition show={sideBar} as={Fragment}>
				<Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
					<TransitionChild
						as={Fragment}
						enter="transition-opacity ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/30" />
					</TransitionChild>

					<div className="fixed inset-0 z-50 flex">
						<TransitionChild
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<DialogPanel className="relative max-w-[260px] w-full bg-white shadow-xl">
								<Sidebar className="flex lg:hidden max-w-[260px]" />
							</DialogPanel>
						</TransitionChild>
						<div className="flex-1" onClick={onClose} />
					</div>
				</Dialog>
			</Transition>

			<section className="flex-1 overflow-y-auto">
				<div className="h-16 sticky flex items-center justify-between px-4 lg:px-10 space-x-2 border-b-[0.5px] border-[#C8CBD9]">
					<Input
						rootClassName="max-w-[329px] hidden lg:block"
						className="h-8  bg-[#F5F4F2] rounded-3xl border-none placeholder:text-[#1F384C] placeholder:text-xs text-xs "
						placeholder="Search"
						suffix={<MagnifyingGlassIcon className="text-[#627B87] size-3" />}
					/>
					<button
						onClick={onOpen}
						className="lg:hidden rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-500 w-10 h-10"
					>
						<MenuIcon className=" h-5 w-5" />
					</button>

					<div className="flex items-center ">
						<span className="bg-[#FFE6CC] size-[30px] text-xs text-[#1F384C] flex items-center justify-center rounded-full font-semibold">
							{user?.fullName.charAt(0)}
						</span>
						<p className="text-beam-1000 text-xs ml-3">{user?.fullName}</p>
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
