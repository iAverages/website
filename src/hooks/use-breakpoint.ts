import type { Accessor } from "solid-js";
import { useMediaQuery } from "./use-media-query";

const breakpoints = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

export type Breakpoints = keyof typeof breakpoints;

export const useBreakpoint = (breakpoint: Breakpoints) =>
	useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);

export const useActiveBreakpoint = (): Accessor<Breakpoints> => {
	const sm = useBreakpoint("sm");
	const md = useBreakpoint("md");
	const lg = useBreakpoint("lg");
	const xl = useBreakpoint("xl");
	const xl2 = useBreakpoint("2xl");

	const activeBreakpoint = () => {
		if (xl2()) return "2xl";
		if (xl()) return "xl";
		if (lg()) return "lg";
		if (md()) return "md";
		if (sm()) return "sm";
		return "xs";
	};

	return activeBreakpoint;
};
