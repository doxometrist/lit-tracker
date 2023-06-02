import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import IconCompass from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/compass.tsx";
import IconListNumbers from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/list-numbers.tsx";
import IconSkull from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/skull.tsx";

import IconCalendarStats from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/calendar-stats.tsx";

interface FeatureItem {
  icon: any;
  description: string;
  link: string;
}

function OneFeature(props: { item: FeatureItem }) {
  const item = props.item;
  return (
    <div class="flex-1 space-y-2">
      <div class="bg-secondary2 inline-block p-3 rounded-xl text-bone">
        <item.icon class="w-10 h-10" />
      </div>
      <p class="text-xl text-bone">
        {item.description}
      </p>

      {item.link &&
        (
          <a class="block" href={item.link}>
            <p class="text-bone cursor-pointer hover:underline inline-flex items-center group">
              Read More{" "}
              <IconChevronRight class="inline-block w-5 h-5 transition group-hover:translate-x-0.5" />
            </p>
          </a>
        )}
    </div>
  );
}

export default function Features() {
  const featureItems: FeatureItem[] = [
    {
      icon: IconCompass,
      description: "Discover new books",
      link: "/discover",
    },
    {
      icon: IconCalendarStats,
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
    <div class="flex flex-col md:flex-row gap-8 bg-primary2 p-8 rounded-xl">
      {featureItems.map((item) => <OneFeature item={item} />)}
    </div>
  );
}
