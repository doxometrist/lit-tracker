// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "@/routes/_middleware.ts";
import { getUserBySessionId } from "@/utils/db.ts";
import { deleteList, updateList } from "../../utils/new-db.ts";

async function sharedListHandler(
  req: Request,
  ctx: HandlerContext<PageProps<undefined>, State>,
) {
  if (!ctx.state.sessionId) {
    return new Response(null, { status: 401 });
  }

  const listId = new URL(req.url).searchParams.get("list_id");

  if (!listId) {
    return new Response(null, { status: 400 });
  }

  const user = await getUserBySessionId(ctx.state.sessionId);

  if (!user) return new Response(null, { status: 400 });
  let status;
  switch (req.method) {
    case "DELETE":
      status = 204;
      await deleteList(user.id, listId);
      break;
    case "PATCH":
      status = 204;
      await updateList(user.id, listId);
      break;
    default:
      return new Response(null, { status: 400 });
  }

  return new Response(null, { status });
}

export const handler: Handlers<PageProps, State> = {
  DELETE: sharedListHandler,
  PATCH: sharedListHandler
};
