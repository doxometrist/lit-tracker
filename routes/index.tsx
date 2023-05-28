// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import { SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import Layout from "@/components/Layout.tsx";
import Head from "@/components/Head.tsx";
import type { State } from "./_middleware.ts";
import ItemSummary from "@/components/ItemSummary.tsx";
import {
  type Book,
  getAllItems,
  getUserBySessionId,
  getUsersByIds,
  getVotedItemIdsByUser,
  type User,
} from "@/utils/db.ts";

interface HomePageData extends State {
  users: User[];
  items: Book[];
}

export function compareScore(a: Book, b: Book) {
  const x = Number(a.score);
  const y = Number(b.score);
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
    /** @todo Add pagination functionality */
    const items = (await getAllItems({ limit: 10 })).sort(compareScore);
    const users = await getUsersByIds(items.map((item) => item.userId));
    // let votedItemIds: string[] = [];
    if (ctx.state.sessionId) {
      // const sessionUser = await getUserBySessionId(ctx.state.sessionId!);
      // votedItemIds = await getVotedItemIdsByUser(sessionUser!.id);
    }

    /** @todo Optimise */
    // const areVoted = items.map((item) => votedItemIds.includes(item.id));
    return ctx.render({ ...ctx.state, items, users });
  },
};

export default function HomePage(props: PageProps<HomePageData>) {
  return (
    <>
      <Head href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class={`${SITE_WIDTH_STYLES} flex-1 px-4 snap-proximity snap-y `}>
          <section class="h-screen snap-center">
            <h2>page 1</h2>
            <p>
              lorem ipsum
            </p>
          </section>
          {
            /* <section class="h-screen snap-center">
            <h2>page 2</h2>
            <p >
              lorem ipsum
            </p>
          </section> */
          }
          {
            /* {props.data.items.map((item, index) => (
            <ItemSummary
              item={item}
              isVoted={props.data.areVoted[index]}
              user={props.data.users[index]}
            />
          ))} */
          }
        </div>
      </Layout>
    </>
  );
}
