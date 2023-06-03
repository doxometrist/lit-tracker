import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { getUserBySessionId, User } from "../../utils/db.ts";
import { Book, ReadingList } from "../../utils/db_interfaces.ts";
import {
  getBooksByReadingListId,
  getReadingListsByUserId,
} from "../../utils/new-db.ts";
import { State } from "../_middleware.ts";
import ListCard from "../../components/ListCard.tsx";
import { BUTTON_STYLES } from "../../utils/constants.ts";

export interface MyListsPageData extends State {
  user: User;
  lists: ReadingList[];
  booksNumber: number[];
}

export const handler: Handlers<MyListsPageData, State> = {
  async GET(_request, ctx) {
    const user = await getUserBySessionId(ctx.state.sessionId!) as User;
    const lists: ReadingList[] = await getReadingListsByUserId(user.id);
    const booksNumber: number[] = await Promise.all(
      lists.map(async (list) =>
        (await getBooksByReadingListId(list.id)).length
      ),
    );
    return ctx.render({ ...ctx.state, lists, user, booksNumber });
  },
};

export default function MyLists(props: PageProps<MyListsPageData>) {
  return (
    <>
      <Head title="Personal lists" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Personal lists</strong>
          </h1>
          <div id="goToNewList" class="flex flex-row gap-x-2">
            <button class={`${BUTTON_STYLES}`}>
              <a href="/new-list">
                Make a new list
              </a>
            </button>
            <button class={`${BUTTON_STYLES}`}>
              <a href="/uploads/structured">
                Structured upload
              </a>
            </button>
            <button class={`${BUTTON_STYLES}`}>
              <a href="/uploads/csv">
                CSV upload
              </a>
            </button>
            <button class={`${BUTTON_STYLES}`}>
              <a href="/uploads/files">
                Name files upload
              </a>
            </button>
          </div>
          <div id="test" class="bg-primary">
            <ul>
              {props.data.lists.map((l, i) => {
                return (
                  <ListCard
                    list={l}
                    user={props.data.user}
                    followed={false}
                    booksNumber={props.data.booksNumber[i]}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
