// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import { SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import {
  compareScore,
  getAllItems,
  getAreVotedBySessionId,
  getItemsSince,
  getManyUsers,
  incrementAnalyticsMetricPerDay,
  type Item
} from "@/utils/db.ts";
import { PAGE_LENGTH, calcLastPage, calcPageNum } from "@/utils/pagination.ts";
import { DAY, WEEK } from "std/datetime/constants.ts";
import { Book } from "../utils/db_interfaces.ts";
import type { State } from "./_middleware.ts";

interface HomePageData extends State {
  items: Book[];
}

function calcTimeAgoFilter(url: URL) {
  return url.searchParams.get("time-ago");
}

export const handler: Handlers<HomePageData, State> = {
  async GET(req, ctx) {
    await incrementAnalyticsMetricPerDay("visits_count", new Date());

    const url = new URL(req.url);
    const pageNum = calcPageNum(url);
    const timeAgo = calcTimeAgoFilter(url);
    let allItems: Item[];
    if (timeAgo === "week" || timeAgo === null) {
      allItems = await getItemsSince(WEEK);
    } else if (timeAgo === "month") {
      allItems = await getItemsSince(30 * DAY);
    } else {
      allItems = await getAllItems();
    }

    const items = allItems
      .toSorted(compareScore)
      .slice((pageNum - 1) * PAGE_LENGTH, pageNum * PAGE_LENGTH);

    const itemsUsers = await getManyUsers(items.map((item) => item.userId));

    const areVoted = await getAreVotedBySessionId(
      items,
      ctx.state.sessionId,
    );
    const lastPage = calcLastPage(allItems.length, PAGE_LENGTH);

    return ctx.render({ ...ctx.state, items, itemsUsers, areVoted, lastPage });
  },
};

function TimeSelector() {
  return (
    <div class="flex justify-center">
      {/* These links do not preserve current URL queries. E.g. if ?page=2, that'll be removed once one of these links is clicked */}
      <a class="hover:underline mr-4" href="/?time-ago=week">Last Week</a>
      <a class="hover:underline mr-4" href="/?time-ago=month">Last Month</a>
      <a class="hover:underline mr-4" href="/?time-ago=all">All time</a>
    </div>
  );
}

export default function HomePage(props: PageProps<HomePageData>) {
  return (
    <>
      <Head href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class={`${SITE_WIDTH_STYLES} flex-1 px-4 snap-proximity snap-y  `}>
          <TimeSelector />
          <Hero />
          <Features />
          <Carousel externalImages={[]} showNavigation />
        </div>
      </Layout>
    </>
  );
}
