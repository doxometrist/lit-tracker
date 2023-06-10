// Copyright 2023 the Deno authors. All rights reserved. MIT license.
// multiParser
import {
  Form,
  FormFile,
  multiParser,
} from "https://deno.land/x/multiparser@0.114.0/mod.ts";

import { readCSV } from "https://deno.land/x/csv@v0.8.0/mod.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import ListCard from "@/components/ListCard.tsx";
import { State } from "@/routes/_middleware.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { InitBook, ReadingList } from "@/utils/db_interfaces.ts";
import { getAllReadingLists, getBooksByReadingListId } from "@/utils/new-db.ts";
import { BUTTON_STYLES } from "../../../utils/constants.ts";
import {
  copy,
  readAll,
  readerFromStreamReader,
} from "https://deno.land/std@0.164.0/streams/conversion.ts";
import { CSVReader } from "https://deno.land/x/csv@v0.8.0/reader.ts";
import { redirect } from "../../../utils/http.ts";
import { assert } from "https://deno.land/std@0.164.0/_util/asserts.ts";
import { rsLower } from "https://deno.land/x/emoji@0.2.1/unicode.ts";

const exampleFile = {
  name: "csv",
  filename: "verso.csv",
  contentType: "text/csv",
  size: 3001,
  content: [
    65,
    117,
    116,
    104,
    111,
    114,
    44,
    84,
    105,
    116,
    108,
    101,
    44,
    80,
    97,
    103,
    101,
    115,
    44,
    68,
    101,
    115,
    99,
    114,
    105,
    112,
    116,
    105,
    111,
    110,
    10,
    66,
    101,
    110,
    101,
    100,
    105,
    99,
    116,
    32,
    65,
    110,
    100,
    101,
    114,
    115,
    111,
    110,
    44,
    73,
    109,
    97,
    103,
    105,
    110,
    101,
    100,
    32,
    67,
    111,
    109,
    109,
    117,
    110,
    105,
    116,
    105,
    101,
    115,
    44,
    48,
    44,
    34,
    73,
    109,
    97,
    103,
    105,
    110,
    101,
    100,
    32,
    67,
    111,
    109,
    109,
    117,
    110,
    105,
    116,
    105,
    101,
    115,
    32,
    114,
    101,
    109,
    97,
    105,
    110,
  ],
};
interface CsvUploadPage extends State {
  user: User | null;
}

export interface CsvListRepresentation {
  books: InitBook[];
}

function uint8ArrayToCSV(uint8Array: Uint8Array) {
  // Convert Uint8Array to string
  const decoder = new TextDecoder("utf-8");
  const csvString: string = decoder.decode(uint8Array.buffer);

  // Split the string into lines
  const lines = csvString.trim().split("\n");

  // Extract the header and data
  const header = lines[0].split(",");
  const data = lines.slice(1).map((line) => line.split(","));

  // Construct the CSV object
  const csvObject = {
    header,
    data,
  };

  return csvObject;
}

function objectIntoRepresentation(object: any): CsvListRepresentation {
  const books: InitBook[] = [];
  object.data.forEach((row: any[]) => {
    const b: InitBook = {
      title: row[1],
      pages: row[2],
      author: row[0],
      description: row[3],
      coverUrl: row[4],
      uploaderId: "",
    };
    books.push(b);
  });
  return { books };
}

export const handler: Handlers<CsvUploadPage, State> = {
  // todo here the discovery algorithm
  async GET(_request, ctx) {
    let user: User | null = null;
    if (ctx.state.sessionId) {
      user = await getUserBySessionId(ctx.state.sessionId!) as User;
    }
    const lists = await getAllReadingLists();
    const booksNumber: number[] = await Promise.all(
      lists.map(async (list) =>
        (await getBooksByReadingListId(list.id)).length
      ),
    );
    return ctx.render({ ...ctx.state, user });
  },

  // todo that should receive all book objects
  async POST(req, ctx) {
    if (!ctx.state.sessionId) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }

    const m = await multiParser(req);

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
    const parsed = uint8ArrayToCSV(content);
    console.log("paresed: ", parsed);
    const final = objectIntoRepresentation(parsed);
    console.log('final: ', final);

    // const reader = new Deno.read();
    // const r = new CSVReader(reader);
    // for (const row of file.content) {
    //   console.log("row:");
    //   for await (const cell of row) {
    //     console.log(`  cell: ${cell}`);
    //   }
    // }
    // const form = await req.formData();
    // const fileName = form.get("csv");

    // for (const v of form.entries()) {
    //   console.log(v);
    // }
    // // req.respondWith(new Response());
    // const url = new URL(req.url);
    // const fileName2 = url.searchParams.get("csv");
    // if (!req.body) {
    //   return new Response(null, { status: 400 });
    // }
    // console.log("filename:", fileName);
    // const SAVE_PATH = "../data/tmp/";
    // // const reader = req?.body?.getReader();

    // const t = await Deno.create(SAVE_PATH + fileName);
    // console.log("t: ", t);
    // const f = await Deno.open(SAVE_PATH + fileName, {
    //   create: true,
    //   write: true,
    // });

    // for await (const row of readCSV(f)) {
    //   console.log("row:");
    //   for await (const cell of row) {
    //     console.log(`cell: ${cell}`);
    //   }
    // }

    // // const newLocal: Deno.Reader = readerFromStreamReader(reader);
    // // await copy(newLocal, f);
    // f.close();
    return redirect("/uploads/csv");
    return new Response();

    const res = new Response(null, { status: 401 });
    return res;
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
