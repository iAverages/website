import { createFileRoute, Link } from "@tanstack/solid-router";
import { Show } from "solid-js";
import { Badge } from "~/components/badge";
import { Button } from "~/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/tooltip";
import { projects } from "~/projects";
import ExternalLink from "~icons/lucide/external-link";
import Github from "~icons/lucide/github";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<main class="max-w-4xl mx-auto px-3 md:px-6 py-12 space-y-16">
			<section>
				<div class="flex justify-between">
					<h2 class="text-xl font-semibold text-card-foreground mb-4">about</h2>
					<Link to="/wallpapers">
						<p class="text-muted-foreground hover:text-card-foreground duration-200 transition-colors px-4 py-2 rounded-lg hover:bg-white/5">
							wallpapers
						</p>
					</Link>
				</div>
				<p class="text-muted-foreground leading-relaxed max-w-2xl">
					i'm dan, a software developer who writes a lot of typescript.
					currently exploring programming with rust, learning reproducible
					environments with nix and deploying applications using k3s.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-card-foreground mb-6">
					projects
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((project) => (
						<Project project={project} />
					))}
				</div>
			</section>
		</main>
	);
}

const Project = ({ project }: { project: (typeof projects)[number] }) => {
	return (
		<div class="rounded-lg h-full border bg-card flex flex-col text-card-foreground shadow-smborder border-gray-200 dark:border-neutral-900 hover:shadow-md transition-shadow">
			<div class="flex flex-col space-y-1.5 p-6">
				<div class="font-semibold leading-none tracking-tight text-lg">
					{project.title}
				</div>
				<div class="text-sm text-muted-foreground">{project.description}</div>
			</div>
			<div class="p-6 pt-0 flex justify-between flex-col flex-1 ">
				<div class="flex flex-wrap gap-2 mb-4">
					{project.tech.map((tech) => (
						<Badge variant="secondary" class="text-xs">
							{tech}
						</Badge>
					))}
				</div>
				<div class="flex gap-2 self-end mt-4 justify-self-end">
					<a href={project.github} target="_blank" rel="noopener noreferrer">
						<Button size="icon" variant="outline" class="cursor-pointer">
							<Github class="w-4 h-4" />
						</Button>
					</a>
					<Show when={project.demo}>
						<Tooltip openDelay={0} closeDelay={0}>
							<TooltipTrigger>
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button size="icon" class="cursor-pointer">
										<ExternalLink class="w-4 h-4" />
									</Button>
								</a>
							</TooltipTrigger>
							<TooltipContent>view deployed demo</TooltipContent>
						</Tooltip>
					</Show>
				</div>
			</div>
		</div>
	);
};
