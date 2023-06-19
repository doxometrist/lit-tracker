// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "@/routes/_middleware.ts";
import { getUserBySessionId } from "@/utils/db.ts";
import { Book } from "@/utils/db_interfaces.ts";
import { addBookToList, removeBookFromList } from "@/utils/new-db.ts";

async function sharedBookListHandler(
  req: Request,
  ctx: HandlerContext<PageProps<Book>, State>,
) {
  if (!ctx.state.sessionId) return new Response(null, { status: 401 });

  const params = new URL(req.url).searchParams;
  console.log('params for the book to list request', params);

  const bookId = params.get("book_id");
  if (!bookId) return new Response(null, { status: 400 });
  const listId = params.get("list_id");
  if (!listId) return new Response(null, { status: 400 });

  const user = await getUserBySessionId(ctx.state.sessionId);
  if (!user) return new Response(null, { status: 400 });

  let status;
  switch (req.method) {
    case "DELETE":
      console.log('got a delete request')
      status = 204;
      addBookToList(bookId, listId, user.id)
      break;
    case "POST":
      removeBookFromList(bookId, listId)
      status = 200;
      break;
    default:
      return new Response(null, { status: 400 });
  }

  return new Response(null, { status });
}

export const handler: Handlers<PageProps, State> = {
  DELETE: sharedBookListHandler,
  POST: sharedBookListHandler,
};
