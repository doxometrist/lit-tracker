// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import ListCard from "@/components/ListCard.tsx";
import { State } from "@/routes/_middleware.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { ReadingList } from "@/utils/db_interfaces.ts";
import { getAllReadingLists, getBooksByReadingListId } from "@/utils/new-db.ts";
import { BUTTON_STYLES } from "../../../utils/constants.ts";

interface PdfUploadPage extends State {
  user: User | null;
  filenames: string[];
}

export const handler: Handlers<PdfUploadPage, State> = {
  // todo here the discovery algorithm
  async GET(_request, ctx) {
    const readFiles = ctx.params.files;
    console.log(readFiles);
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    const filenames: string[] = [];
    return ctx.render({ ...ctx.state, user, filenames });
  },

  // todo that should receive all book objects
  async POST(_req, ctx) {
    const res = new Response({});
    return res;
  },
};

export default function ListCreationPage(props: PageProps<PdfUploadPage>) {
  return (
    <>
      <Head title="Lists" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Lists</strong>
          </h1>
          <form>
            <label for="files">Upload files, we'll read the name</label>
            <input type="file" name="files" multiple />
            <button class={BUTTON_STYLES}>
              <input type="submit" />
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}
