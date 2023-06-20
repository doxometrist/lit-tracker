// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "@/routes/_middleware.ts";
import { getUserBySessionId } from "@/utils/db.ts";
import { deleteList, getBooksByReadingListId, getReadingListByid, updateList } from "../../utils/new-db.ts";
import { uploadJsonToIpfs } from "../../utils/ipfs_facade.ts";

async function sharedListHandler(
  req: Request,
  ctx: HandlerContext<PageProps<undefined>, State>,
) {
  if (!ctx.state.sessionId) {
    return new Response(null, { status: 401 });
  }

  const searchParams = new URL(req.url).searchParams;
  const listId = searchParams.get("list_id");

  if (!listId) {
    return new Response(null, { status: 400 });
  }

  const user = await getUserBySessionId(ctx.state.sessionId);
  const action = searchParams.get('action');

  if (!user) return new Response(null, { status: 400 });
  let status;
  switch (req.method) {
    case "DELETE":
      status = 204;
      await deleteList(user.id, listId);
      break;
    case "PATCH":
      status = 204;
      console.log('got a patch request for list', req);
      console.log('params: ', searchParams);
      // await updateList(listId, searchParams, user.id);
      break;
    case "POST":
      console.log('got a post request for list');
      console.log('params: ', searchParams);
      if (action === 'ipfs-upload') {
        console.log("clicked button to upload to ipfs");
        const books = getBooksByReadingListId(listId);
        const list = getReadingListByid(listId);
        const item = {
          books,
          list,
        };
        const itemJson: string = JSON.stringify(item);
        console.log("uploaded json", itemJson);
        await uploadJsonToIpfs(itemJson);
        status = 204;
      } else if (action == 'edit') {
        console.log('got a patch request for list', req);
        console.log('params: ', searchParams);
        // await updateList(listId, searchParams, user.id);
      } else {
        console.log('not supported');
      }
      break;
    default:
      return new Response(null, { status: 400 });
  }

  return new Response(null, { status });
}

export const handler: Handlers<PageProps, State> = {
  POST: sharedListHandler,
  DELETE: sharedListHandler,
  PATCH: sharedListHandler
};

