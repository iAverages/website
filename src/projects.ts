export const projects = [
	{
		title: "spqtify.com",
		description: "spotify preview embeds, everywhere",
		tech: ["rust", "prometheus", "docker", "effect.js", "nix", "helmchart"],
		github: "http://github.com/iAverages/spqtify.com",
	},
	{
		title: "avrg.dev",
		description: "cloudflare worker for handling serving my image links",
		tech: ["cloudflare-workers", "cloudflare-access", "react", "backblaze-b2"],
		github: "https://github.com/iAverages/avrg.dev",
	},
	{
		title: "mirai",
		description: "lightweight cross-platform wallpaper manager.",
		tech: ["rust", "nix", "cross-platform"],
		github: "https://github.com/iAverages/mirai",
	},
	{
		title: "mei",
		description: "rust discord bot to download video links",
		tech: ["rust", "backblaze-b2"],
		github: "https://github.com/iAverages/mie",
	},

	{
		title: "dotfiles",
		description:
			"my personal dotfiles, including nixos and neovim configurations",
		tech: ["neovim", "nix", "nixos"],
		github: "https://github.com/iAverages/dotfiles",
	},
	{
		title: "auto-buffer-close.nvim",
		description:
			'simple nvim plugin to automatically close unmodified buffers, similar to vscode "preview" mode',
		tech: ["neovim", "lua"],
		github: "https://github.com/iAverages/auto-buffer-close.nvim",
	},
] satisfies Project[];

export type Project = {
	title: string;
	description: string;
	tech: [string, ...string[]];
	github: string;
	demo?: string;
};
