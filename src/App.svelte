<script>
  import Bio from './Bio.svelte';
  import Side from './Side.svelte';
</script>

<div class="h-screen flex item-center justify-center dark:bg-gray-900 dark:text-gray-300">
  <div
    class="my-auto mx-4 text-center p-6 sm:p-8 grid gap-2 bg-gradient-to-b sm:bg-gradient-to-r from-indigo-200 to-blue-300 shadow-2xl dark:from-gray-700 dark:to-gray-800"
  >
    <div class="sm:flex sm:divide-x-2 divide-blue-400 divide-dashed gap-8 dark:divide-gray-200">
      <div class="left mb-4 sm:mb-0 sm:h-full flex flex-col my-auto">
        <Side />
      </div>
      <div
        class="flex-1 text-left sm:pl-8 w-72 sm:w-80 sm:h-full flex flex-col"
      >
        <Bio />
      </div>
    </div>
  </div>
</div>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
