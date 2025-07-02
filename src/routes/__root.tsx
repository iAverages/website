/// <reference types="vite/client" />

import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import type * as Solid from "solid-js";
import { DefaultErrorComponent } from "~/components/router/catch-boundary";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charset: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo(),
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	errorComponent: () => {
		return (
			<RootDocument>
				<DefaultErrorComponent />
			</RootDocument>
		);
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: Solid.JSX.Element }) {
	return (
		<>
			<HeadContent />
			<div class="dark">
				<div class="min-h-screen bg-white dark:bg-black">{children}</div>
			</div>
			<TanStackRouterDevtools position="bottom-right" />
			<Scripts />
		</>
	);
}
