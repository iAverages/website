import { formatDistanceToNow } from "date-fns";
import { createFileRoute } from "@tanstack/solid-router";
import { For, onMount, createSignal, Show } from "solid-js";
import { Button } from "~/components/button";
import { Badge } from "~/components/badge";

const getSpotify = async () => {
  const response = await fetch(
    "https://s.kirsi.dev/api/profile/fp0sllluqyvm69f5ukrc6buv/history",
  );
  const json = (await response.json()) as SpotifyData;
  return json;
};

export const Route = createFileRoute("/")({
  component: Home,
  loader: getSpotify,
});

export type SpotifyData = {
  cursor: number;
  data: Array<{
    id: string;
    time: number;
    name: string;
    duration: number;
    explicit: number;
    artistId: string;
    albumId: string;
    albumName: string;
    coverArt: string;
    artistName: string;
  }>;
};

const projects = [
  {
    title: "machina",
    description: "tracks personal listening history with detailed analytics.",
    tech: [
      "solidjs",
      "rust",
      "bun",
      "tanstack-start",
      "prometheus",
      "docker",
      "openapi",
    ],
    github: "https://github.com/iAverages/machina",
    demo: "https://s.kirsi.dev/dan",
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
];

function Home() {
  const spotifyData = Route.useLoaderData();
  const recentTracks = () => spotifyData().data;

  return (
    <div class="min-h-screen bg-white dark:bg-black">
      <main class="max-w-4xl mx-auto px-6 py-12 space-y-16">
        <section>
          <h2 class="text-xl font-semibold text-card-foreground mb-4">about</h2>
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
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Project project={project} />
            ))}
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-card-foreground mb-6">
            recent listens
          </h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <For each={recentTracks()}>
              {(track) => <Track track={track} />}
            </For>
          </div>
        </section>
      </main>
    </div>
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
            <Button size="sm" variant="outline" class="cursor-pointer">
              {/* <Github class="w-4 h-4 mr-1" /> */}
              Code
            </Button>
          </a>
          <Show when={project.demo}>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <Button size="sm" class="cursor-pointer">
                {/* <ExternalLink class="w-4 h-4 mr-1" /> */}
                Demo
              </Button>
            </a>
          </Show>
        </div>
      </div>
    </div>
  );
};

const Track = ({ track }: { track: SpotifyData["data"][number] }) => {
  return (
    <a
      href={`https://open.spotify.com/track/${track.id.split(":")[2]}`}
      target="_blank"
      rel="noreferrer"
    >
      <div class="flex items-center gap-2 rounded-lg border p-3 group cursor-pointer bg-black/20 backdrop-blur-sm">
        <div class="relative h-16 w-16 flex-shrink-0">
          <Show when={track.coverArt}>
            <img
              src={track.coverArt}
              alt={`${track.name} album cover`}
              class="rounded-md object-cover"
            />
          </Show>
        </div>
        <div class="flex-1 space-y-1 overflow-hidden">
          <div class="group-hover:text-primary text-card-foreground flex gap-1 items-center">
            <h3 class="font-medium leading-none truncate">{track.name}</h3>

            <span class="group-hover:opacity-100 opacity-0">
              {/* <ExternalLink class="size-4" /> */}
            </span>
          </div>
          <p class="text-sm text-muted-foreground truncate">
            {track.artistName}
          </p>
          <p class="text-xs text-muted-foreground truncate">
            {track.albumName}
          </p>
        </div>
        <div class="flex items-center gap-1 text-gray-400 whitespace-nowrap">
          <span class="text-sm">
            {formatDistanceToNow(track.time / 1000, {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </a>
  );
};
