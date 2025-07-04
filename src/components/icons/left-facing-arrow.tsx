import type { JSX } from "solid-js";

type SvgIconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export const LeftFacingArrow = (props: SvgIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-chevron-left-icon lucide-chevron-left"
		{...props}
	>
		<title>left chevron</title>
		<path d="m15 18-6-6 6-6" />
	</svg>
);
