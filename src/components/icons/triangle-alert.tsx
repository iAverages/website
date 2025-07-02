import type { JSX } from "solid-js";

type SvgIconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export const TriangleAlert = (props: SvgIconProps) => (
	<svg
		class="w-12 h-12 mb-2"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		{...props}
	>
		<title>triangle alert</title>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width={2}
			d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
		/>
	</svg>
);
