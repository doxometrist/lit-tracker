// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { State } from "@/routes/_middleware.ts";
import { BUTTON_STYLES, DEFAULT_IMG, INPUT_STYLES } from "@/utils/constants.ts";
import { InitBook, ReadingList } from "@/utils/db_interfaces.ts";
import {
  addBookToList,
  createBook,
  getReadingListsByUserId,
} from "@/utils/new-db.ts";
import { getUserBySessionId, User } from "../../utils/db.ts";

interface NewBookPageData extends State {
  user: User;
  ownLists: ReadingList[];
}

function Form(props: { options: ReadingList[] }) {
  return (
    <form class=" space-y-2 bg-primary2 m-2 p-2" method="post">
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
        name="author"
        required
        placeholder="Author"
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
      <label
        class={INPUT_STYLES}
        for="cover"
      >
        Book cover image link
      </label>
      <input type="url" name="cover" />

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
    // can do "!" as middleware excludes not logged in sessions
    const user = await getUserBySessionId(ctx.state.sessionId!) as User;
    const ownLists = await getReadingListsByUserId(user.id);
    return ctx.render({ ...ctx.state, user, ownLists });
  },

  async POST(req, ctx) {
    const user = await getUserBySessionId(ctx.state.sessionId!) as User;
    const form = await req.formData();
    const book: InitBook = {
      uploaderId: user.id,
      description: form.get("description")?.toString() ?? "",
      title: form.get("title")?.toString() ?? "",
      pages: 0,
      author: form.get("author")?.toString() ?? "",
      coverUrl: form.get("cover")?.toString() ?? "",
    };

    const finalBookId = await createBook(book);
    console.log("create response", finalBookId);

    if (finalBookId) {
      const addToListId: string = form.get("list")?.toString() ?? "";
      // can do "!" as middleware excludes not logged in sessions
      const user = await getUserBySessionId(ctx.state.sessionId!) as User;
      const addResponse = await addBookToList(
        finalBookId,
        addToListId,
        user.id,
      );

      // Redirect user to thank you page.
      const headers = new Headers();
      headers.set("location", `/lists/${addToListId}`);
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    }

    return new Response(null, {
      status: 404,
    });
  },
};

export default function NewBook(props: PageProps<NewBookPageData>) {
  return (
    <>
      <Head title="New Book" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Reference a new book</strong>
          </h1>
          <Form options={props.data.ownLists} />
        </div>
      </Layout>
    </>
  );
}
