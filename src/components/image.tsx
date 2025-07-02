import { createSignal, Show } from "solid-js";
import { cn } from "~/utils/cn";

export type ImageWithLoadingProps = {
	src: string;
	alt?: string;
	class?: string;
	containerClass?: string;
};

export function ImageWithLoading(props: ImageWithLoadingProps) {
	const [isLoading, setIsLoading] = createSignal(true);
	const [hasError, setHasError] = createSignal(false);

	const handleLoad = () => {
		setIsLoading(false);
		setHasError(false);
	};

	const handleError = () => {
		setIsLoading(false);
		setHasError(true);
	};

	return (
		<div class={cn("relative overflow-hidden bg-muted", props.containerClass)}>
			<Show when={isLoading()}>
				<div class="absolute bg-muted" />
			</Show>

			<Show when={hasError()}>
				<div class="absolute inset-0 flex items-center justify-center bg-muted">
					<div class="text-center text-muted-foreground">
						<p class="text-sm">Failed to load wallpaper</p>
					</div>
				</div>
			</Show>

			<Show when={!hasError()}>
				<img
					src={props.src}
					alt={props.alt}
					class={cn(
						"object-cover transition-opacity duration-300",
						isLoading() ? "opacity-0" : "opacity-100",
						props.class,
					)}
					onLoad={handleLoad}
					onError={handleError}
				/>
			</Show>
		</div>
	);
}
