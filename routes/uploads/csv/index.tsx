// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import ListCard from "@/components/ListCard.tsx";
import { State } from "@/routes/_middleware.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { ReadingList } from "@/utils/db_interfaces.ts";
import { getAllReadingLists, getBooksByReadingListId } from "@/utils/new-db.ts";
import { BUTTON_STYLES } from "../../../utils/constants.ts";

interface CsvUploadPage extends State {
  user: User | null;
}

export const handler: Handlers<CsvUploadPage, State> = {
  // todo here the discovery algorithm
  async GET(_request, ctx) {
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    const lists = await getAllReadingLists();
    const booksNumber: number[] = await Promise.all(
      lists.map(async (list) =>
        (await getBooksByReadingListId(list.id)).length
      ),
    );
    return ctx.render({ ...ctx.state, user });
  },

  // todo that should receive all book objects
  async POST(_req, ctx) {
    const res = new Response({});
    return res;
  },
};

export default function ListCreationPage(props: PageProps<CsvUploadPage>) {
  return (
    <>
      <Head title="Lists" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Lists</strong>
          </h1>
          <ExampleTable />
          <form>
            <label for="csv">Put CSV of a list here</label>
            <input type="file" name="csv" accept=".csv" />
            <input class={BUTTON_STYLES} type="submit" />
          </form>
        </div>
      </Layout>
    </>
  );
}

function ExampleTable() {
  return (
    <div class="p-2 m-2">
      <h3>Example of a valid CSV</h3>
      <table>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>Pages</th>
          <th>Description</th>
          <th>Link</th>
        </tr>
        <tr>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>https://werwearwea</td>
        </tr>
        <tr>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>https://werwearwea</td>
        </tr>
      </table>
    </div>
  );
}
