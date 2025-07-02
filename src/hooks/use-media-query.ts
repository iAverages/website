import { createSignal, onCleanup } from "solid-js";

export function useMediaQuery(query: string) {
	const [matches, setMatches] = createSignal(false);

	const mediaQuery = window.matchMedia(query);
	setMatches(mediaQuery.matches);

	const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
	mediaQuery.addEventListener("change", handler);

	onCleanup(() => mediaQuery.removeEventListener("change", handler));

	return matches;
}
