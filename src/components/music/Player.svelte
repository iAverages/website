<script lang="ts">
    import Progress from "../Progress.svelte";

    export let canvas: HTMLCanvasElement;
    export let data: any;
    export let localProgress: number;

    const msToMinuteSecond = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
    };
</script>

<div class="w-full flex items-center bg-stone-800">
    <img src={data.icon} alt="Artist" class="w-36 h-36" />
    <div class="w-full relative">
        <div class="absolute w-full h-full">
            <div class="flex flex-col justify-center h-full px-6">
                <p class="my-2 text-xl font-medium">
                    {data.song.name} by {data.song.artist.name}
                </p>
                <Progress progress={(localProgress / data.song.duration) * 100} />
                <p>
                    {msToMinuteSecond(localProgress)} / {msToMinuteSecond(data.song.duration)}
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
