import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { getUserBySessionId, User } from "../../utils/db.ts";
import { Book, ReadingList } from "../../utils/db_interfaces.ts";
import { getReadingListsByUserId } from "../../utils/new-db.ts";
import { State } from "../_middleware.ts";
import ListCard from "../../components/ListCard.tsx";

export interface MyListsPageData extends State {
  user: User;
  lists: ReadingList[];
}

export const handler: Handlers<MyListsPageData, State> = {
  async GET(_request, ctx) {
    const user: User = await getUserBySessionId(ctx.state.sessionId!) as User;
    const lists: ReadingList[] = await getReadingListsByUserId(user.id);
    return ctx.render({ ...ctx.state, lists, user });
  },
};

export default function MyLists(props: PageProps<MyListsPageData>) {
  return (
    <>
      <Head title="any" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>any</strong>
          </h1>
          <div id="goToNewList">
            <a href="/new-list">
              make a new list
            </a>
          </div>
          <div id="test" class="bg-primary">
            <ul>
              {props.data.lists.map((l, i) => {
                return (
                  <ListCard list={l} user={props.data.user} followed={false} />
                );
              })}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
