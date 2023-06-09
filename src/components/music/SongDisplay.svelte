<script lang="ts">
    import { createQuery } from "@tanstack/svelte-query";
    import { z } from "zod";
    import Progress from "../Progress.svelte";
    import { onDestroy, afterUpdate } from "svelte";

    const playingNow = z.object({
        song: z.object({
            artist: z.object({
                name: z.string(),
                url: z.string(),
            }),
            name: z.string(),
            duration: z.number(),
            url: z.string(),
        }),
        is_playing: z.literal(true),
        progress: z.number(),
        playlist_url: z.string(),
        icon: z.string(),
        levels: z.array(z.number()),
    });

    const paused = z.object({
        is_playing: z.literal(false),
    });

    type PlayingNow = z.infer<typeof playingNow>;
    type Paused = z.infer<typeof paused>;
    type MessageStatus = { message: string };
    type SpotifyStatus = PlayingNow | Paused;

    let canvas: HTMLCanvasElement;

    const updateCanvas = (d?: SpotifyStatus) => {
        if (!canvas) return;
        const data = d || $query.data;
        if (!data) return;

        if (!data.is_playing) return;
        if (!canvas) return;

        // Make canvas responsive
        // @ts-expect-error - parentNode has getBoundingClientRect?
        const { height, width } = canvas.parentNode?.getBoundingClientRect();

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d")!;
        const waveform = data.levels;

        for (let x = 0; x < width; x++) {
            if (x % 8 == 0) {
                let idx = Math.ceil(waveform.length * (x / width));

                let h = Math.round(waveform[idx]! * height) / 2;
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = "#1c1917";

                ctx.fillRect(x, height / 2 - h, 4, h);
                ctx.fillRect(x, height / 2, 4, h);
            }
        }
    };

    const query = createQuery<SpotifyStatus, MessageStatus>({
        queryKey: ["spotify"],
        refetchInterval: 10000,
        onSettled: (data) => {
            updateCanvas(data);
        },
        queryFn: async () => {
            try {
                const res = await fetch(import.meta.env.PUBLIC_KAORI_URL + "/api/player");
                const data = await res.json();
                if (data.message) {
                    return { is_playing: false, message: data.message };
                }
                if (data.is_playing) {
                    return playingNow.parse(data);
                } else {
                    return paused.parse(data);
                }
            } catch (e) {
                console.error(e);
                return { is_playing: false };
            }
        },
    });

    let localProgress = 0;
    let lastSong = "";

    const interval = setInterval(() => {
        if ($query.data?.is_playing) {
            if (lastSong !== $query.data.song.name) {
                localProgress = 0;
                lastSong = $query.data.song.name;
            }
            if (localProgress >= $query.data.song.duration) {
                localProgress = 0;
                $query.refetch();
            }
            if ($query.data.progress > localProgress) {
                localProgress = $query.data.progress;
            }
            localProgress += 100;
        }
    }, 100);

    onDestroy(() => {
        clearInterval(interval);
    });

    const msToMinuteSecond = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
    };

    afterUpdate(() => {
        updateCanvas();
    });
</script>

<div>
    <div>
        {#if $query.isLoading}
            <p>Loading...</p>
        {:else if $query.isError}
            <p>Error: {$query.error.message}</p>
        {:else if $query.isSuccess}
            {#if $query.data.is_playing}
                <div class="w-full flex items-center bg-stone-800">
                    <img src={$query.data.icon} alt="Artist" class="w-36 h-36" />
                    <div class="w-full relative">
                        <div class="absolute w-full h-full">
                            <div class="flex flex-col justify-center h-full px-6">
                                <p class="my-2 text-xl font-medium">
                                    {$query.data.song.name} by {$query.data.song.artist.name}
                                </p>
                                <Progress progress={(localProgress / $query.data.song.duration) * 100} />
                                <p>
                                    {msToMinuteSecond(localProgress)} / {msToMinuteSecond($query.data.song.duration)}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div class="w-full h-32">
                                <canvas bind:this={canvas} class="w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
            {:else}
                <div>Not playing anything atm</div>
            {/if}
        {/if}
    </div>
</div>
