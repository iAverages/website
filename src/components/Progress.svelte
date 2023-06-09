<script lang="ts">
    export let progress: number;
</script>

<div class="relative h-4 w-full overflow-hidden rounded-full bg-stone-900">
    <div class="h-4 bg-[#7e22ce] transition-all duration-150 ease-linear" style="width: {progress}%" />
</div>
