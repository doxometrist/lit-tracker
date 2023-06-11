// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { State } from "@/routes/_middleware.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { InitBook, ReadingList, TmpBook } from "@/utils/db_interfaces.ts";
import {
  createBook,
  getReadingListsByUserId,
  getTmpBooksById,
} from "@/utils/new-db.ts";
import { BUTTON_STYLES, MAX_LIST_LENGTH } from "../../../utils/constants.ts";
import { redirect } from "../../../utils/http.ts";

interface StructuredUploadPage extends State {
  user: User | null;
  ownLists: ReadingList[];
  temporary: TmpBook[];
}

export const handler: Handlers<StructuredUploadPage, State> = {
  async GET(req, ctx) {
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    if (!user) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    const ownLists = await getReadingListsByUserId(user.id);
    const temporary = await getTmpBooksById(user.id);
    return ctx.render({ ...ctx.state, user, ownLists, temporary });
  },

  async POST(req, ctx) {
    if (!ctx.state.sessionId) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }

    const form = await req.formData();
    const title = form.get("title");
    const url = form.get("url");

    if (typeof title !== "string" || typeof url !== "string") {
      return new Response(null, { status: 400 });
    }

    try {
      // Throws if an invalid URL
      new URL(url);
    } catch {
      return new Response(null, { status: 400 });
    }

    const user = await getUserBySessionId(ctx.state.sessionId);

    if (!user) return new Response(null, { status: 400 });
    // todo add uploader data
    // todo add list description fields like in the regular form, or choose to which form these are added

    const initBooks: InitBook[] = [];
    // todo move this to a separaate place, one function to parse the full object starting from the pdf upload
    initBooks.forEach(async (book, index) => {
      await createBook(book);
    });

    return redirect(`/lists/some-new-list-id}`);
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
  const tmp = props.data.temporary;
  console.log("tmp:", tmp);
  return (
    <>
      <Head title="Type out a new list" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Add to existing list</strong>
          </h1>
          <form method="POST">
            <label for="list">here select to which list does it belong</label>
            <select id="list" name="list" required multiple>
              {props.data.ownLists.map((list, i) => {
                return (
                  <option key={`option-${i}`} value={list.id}>
                    {list.title}
                  </option>
                );
              })}
            </select>
            <table>
              <tr>
                <th>Number</th>
                <th>Author</th>
                <th>Description</th>
                <th>Title</th>
                <th>Cover url link</th>
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
                      <input
                        type="text"
                        name={`title-${n}`}
                        value={n < tmp.length ? tmp[n].name : ""}
                      />
                    </td>
                    <td>
                      <input type="link" name={`link-${n}`} />
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
