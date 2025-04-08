export default function CopyIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
            {...props}
		>
			<path
				d="M15.4688 12.375V2.53125H5.625"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12.6562 5.34375H2.8125V15.1875H12.6562V5.34375Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
