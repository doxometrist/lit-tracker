// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { BUTTON_STYLES, NOTICE_STYLES } from "@/utils/constants.ts";
import { State } from "@/routes/_middleware.ts";
import { Book } from "@/utils/db_interfaces.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { getAllBooks, getAllReadingLists } from "../../utils/new-db.ts";
import ListCard from "../../components/ListCard.tsx";
import BookCard from "../../components/BookCard.tsx";

interface BooksPageData extends State {
  books: Book[];
  user: User;
}

// todo add sorting by author, likes, etc

export const handler: Handlers<BooksPageData, State> = {
  // todo here the discovery algorithm
  async GET(_request, ctx) {
    const user = await getUserBySessionId(ctx.state.sessionId!) as User;
    const books = await getAllBooks();
    return ctx.render({ ...ctx.state, user, books });
  },
};

export default function ListsPage(props: PageProps<BooksPageData>) {
  return (
    <>
      <Head title="any" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>any</strong>
          </h1>
        </div>
        <div>
          {props.data.books.length === 0 && "sowwy,  no lists here!"}
          <ul>
            {props.data.books.map((b, i) => {
              return (
                <li>
                  <BookCard book={b} user={props.data.user} />
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    </>
  );
}
