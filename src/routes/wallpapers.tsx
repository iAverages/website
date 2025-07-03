import { Octokit } from "@octokit/rest";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createFileRoute, Link } from "@tanstack/solid-router";
import { createEffect, createSignal, For, on } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import * as z from "zod/v4-mini";
import { LeftFacingArrow } from "~/components/icons/left-facing-arrow";
import { ImageWithLoading } from "~/components/image";
import { type Breakpoints, useActiveBreakpoint } from "~/hooks/use-breakpoint";
import { projects } from "~/projects";

const git = new Octokit();

const wallpapersSchema = z.array(
	z.object({
		name: z.string(),
		path: z.string(),
		html_url: z.string(),
		download_url: z.string(),
	}),
);

export const Route = createFileRoute("/wallpapers")({
	component: RouteComponent,
	ssr: false,
	loader: async () => {
		const response = await git.repos.getContent({
			owner: "iAverages",
			repo: "dotfiles",
			path: "wallpapers",
		});

		const validator = wallpapersSchema.safeParse(response.data);
		if (validator.success) {
			return validator.data;
		}

		throw new Error("Failed to load wallpapers from github");
	},
	onCatch: console.log,
});

const CF_TRANSFORM_BASE = `https://danielraybone.com/cdn-cgi/image/format=auto,`;

const breakpointColumns = {
	xs: 2,
	sm: 2,
	md: 3,
	lg: 4,
	xl: 5,
	"2xl": 5,
} satisfies Record<Breakpoints, number>;

function RouteComponent() {
	// biome-ignore lint/style/noNonNullAssertion: will be set, probably
	// biome-ignore lint/style/useConst: needs to be let for jsx assignment
	let lastElementRef: HTMLDivElement = null!;

	const data = Route.useLoaderData();
	type Wallpaper = ReturnType<typeof data>[number];

	const visible = createVisibilityObserver({ threshold: 0.8 })(
		() => lastElementRef,
	);

	const [totalVisible, setTotalVisible] = createSignal(20);
	const activeBreakpoint = useActiveBreakpoint();
	const [groupedImages, setGroupedImages] = createStore<Wallpaper[][]>([]);

	createEffect(
		on([totalVisible, activeBreakpoint], ([totalVisible, activeBreakpoint]) => {
			const toShow = data().slice(0, totalVisible);
			const columns = breakpointColumns[activeBreakpoint];
			setGroupedImages(
				reconcile(
					toShow.reduce<Wallpaper[][]>(
						(acc, wallpaper, index) => {
							acc[index % columns].push(wallpaper);
							return acc;
						},
						Array.from({ length: columns }, () => []),
					),
				),
			);
		}),
	);

	// if we are still visible, increase total again
	let updating = false;
	createEffect(
		on(totalVisible, () => {
			if (updating || updating) return;
			requestAnimationFrame(() => {
				if (visible()) {
					setTotalVisible((value) => value + 10);
					updating = true;
				}
			});
		}),
	);

	// when last element comes into view, update total rendered
	createEffect(
		on(visible, (visible) => {
			if (!visible || totalVisible() >= data().length) return;
			setTotalVisible((value) => value + 10);
		}),
	);

	return (
		<div class="px-6 text-white max-w-[1880px] mx-auto">
			<section class="max-w-4xl mx-auto px-3 md:px-6 py-12 space-y-16">
				<h2 class="text-xl font-semibold text-card-foreground mb-4 flex gap-2 items-center ">
					<Link
						to="/"
						class="group text-muted-foreground hover:text-card-foreground duration-200 transition-colors px-2 py-2 rounded-lg hover:bg-white/5 flex items-center cursor-pointer"
					>
						<LeftFacingArrow />
					</Link>
					wallpapers
				</h2>
				<p class="text-muted-foreground leading-relaxed max-w-2xl">
					below is a list of all the wallpapers i use. most of them taken from
					anime i have watched. i use{" "}
					<a
						class="text-primary hover:underline"
						href={projects.find((p) => p.title === "mirai")?.github}
					>
						mirai
					</a>{" "}
					to manage my selected wallpaper.
				</p>
			</section>

			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
				<For each={groupedImages}>
					{(group) => (
						<div class="flex gap-3 flex-col">
							<For each={group}>
								{(wallpaper) => (
									<ImageWithLoading
										src={`${CF_TRANSFORM_BASE}width=360/${wallpaper.download_url}`}
										srcset={`
											${CF_TRANSFORM_BASE}width=180/${wallpaper.download_url} 180w,
											${CF_TRANSFORM_BASE}width=360/${wallpaper.download_url} 360w,
											${CF_TRANSFORM_BASE}width=720/${wallpaper.download_url} 720w
										`}
										sizes="(max-width: 360px) 100vw, 360px"
										alt="wallpaper"
									/>
								)}
							</For>
						</div>
					)}
				</For>
			</div>
			<div ref={lastElementRef} class="w-full h-12" />
		</div>
	);
}
