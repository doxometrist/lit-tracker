// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import ListCard from "@/components/ListCard.tsx";
import { State } from "@/routes/_middleware.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { ReadingList } from "@/utils/db_interfaces.ts";
import { getAllReadingLists, getBooksByReadingListId } from "@/utils/new-db.ts";
import { BUTTON_STYLES, MAX_LIST_LENGTH } from "../../../utils/constants.ts";
import { ConstructorDeclarationOverloadBase } from "https://deno.land/x/ts_morph@17.0.1/ts_morph.js";

interface StructuredUploadPage extends State {
  user: User | null;
}

export const handler: Handlers<StructuredUploadPage, State> = {
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

function range(start: number, end: number, step = 1) {
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}

// at max 20 available
export default function ListCreationPage(
  props: PageProps<StructuredUploadPage>,
) {
  const numArr = range(0, MAX_LIST_LENGTH);
  console.log(numArr);
  return (
    <>
      <Head title="Type out a new list" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>New list</strong>
          </h1>
          <form>
            <label for="list-name">
              List name:
            </label>
            <input type="text" name="list-name" />
            <table>
              <tr>
                <th>Number</th>
                <th>Author</th>
                <th>Description</th>
                <th>Title</th>
              </tr>

              {numArr.map((n) => {
                return (
                  <tr>
                    <td>{n}</td>
                    <td>
                      <input type="text" name={`author-${n}`} />
                    </td>
                    <td>
                      <input type="text" name={`description-${n}`} />
                    </td>
                    <td>
                      <input type="text" name={`title-${n}`} />
                    </td>
                  </tr>
                );
              })}
              <button class={` m-2 p-2 ${BUTTON_STYLES}`}>
                <input type="submit" />
              </button>
            </table>
          </form>
        </div>
      </Layout>
    </>
  );
}
