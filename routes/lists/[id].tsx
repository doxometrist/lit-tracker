// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import BookCard from "@/components/BookCard.tsx";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import DeleteListButton from "@/islands/DeleteListButton.tsx";
import EditListForm from "@/islands/EditListForm.tsx";
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
import { getIpfsAddress } from "@/utils/ipfs_facade.ts";
import {
  getBooksByReadingListId,
  getReadingListByid,
  updateList,
} from "@/utils/new-db.ts";
import DownloadCsvButton from "../../islands/DownloadCsvButton.tsx";

interface ListPageData extends State {
  user: User | null;
  list: ReadingList;
  books: Book[];
  comments: Comment[];
  commentsUsers: User[];
  suggestions: Book[];
  own: boolean;
  ipfsUrl: string;
}

// todo need to add fetching for the json item? or only on opening?
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

    const ipfsUrl = getIpfsAddress(list.id);
    return ctx.render({
      ...ctx.state,
      own,
      comments,
      books,
      list,
      user,
      suggestions,
      commentsUsers,
      ipfsUrl,
    });
  },

  // THIS IS FOR THE EDIT FUNCTIONALITY, the rest goes through the API
  async POST(req, ctx) {
    const { id } = ctx.params;
    const form = await req.formData();
    const user = await getUserBySessionId(ctx.state.sessionId!);
    if (!user) return new Response(null, { status: 401 });
    const newList: InitReadingList = {
      creatorId: user!.id,
      description: form.get("description")?.toString() ?? "",
      title: form.get("title")?.toString() ?? "",
      backgroundImageUrl: form.get("background_url")?.toString() ?? "",
    };

    // Add email to list.

    const updateResponse = await updateList(id, newList, user.id);

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/my-lists");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function ListPage(props: PageProps<ListPageData>) {
  const books = props.data.books;
  const text = "Thinking of going through this reading list...";
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
          <div>
            <h3>Description:</h3>
            <p>{props.data.list.description}</p>
          </div>
          <div
            id="addBooksRegion"
            class="m-2 p-2 bg-primary flex flex-row gap-x-2 border border-4 border-solid"
          >
            <a
              class="twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=${text}`}
            >
              Tweet this!
            </a>
            <DownloadCsvButton
              books={props.data.books}
              filename={props.data.list.title}
            />
          </div>
          {props.data.own &&
            (
              <div
                id="management"
                className="m-2 border border-1 border-solid flex flex-row justify-start min-w-40"
              >
                <h2 class="m-2 text-xl p-2">Manage list</h2>
                <EditListForm
                  changeableProps={props.data.list}
                  id={props.data.list.id}
                />
                <DeleteListButton list={props.data.list} />
              </div>
            )}
          <div id="bookcard-container" class="grid grid-cols-3">
            {books.map((b) => <BookCard book={b} user={props.data.user} />)}
          </div>
          {
            /* <ul>
            {books.map((b, i) => {
              return (
                <li>
                  <BookCard book={b} user={props.data.user} />
                </li>
              );
            })}
          </ul> */
          }
        </div>
      </Layout>
    </>
  );
}
