import { Outlet } from "react-router";
import CollateralizedIcon from "../assets/icons/collateralized";
import ShieldIcon from "../assets/icons/shield";
import WavyCheckIcon from "../assets/icons/wavy-check";

export const AuthLayout = () => {
	const points = [
		{
			icon: <CollateralizedIcon className="text-beam-yellow size-[18px]" />,
			title: "Collateralized",
		},
		{
			icon: <ShieldIcon className="text-beam-yellow size-[18px]" />,
			title: "Secured",
		},
		{
			icon: <WavyCheckIcon className="text-beam-yellow size-[18px]" />,
			title: "Licensed & regulated",
		},
	];
	return (
		<main className="h-screen w-screen flex ">
			<section className="w-full max-w-[466px] hidden lg:flex bg-solid-bg relative flex-col justify-end px-[78px] py-[72px]">
				<img src="/looper-bg.webp" className="absolute top-0 right-0 h-full" />

				<img src="/logo.webp" className="size-12" />
				<h1 className="text-white font-semibold text-3xl tracking-[0.5%] mt-6">
					Unlock High Returns with Collateralized Equity Asset
				</h1>
				<ul className="mt-[42px] flex flex-col space-y-[6px]">
					{points.map((point) => (
						<li
							key={point.title}
							className="inline-flex gap-x-3 text-white text-sm font-light"
						>
							{point.icon} {point.title}
						</li>
					))}
				</ul>
			</section>
			<section className="flex-1 flex lg:block items-center lg:items-start lg:px-[143px] overflow-y-auto">
				<div className="w-[90%] mx-auto lg:mx-0 lg:w-full lg:max-w-[440px]">
					<Outlet />
				</div>
			</section>
		</main>
	);
};
