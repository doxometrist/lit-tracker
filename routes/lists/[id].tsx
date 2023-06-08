// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import BookCard from "@/components/BookCard.tsx";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import DeleteListButton from "@/islands/DeleteListButton.tsx";
import EditListForm from "@/islands/EditListForm.tsx";
import IpfsOpenButton from "@/islands/IpfsOpenButton.tsx";
import IpfsUploadButton from "@/islands/IpfsUploadButton.tsx";
import type { State } from "@/routes/_middleware.ts";
import { MAX_LIST_LENGTH, SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import {
  type Comment,
  getCommentsByItem,
  getUserBySessionId,
  getUsersByIds,
  type User,
} from "@/utils/db.ts";
import { Book, InitReadingList, ReadingList } from "@/utils/db_interfaces.ts";
import { getBooksByReadingListId, getReadingListByid } from "@/utils/new-db.ts";

interface ListPageData extends State {
  user: User | null;
  list: ReadingList;
  books: Book[];
  comments: Comment[];
  commentsUsers: User[];
  suggestions: Book[];
  own: boolean;
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

    let user: User | null = null;
    let own = false;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId);
      if (user?.id === list.creatorId) {
        own = true;
      }
    }

    const books = await getBooksByReadingListId(id);
    let suggestions: Book[] = [];
    if (books.length < MAX_LIST_LENGTH / 2) {
      // todo use embeddings to get a close book
      // todo need a tag system
    }

    return ctx.render({
      ...ctx.state,
      own,
      comments,
      books,
      list,
      user,
      suggestions,
      commentsUsers,
    });
  },
};

export default function ListPage(props: PageProps<ListPageData>) {
  const books = props.data.books;
  return (
    <>
      <Head title={props.data.list.title} href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class={`${SITE_WIDTH_STYLES} flex-1 px-4 space-y-8`}>
          <div>
            <img
              src={props.data.list.backgroundImageUrl}
              width={200}
              height={200}
            />
          </div>
          <div>
            <h2>{props.data.list.title}</h2>
            <h3>here contents of this list:</h3>
          </div>
          <div
            id="addBooksRegion"
            class="m-2 p-2 bg-primary flex flex-row gap-x-2"
          >
            <IpfsUploadButton list={props.data.list} books={props.data.books} />
            <IpfsOpenButton listId={props.data.list.id} />
          </div>
          {props.data.own &&
            (
              <div id="management" className="m-2 flex flex-row justify-start">
                <EditListForm
                  user={props.data.user!}
                  startingListValues={props.data.list as InitReadingList}
                />
                <DeleteListButton list={props.data.list} />
              </div>
            )}
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
