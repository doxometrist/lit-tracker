import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { getUserBySessionId, User } from "../../utils/db.ts";
import { Book, ReadingList } from "../../utils/db_interfaces.ts";
import {
  getAllBooks,
  getBooksByReadingListId,
  getReadingListsByUserId,
} from "../../utils/new-db.ts";
import { State } from "../_middleware.ts";
import ListCard from "../../components/ListCard.tsx";
import BookCard from "../../components/BookCard.tsx";

export interface OwnUploadedBooksPageData extends State {
  user: User;
  ownBooks: Book[];
}

export const handler: Handlers<OwnUploadedBooksPageData, State> = {
  async GET(_request, ctx) {
    const user = await getUserBySessionId(ctx.state.sessionId!) as User;
    const books: Book[] = await getAllBooks();
    console.log("books: ", books);
    const ownBooks = books.filter((b) => b.uploaderId === user.id);
    return ctx.render({ ...ctx.state, ownBooks, user });
  },
};

export default function OwnBooks(props: PageProps<OwnUploadedBooksPageData>) {
  return (
    <>
      <Head title="any" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>any</strong>
          </h1>
          <div id="goToNewList">
            <a href="/new-book">
              add more books
            </a>
          </div>
          <div id="test" class="bg-primary">
            <ul>
              {props.data.ownBooks.map((b, i) => {
                return <BookCard book={b} user={props.data.user} />;
              })}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
