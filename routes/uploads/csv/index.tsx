// Copyright 2023 the Deno authors. All rights reserved. MIT license.
// multiParser
import {
  FormFile,
  multiParser,
} from "https://deno.land/x/multiparser@0.114.0/mod.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { State } from "@/routes/_middleware.ts";
import { BUTTON_STYLES } from "@/utils/constants.ts";
import {
  objectIntoRepresentation,
  smartUint8ArrayToCSV,
} from "@/utils/csv_utils.ts";
import { User, getUserBySessionId } from "@/utils/db.ts";
import { ReadingList } from "@/utils/db_interfaces.ts";
import { redirect } from "@/utils/http.ts";
import {
  addBookToList,
  createBook,
  getReadingListsByUserId
} from "@/utils/new-db.ts";

interface CsvUploadPage extends State {
  user: User | null;
  ownLists: ReadingList[];
}

export const handler: Handlers<CsvUploadPage, State> = {
  async GET(req, ctx) {
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    if (!user) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    const ownLists = await getReadingListsByUserId(user.id);
    // const booksNumber: number[] = await Promise.all(
    //   ownLists.map(async (list) =>
    //     (await getBooksByReadingListId(list.id)).length
    //   ),
    // );
    return ctx.render({ ...ctx.state, user, ownLists });
  },

  async POST(req, ctx) {
    if (!ctx.state.sessionId) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    if (!user) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }

    const m = await multiParser(req);
    console.log(m?.fields);
    console.log(m);
    const files: Record<string, FormFile | FormFile[]> | undefined = m?.files;
    if (!files) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }
    console.log(files);
    if (typeof files === "string") {
      // todo possibly throw an error
    } else if (typeof files === "object") {
      console.log("filtered", files);
    }
    const file: FormFile = files["csv"] as unknown as FormFile;
    const content = file.content;
    console.log("content:", content);
    const parsed = smartUint8ArrayToCSV(content);
    console.log("paresed: ", parsed);
    const final = objectIntoRepresentation(parsed, user.id);

    const listId = m?.fields["list"];
    if (!listId) {
      await req.body?.cancel();
      return new Response(null, { status: 406 });
    }
    final.books.forEach(async (b) => {
      const id = await createBook(b);

      await addBookToList(id, listId, user!.id);
    });
    return redirect("/uploads/csv");
  },
};

export default function ListCreationPage(props: PageProps<CsvUploadPage>) {
  return (
    <>
      <Head title="Lists" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Lists</strong>
          </h1>
          <ExampleTable />
          <form method="post" encType="multipart/form-data">
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
            <label for="csv">Put CSV of a list here</label>
            <input type="file" name="csv" accept=".csv" />
            <input class={BUTTON_STYLES} type="submit" />
          </form>
        </div>
      </Layout>
    </>
  );
}

function ExampleTable() {
  return (
    <div class="p-2 m-2">
      <h3>Example of a valid CSV</h3>
      <table>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>Pages</th>
          <th>Description</th>
          <th>Link</th>
        </tr>
        <tr>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>https://werwearwea</td>
        </tr>
        <tr>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>werwearwea</td>
          <td>https://werwearwea</td>
        </tr>
      </table>
    </div>
  );
}
