import { cn } from "@/lib/utils";
import {
	ArrowDownTrayIcon,
	ArrowsRightLeftIcon,
	BellIcon,
	ChartBarSquareIcon,
	CogIcon,
	InformationCircleIcon,
	PresentationChartBarIcon,
	PresentationChartLineIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";
import ThemeToggle from "../theme-toggle";

function Sidebar() {
	const location = useLocation();
	const navSections = [
		{
			sectionTitle: "Main",
			links: [
				{
					title: "Overview",
					url: "#",
					icon: <ChartBarSquareIcon className="size-[18px]" />,
				},
				{
					title: "Customers",
					url: "#",
					icon: <UserGroupIcon className="size-[18px]" />,
				},
				{
					title: "Spot Orders",
					url: "#",
					icon: <PresentationChartBarIcon className="size-[18px]" />,
				},
				{
					title: "Margin Orders",
					url: "#",
					icon: <PresentationChartLineIcon className="size-[18px]" />,
				},
				{
					title: "Transactions",
					url: "#",
					icon: <ArrowsRightLeftIcon className="size-[18px]" />,
				},
				{
					title: "Wallet",
					url: "/wallet",
					icon: <ArrowsRightLeftIcon className="size-[18px]" />,
				},
			],
		},
		{
			sectionTitle: "Others",
			links: [
				{
					title: "Notification",
					url: "#",
					icon: <BellIcon className="size-[18px]" />,
				},
				{
					title: "Settings",
					url: "#",
					icon: <CogIcon className="size-[18px]" />,
				},
				{
					title: "Logout",
					url: "#",
					icon: <ArrowDownTrayIcon className="size-[18px] rotate-90" />,
				},
				{
					title: "Help",
					url: "#",
					icon: <InformationCircleIcon className="size-[18px]" />,
				},
			],
		},
	];
	return (
		<nav className="w-full max-w-[240px] h-full bg-[#0C110D]">
			<div className="h-16 flex items-center px-10 space-x-2 border-b-[0.5px] border-[#C8CBD9]">
				<img src="/logo.webp" alt="beam logo" className="size-6" />
				<span className="text-white text-xs font-bold">BEAM</span>
			</div>
			<div className="mt-10 h-[calc(100vh-130px)] flex flex-col justify-between pb-[151px]">
				<div className="px-10">
					{navSections.map((section, index) => (
						<Fragment key={section.sectionTitle}>
							<>
								<h1 className="text-white text-[11px] uppercase font-poppins">
									{section.sectionTitle}
								</h1>
								<ul className="mt-[27px] flex flex-col space-y-6 font-inter">
									{section.links?.map((link) => (
										<li key={link.title}>
											<Link
												className={cn(
													"flex gap-x-3 items-center text-xs text-beam-300",
													location.pathname.startsWith(link.url) &&
														"text-beam-yellow"
												)}
												to={link.url}
											>
												{" "}
												{link.icon} {link.title}
											</Link>
										</li>
									))}
								</ul>
							</>

							{index !== navSections.length - 1 && (
								<div className="h-[0.5px] bg-[#C8CBD9] my-[49px]" />
							)}
						</Fragment>
					))}
				</div>

				<div className="mt-[130px] mx-5 whitespace-nowrap flex items-center justify-between bg-white rounded-[6px] px-5 py-2 text-[10px] text-beam-1000">
					Switch to dark mode <ThemeToggle />
				</div>
			</div>
		</nav>
	);
}

export { Sidebar };
