import { createRouter as createTanStackRouter } from "@tanstack/solid-router";
import { DefaultErrorComponent } from "./components/router/catch-boundary";
import { DefaultNotFoundComponent } from "./components/router/not-found";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const router = createTanStackRouter({
		routeTree,
		defaultPreload: "intent",
		defaultErrorComponent: DefaultErrorComponent,
		defaultNotFoundComponent: DefaultNotFoundComponent,
		scrollRestoration: true,
	});

	return router;
}

declare module "@tanstack/solid-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
