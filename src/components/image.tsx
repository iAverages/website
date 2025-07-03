import { createSignal, Show } from "solid-js";
import { cn } from "~/utils/cn";
import { Download } from "./icons/download";
import { Github } from "./icons/github";

export type ImageWithLoadingProps = {
	downloadSrc: string;
	viewLink: string;
	src: string;
	srcset?: string;
	sizes?: string;
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
		<div
			class={cn(
				"relative overflow-hidden bg-muted group",
				props.containerClass,
			)}
		>
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
				<div class="relative">
					<img
						src={props.src}
						alt={props.alt}
						srcset={props.srcset}
						sizes={props.sizes}
						class={cn(
							"object-cover transition-opacity duration-300",
							isLoading() ? "opacity-0" : "opacity-100",
							props.class,
						)}
						onLoad={handleLoad}
						onError={handleError}
					/>

					<div class="absolute top-0 left-0 size-full  hover:opacity-40 duration-200 transition-opacity opacity-0 bg-muted z-20 grid grid-cols-2 gap-8">
						<div class="flex size-full items-center justify-end">
							<a href={props.viewLink} target="_blank">
								<div class="p-3 hover:bg-black rounded-lg">
									<Github />
								</div>
							</a>
						</div>
						<div class="hover:bg-muted flex size-full items-center justify-start">
							<a
								href={props.src}
								onClick={(e) => {
									e.preventDefault();
									const a = document.createElement("a");
									a.href = props.downloadSrc;
									a.target = "_blank";
									a.click();
								}}
							>
								<div class="p-3 hover:bg-black rounded-lg">
									<Download />
								</div>
							</a>
						</div>
					</div>
				</div>
			</Show>
		</div>
	);
}
