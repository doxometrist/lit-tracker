// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import BookCard from "@/components/BookCard.tsx";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import type { State } from "@/routes/_middleware.ts";
import { SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import { getUserBySessionId, type User } from "@/utils/db.ts";
import { Book, ReadingList } from "@/utils/db_interfaces.ts";
import { getBookById, getReadingListsByUserId } from "@/utils/new-db.ts";
import DeleteBookButton from "@/islands/DeleteBookButton.tsx";
import EditBookForm from "@/islands/EditBookForm.tsx";
import { AddBookToListForm } from "@/routes/books/AddBookToListForm.tsx";

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
    if (book === null) return ctx.renderNotFound();

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
};

export default function BookPage(props: PageProps<BookPageData>) {
  return (
    <>
      <Head title={props.data.book.title} href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class={`${SITE_WIDTH_STYLES} flex-1 px-4 space-y-8`}>
          <BookCard user={props.data.user} book={props.data.book} />
          <div class="bg-primary2 rounded-xl p-2 min-h-20">
            <h3>Description</h3>
            <p>{props.data.book.description}</p>
          </div>
          {props.data.own &&
            (
              <div id="addToListForm" class="m-2 p-2 bg-secondary">
                <div
                  id="buttonBox"
                  class="flex flex-row justify-between w-40 m-2"
                >
                  <AddBookToListForm
                    ownLists={props.data.ownLists}
                    book={props.data.book}
                  />
                  <EditBookForm
                    user={props.data.user!}
                    book={props.data.book}
                  />
                  <DeleteBookButton book={props.data.book} />
                </div>
              </div>
            )}
        </div>
      </Layout>
    </>
  );
}
