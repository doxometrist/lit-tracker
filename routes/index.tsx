// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Features from "@/components/Features.tsx";
import Head from "@/components/Head.tsx";
import Hero from "@/components/LandingHero.tsx";
import Layout from "@/components/Layout.tsx";
import { SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import { getAllItems } from "@/utils/db.ts";
import { Book } from "@/utils/db_interfaces.ts";
import Carousel from "../islands/Carousel.tsx";
import type { State } from "./_middleware.ts";

interface HomePageData extends State {
  items: Book[];
}

function comparePages(a: Book, b: Book) {
  const x = Number(a.pages);
  const y = Number(b.pages);
  if (x > y) {
    return -1;
  }
  if (x < y) {
    return 1;
  }
  return 0;
}

export const handler: Handlers<HomePageData, State> = {
  async GET(_req, ctx) {
    const items = (await getAllItems({ limit: 10 })).sort(comparePages);
    // let votedItemIds: string[] = [];
    if (ctx.state.sessionId) {
      // const sessionUser = await getUserBySessionId(ctx.state.sessionId!);
      // votedItemIds = await getVotedItemIdsByUser(sessionUser!.id);
    }

    /** @todo Optimise */
    // const areVoted = items.map((item) => votedItemIds.includes(item.id));
    return ctx.render({ ...ctx.state, items });
  },
};

export default function HomePage(props: PageProps<HomePageData>) {
  return (
    <>
      <Head href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class={`${SITE_WIDTH_STYLES} flex-1 px-4 snap-proximity snap-y  `}>
          <Hero />
          <Features />
          <Carousel externalImages={[]} showNavigation />
        </div>
      </Layout>
    </>
  );
}
