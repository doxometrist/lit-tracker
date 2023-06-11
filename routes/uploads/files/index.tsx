// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import ListCard from "@/components/ListCard.tsx";
import { State } from "@/routes/_middleware.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { ReadingList, TmpBook } from "@/utils/db_interfaces.ts";
import {
  getAllReadingLists,
  getBooksByReadingListId,
  getReadingListsByUserId,
  saveTmpBook,
} from "@/utils/new-db.ts";
import { BUTTON_STYLES } from "../../../utils/constants.ts";
import {
  FormFile,
  multiParser,
} from "https://deno.land/x/multiparser@0.114.0/mod.ts";
import { redirect } from "../../../utils/http.ts";

interface PdfUploadPage extends State {
  user: User | null;
  filenames: string[];
  ownLists: ReadingList[];
}

export const handler: Handlers<PdfUploadPage, State> = {
  // todo here the discovery algorithm
  async GET(req, ctx) {
    console.log("context in uploads:", ctx);
    const readFiles = ctx.params.files;
    console.log(readFiles);
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    if (!user) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    const filenames: string[] = [];
    const ownLists = await getReadingListsByUserId(user.id);
    return ctx.render({ ...ctx.state, user, filenames, ownLists });
  },

  // todo that should receive all bookname objects
  async POST(req, ctx) {
    console.log("req:", req);
    const m = await multiParser(req);
    console.log("m:", m);
    const files: Record<string, FormFile[] | FormFile> | undefined = m?.files;
    if (!files) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    // console.log("files: ", files);
    const items: FormFile[] = files["files"] as FormFile[];
    items.forEach((i) => {
      console.log(i.filename, i.size);
    });
    const tmp: TmpBook[] = items.map((t) => {
      return { name: t.filename, size: t.size.valueOf() };
    });
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    if (!user) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    console.log('tmp on creation: ', tmp);
    tmp.forEach((t) => saveTmpBook(t, user!.id));

    return redirect("/uploads/structured");
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
          <form method="post" encType="multipart/form-data">
            <label for="files">Upload files, we'll read the name</label>
            <label for="list">here select to which list does it belong</label>
            <select id="list" name="list" required multiple>
              {props.data.ownLists.map((list, i) => {
                return (
                  <option key={`option-${i}`} value={list.id}>
                    {list.title}
                  </option>
                );
              })}
            </select>
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
