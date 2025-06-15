import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tsConfigPaths({
			projects: ["./tsconfig.json"],
		}),

		icons({ compiler: "solid", jsx: "react" }),
		tailwindcss(),
		tanstackStart({}),
	],
});
