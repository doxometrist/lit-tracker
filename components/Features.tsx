import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";

import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book.tsx";

import IconListNumbers from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/list-numbers.tsx";

import IconCompass from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/compass.tsx";

import IconSkull from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/skull.tsx";

export default function Features() {
  const featureItems = [
    {
      icon: IconCompass,
      description: "Discover new books",
      link: "/discover",
    },
    {
      icon: IconBook,
      description: "See books ",
      link: "/books",
    },
    {
      icon: IconListNumbers,
      description: "Track your reads.",
      link: "/lists",
    },
    {
      icon: IconSkull,
      description: "AGI is coming, plan your reading time well...",
      link: "/login",
    },
  ];

  return (
    <div class="flex flex-col md:flex-row gap-8 bg-white p-8">
      {featureItems.map((item) => {
        return (
          <div class="flex-1 space-y-2">
            <div class="bg-blue-600 inline-block p-3 rounded-xl text-white">
              <item.icon class="w-10 h-10" />
            </div>
            <p class="text-xl">
              {item.description}
            </p>

            {item.link &&
              (
                <a class="block" href={item.link}>
                  <p class="text-blue-500 cursor-pointer hover:underline inline-flex items-center group">
                    Read More{" "}
                    <IconChevronRight class="inline-block w-5 h-5 transition group-hover:translate-x-0.5" />
                  </p>
                </a>
              )}
          </div>
        );
      })}
    </div>
  );
}
