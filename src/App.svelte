<script>
  export let name;
</script>

<div class="h-screen flex item-center justify-center">
  <div
    class="my-auto mx-4 text-center p-6 sm:p-8 grid gap-2 bg-gradient-to-b sm:bg-gradient-to-r from-indigo-200 to-blue-300 shadow-2xl"
  >
    <div class="sm:flex sm:divide-x-2 divide-blue-400 divide-dashed gap-8">
      <div class="left mb-4 sm:mb-0 sm:h-full flex flex-col my-auto">
        <img
          src="images/SunnyGuan.jpeg"
          class="rounded-full mb-2 sm:my-auto mx-auto w-48 "
          alt="Sunny"
        />
        <div class="flex w-min mx-auto m-1 gap-2">
          <a
            href="https://github.com/sunnyguan"
            target="_blank"
            rel="noopener noreferrer"
            class="w-6 h-6"
            ><img
              class=""
              width="24"
              height="24"
              src="images/github.svg"
              alt="github icon"
            />
          </a>
          <a
            href="SunnyGuan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="w-6 h-6"
            ><img
              class=""
              width="24"
              height="24"
              src="images/pdf.svg"
              alt="pdf icon"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/sunny-guan"
            target="_blank"
            rel="noopener noreferrer"
            class="w-6 h-6"
            ><img
              class=""
              width="24"
              height="24"
              src="images/linkedin.svg"
              alt="linkedin icon"
            />
          </a>
        </div>
      </div>
      <div
        class="flex-1 text-left sm:pl-8 place-self-center w-72 sm:w-80 sm:h-full flex flex-col leading-relaxed"
      >
        <div class="sm:my-auto">
          <div
            class="text-2xl font-semibold mb-1 text-center sm:text-left tracking-wide"
          >
            Sunny Guan
          </div>
          <div class="grid grid-cols-1">
            <div class="leading-snug">
              <div class="font-medium text-lg">Education</div>
              <div class="font-light col-span-2 flex">
                <div class="flex-1">UT Dallas</div>
                2020 - 2022
              </div>
            </div>

            <div class="leading-snug">
              <div class="font-medium text-lg">Experiences</div>
              <div class="font-light col-span-2 flex">
                <div class="flex-1">Virtu Financial</div>
                Fall 2021
              </div>
              <div class="font-light col-span-2 flex">
                <div class="flex-1">Amazon</div>
                Summer 2021
              </div>
            </div>

            <div class="leading-snug">
              <div class="font-medium text-lg">Extracurriculars</div>
              <div class="font-light col-span-2 flex">
                <div class="flex-1">Head of Tech</div>
                FinTech UTD
              </div>
              <div class="font-light col-span-2 flex">
                <div class="flex-1">Research Lead</div>
                ACM Research
              </div>
              <div class="font-light col-span-2 flex">
                <div class="flex-1">Developer</div>
                ACM Development
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
