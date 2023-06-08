// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "@/routes/_middleware.ts";
import { getUserBySessionId } from "@/utils/db.ts";
import { Book, InitBook } from "../../utils/db_interfaces.ts";
import { deleteBook, getBookById, updateBook } from "../../utils/new-db.ts";

async function sharedBookHandler(
  req: Request,
  ctx: HandlerContext<PageProps<Book>, State>,
) {
  if (!ctx.state.sessionId) {
    return new Response(null, { status: 401 });
  }

  const bookId = new URL(req.url).searchParams.get("book_id");

  if (!bookId) {
    return new Response(null, { status: 400 });
  }

  const user = await getUserBySessionId(ctx.state.sessionId);

  if (!user) return new Response(null, { status: 400 });
  let status;
  switch (req.method) {
    case "DELETE":
      console.log('got a delete request')
      status = 204;
      await deleteBook(bookId, user.id);
      break;
    // deno-lint-ignore no-case-declarations
    case "PATCH":
      console.log('got a patch request')
      const previousBook = await getBookById(bookId);
      if (!previousBook) return new Response('cannot update book that does not exist', { status: 400 })
      const params = new URL(req.url).searchParams;

      const newBook: InitBook = {
        title: params.get('title') ?? previousBook.title,
        pages: params.get('pages') ? parseInt(params.get('pages')!) : previousBook.pages,
        author: params.get('author') ?? previousBook.author,
        description: params.get('description') ?? previousBook.description,
        coverUrl: params.get('coverUrl') ?? previousBook.coverUrl,
        uploaderId: user.id
      };
      await updateBook(bookId, newBook, user.id);
      status = 200;
      break;
    default:
      return new Response(null, { status: 400 });
  }

  return new Response(null, { status });
}

export const handler: Handlers<PageProps, State> = {
  POST: sharedBookHandler,
  DELETE: sharedBookHandler,
  PATCH: sharedBookHandler,
};
