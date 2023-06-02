// Copyright 2023 the Deno authors. All rights reserved. MIT license.

import type { Handlers, PageProps } from "$fresh/server.ts";
import BookCard from "@/components/BookCard.tsx";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import type { State } from "@/routes/_middleware.ts";
import { BUTTON_STYLES, SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import { getUserBySessionId, type User } from "@/utils/db.ts";
import { Book, ReadingList } from "@/utils/db_interfaces.ts";
import {
  addBookToList,
  deleteBook,
  getBookById,
  getReadingListByid,
  getReadingListsByUserId,
} from "@/utils/new-db.ts";
import { redirect } from "../../utils/http.ts";

interface BookPageData extends State {
  user: User | null;
  book: Book;
  ownLists: ReadingList[];
  own: boolean;
}

export const handler: Handlers<BookPageData, State> = {
  async GET(_req, ctx) {
    const { id } = ctx.params;

    const book = await getBookById(id);
    if (book === null) {
      return ctx.renderNotFound();
    }

    let ownLists: ReadingList[] = [];
    let user: User | null = null;
    let own = false;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId);
      if (user) {
        ownLists = await getReadingListsByUserId(user.id);
        own = user.id === book.uploaderId;
      }
    }

    return ctx.render({
      ...ctx.state,
      book,
      ownLists,
      user,
      own,
    });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    console.log("form: ", form);
    const addToListId: string | undefined = form.get("list")?.toString();

    const { id } = ctx.params;
    const user: User | null = await getUserBySessionId(ctx.state.sessionId!);
    if (!user) {
      console.error("no user");
      throw Error(`No user logged in`);
    }
    const deleteAction: string | undefined = form.get("delete")?.toString();
    if (deleteAction === "y") {
      console.log("trying to delete");
      deleteBook(id, user.id).then(() => {
        return redirect("/uploaded-by-me-books");
      });
    }
    if (!addToListId) {
      return redirect("/uploaded-by-me-books");
    }
    const list = await getReadingListByid(addToListId);
    if (user.id !== list?.creatorId) {
      throw Error(`wrong user`);
    }
    if (user.id !== list?.creatorId) {
      throw Error(`wrong user`);
    }
    console.log("adding a new book:", id, "to list: ", addToListId);
    const addResponse = await addBookToList(id, addToListId, user.id);
    console.log("add response: ", addResponse);

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", `/lists/${addToListId}`);
    console.log("new headers: ", headers);
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function BookPage(props: PageProps<BookPageData>) {
  const user = props.data.user;
  return (
    <>
      <Head title={props.data.book.title} href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class={`${SITE_WIDTH_STYLES} flex-1 px-4 space-y-8`}>
          <BookCard user={props.data.user} book={props.data.book} />
          {props.data.own &&
            (
              <div id="addToListForm" class="m-2 p-2 bg-secondary">
                <form method="post">
                  <label for="list">
                    here select to which list does it belong
                  </label>
                  <select id="list" name="list" required multiple>
                    {props.data.ownLists.map((list, i) => {
                      return (
                        <option key={`option-${i}`} value={list.id}>
                          {list.title}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    class={`${BUTTON_STYLES} block w-full`}
                    type="submit"
                  >
                    Add all
                  </button>
                </form>
                <div id="deleteBox">
                  <form method="post">
                    <input hidden name="delete" value="y" />
                    <input type="submit" value="Delete" />
                  </form>
                </div>
                <div id="editBox">
                  <form method="post">
                    <input hidden name="delete" value="y" />
                    <input type="submit" value="Delete" />
                  </form>
                </div>
              </div>
            )}
        </div>
      </Layout>
    </>
  );
}
