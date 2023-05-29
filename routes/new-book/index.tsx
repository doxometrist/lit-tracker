// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { BUTTON_STYLES, INPUT_STYLES } from "@/utils/constants.ts";
import {
  InitBook,
  InitReadingList,
  ReadingList,
} from "../../utils/db_interfaces.ts";
import { getUserBySessionId, User } from "../../utils/db.ts";
import { State } from "../_middleware.ts";
import {
  addBookToList,
  createBook,
  createReadingList,
  getReadingListsByUserId,
} from "../../utils/new-db.ts";
import { list } from "https://esm.sh/v122/postcss@8.4.23/esnext/postcss.mjs";

interface NewBookPageData extends State {
  user: User;
  ownLists: ReadingList[];
}

function Form(props: { options: ReadingList[] }) {
  return (
    <form class=" space-y-2" method="post">
      <input
        class={INPUT_STYLES}
        type="text"
        name="title"
        required
        placeholder="Title"
      />
      <input
        class={INPUT_STYLES}
        type="text"
        name="description"
        required
        placeholder="Here goes your description"
      />
      <input
        class={INPUT_STYLES}
        type="number"
        min={1}
        placeholder="200"
        name="pages"
      />
      <label for="list">here select to which list does it belong</label>
      <select id="list" name="list" required multiple>
        {props.options.map((list, i) => {
          return (
            <option key={`option-${i}`} value={list.id}>{list.title}</option>
          );
        })}
      </select>
      <button class={`${BUTTON_STYLES} block w-full`} type="submit">
        Submit
      </button>
    </form>
  );
}

export const handler: Handlers<NewBookPageData, State> = {
  async GET(_request, ctx) {
    const user = await getUserBySessionId(ctx.state.sessionId!) as User;
    const ownLists = await getReadingListsByUserId(user.id);
    return ctx.render({ ...ctx.state, user, ownLists });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    // const user = await getUserBySessionId(ctx.state.sessionId!) as User;
    const book: InitBook = {
      description: form.get("description")?.toString() ?? "",
      title: form.get("title")?.toString() ?? "",
      pages: 0,
      author: "",
    };
    const addToListId: string = form.get("list")?.toString() ?? "";

    const createResponse = await createBook(book);

    console.log('create response', createResponse);
    if (createResponse.id) {
      const addResponse = await addBookToList(createResponse?.id, addToListId);
    }

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/new-book");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function NewBook(props: PageProps<NewBookPageData>) {
  return (
    <>
      <Head title="any" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>here make a new book</strong>
          </h1>
          <Form options={props.data.ownLists} />
        </div>
      </Layout>
    </>
  );
}
