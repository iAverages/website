import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import viteSolid from "vite-plugin-solid";

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: { tsconfigPaths: true },
	plugins: [
		icons({ compiler: "solid", jsx: "react" }),
		tailwindcss(),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tanstackStart(),
		viteSolid({ ssr: true }),
	],
});
