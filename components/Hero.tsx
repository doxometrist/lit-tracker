import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import { BUTTON_STYLES } from "../utils/constants.ts";

export default function Hero() {
  return (
    <div
      class="w-full flex px-8 h-96 justify-center items-center bg-secondary2 flex-col gap-8 bg-cover bg-center bg-no-repeat  rounded-xl text-white"
      // style="background-image:linear-gradient(rgba(0, 0, 40, 0.8),rgba(0, 0, 40, 0.8)), url('/gallery/hero-bg.webp');"
    >
      <div class="space-y-4 text-center">
        <h1 class="text-4xl inline-block font-bold text-bone">Lit tracker</h1>
        <p class="text-xl max-w-lg text-bone">
          Lit tracker is a platform for tracking your reads.
        </p>
      </div>

      <div>
        <a
          href="/login"
          class={` ${BUTTON_STYLES} block mt-4 text-bone cursor-pointer inline-flex items-center group text-bone  px-8 py-2 rounded-md hover:bg-blue-50 font-bold`}
        >
          Sign Up with Github{" "}
        </a>
        <a
          href="#"
          class="block mt-4 transition-colors text-bone cursor-pointer inline-flex items-center group px-4 py-2 hover:text-bone"
        >
          Documentation{" "}
          <IconChevronRight class="inline-block w-5 h-5 transition group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
