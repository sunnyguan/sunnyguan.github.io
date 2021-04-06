<script>
  export let title;
  export let items;
</script>

<div class="leading-snug">
  <div class="font-medium text-lg">{title}</div>
  {#each items as item}
    <div class="font-light col-span-2 flex">
      <div class="flex-1">{item.name}</div>
      {item.date}
    </div>
  {/each}
</div>
