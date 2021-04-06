<script>
  import Section from "./Section.svelte";

  let sections = [
    {
      title: "Education",
      items: [
        {
          name: "UT Dallas",
          date: "2020 - 2022",
        },
      ],
    },
    {
      title: "Experiences",
      items: [
        {
          name: "Virtu Financial",
          date: "Fall 2021",
        },
        {
          name: "Amazon",
          date: "Summer 2021",
        },
      ],
    },
    {
      title: "Extracurriculars",
      items: [
        {
          name: "Head of Tech",
          date: "FinTech UTD",
        },
        {
          name: "Research Lead",
          date: "ACM Research",
        },
        {
          name: "Developer",
          date: "ACM Development",
        },
      ],
    },
  ];
</script>

<div class="sm:my-auto">
  <h1
    class="text-2xl font-semibold mb-1 text-center sm:text-left tracking-wide"
  >
    Sunny Guan
  </h1>
  <div class="grid grid-cols-1">
    {#each sections as section}
      <Section {...section} />
    {/each}
  </div>
</div>
