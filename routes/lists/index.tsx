// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { BUTTON_STYLES, NOTICE_STYLES } from "@/utils/constants.ts";
import { State } from "@/routes/_middleware.ts";
import { ReadingList } from "@/utils/db_interfaces.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { getAllReadingLists } from "../../utils/new-db.ts";
import ListCard from "../../components/ListCard.tsx";

interface ListsPageData extends State {
  lists: ReadingList[];
  user: User | null;
}
// todo add sorting by author, likes, etc

export const handler: Handlers<ListsPageData, State> = {
  // todo here the discovery algorithm
  async GET(_request, ctx) {
    
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    const lists = await getAllReadingLists();
    return ctx.render({ ...ctx.state, user, lists });
  },
};

export default function ListsPage(props: PageProps<ListsPageData>) {
  return (
    <>
      <Head title="Lists" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Lists</strong>
          </h1>
        </div>
        <div>
          {props.data.lists.length === 0 && "sowwy,  no lists here!"}
          <ul>
            {props.data.lists.map((l, i) => {
              return (
                <li>
                  <ListCard list={l} user={props.data.user} followed={false} />
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    </>
  );
}
