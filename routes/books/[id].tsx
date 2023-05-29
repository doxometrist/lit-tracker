// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import ItemSummary, { pluralize, timeAgo } from "@/components/ItemSummary.tsx";
import Layout from "@/components/Layout.tsx";
import type { State } from "@/routes/_middleware.ts";
import {
  BUTTON_STYLES,
  INPUT_STYLES,
  SITE_WIDTH_STYLES,
} from "@/utils/constants.ts";
import { createComment, getUserBySessionId, type User } from "@/utils/db.ts";
import { redirect } from "@/utils/http.ts";
import BookCard from "../../components/BookCard.tsx";
import { Book, ReadingList } from "../../utils/db_interfaces.ts";
import {
  addBookToList,
  getBookById,
  getReadingListsByUserId,
} from "../../utils/new-db.ts";

interface BookPageData extends State {
  user: User | null;
  book: Book;
  ownLists: ReadingList[];
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
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId);
      if (user) {
        ownLists = await getReadingListsByUserId(user.id);
      }
    }

    console.log("here user is :", user);
    return ctx.render({
      ...ctx.state,
      book,
      ownLists,
      user,
    });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const addToListId: string = form.get("list")?.toString() ?? "";

    const { id } = ctx.params;
    const addResponse = await addBookToList(id, addToListId);

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", `/books/${id}`);
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function BookPage(props: PageProps<BookPageData>) {
  const user = props.data.user;
  console.log("user in render", user);
  return (
    <>
      <Head title={props.data.book.title} href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class={`${SITE_WIDTH_STYLES} flex-1 px-4 space-y-8`}>
          <BookCard user={props.data.user} book={props.data.book} />
          {props.data.user &&
            (
              <div id="addToListForm" class="m-2 p-2 bg-secondary">
                <form>
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
              </div>
            )}
        </div>
      </Layout>
    </>
  );
}
