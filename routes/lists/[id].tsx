// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import BookCard from "@/components/BookCard.tsx";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import type { State } from "@/routes/_middleware.ts";
import { SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import {
  type Comment,
  createComment,
  getCommentsByItem,
  getUserBySessionId,
  getUsersByIds,
  type User,
} from "@/utils/db.ts";
import { Book, ReadingList } from "@/utils/db_interfaces.ts";
import { redirect } from "@/utils/http.ts";
import { getBooksByReadingListId, getReadingListByid } from "@/utils/new-db.ts";

interface ListPageData extends State {
  user: User | null;
  list: ReadingList;
  books: Book[];
  comments: Comment[];
  commentsUsers: User[];
}

export const handler: Handlers<ListPageData, State> = {
  async GET(_req, ctx) {
    const { id } = ctx.params;
    console.log("id: ", id);

    const list = await getReadingListByid(id);
    if (list === null) {
      console.log("item null");
      return ctx.renderNotFound();
    }

    const comments = await getCommentsByItem(id);
    const commentsUsers = await getUsersByIds(
      comments.map((comment) => comment.userId),
    );
    // const user = await getUserById(item.finishedUserIds);

    let user: User | null = null;
    if (ctx.state.sessionId) {
      // const sessionUser = await getUserBySessionId(ctx.state.sessionId);
      user = await getUserBySessionId(ctx.state.sessionId);
    }

    const books = await getBooksByReadingListId(id);

    return ctx.render({
      ...ctx.state,
      comments,
      books,
      list,
      user,
      commentsUsers,
    });
  },

  async POST(req, ctx) {
    if (!ctx.state.sessionId) {
      return redirect("/login");
    }

    const form = await req.formData();
    const text = form.get("text");

    if (typeof text !== "string") {
      return new Response(null, { status: 400 });
    }

    const user = await getUserBySessionId(ctx.state.sessionId);

    await createComment({
      userId: user!.id,
      itemId: ctx.params.id,
      text,
    });

    return redirect(`/item/${ctx.params.id}`);
  },
};

export default function ListPage(props: PageProps<ListPageData>) {
  console.log("list: ", props.data.list);
  const books = props.data.books;
  return (
    <>
      <Head title={props.data.list.title} href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class={`${SITE_WIDTH_STYLES} flex-1 px-4 space-y-8`}>
          <div>
            <h3>here contents of this list:</h3>
          </div>
          <ul>
            {books.map((b, i) => {
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
