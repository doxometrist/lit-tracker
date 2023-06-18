import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { State } from "@/routes/_middleware.ts";
import { getUserBySessionId, User } from "@/utils/db.ts";
import { InitBook, ReadingList } from "@/utils/db_interfaces.ts";
import { createBook, getReadingListsByUserId } from "@/utils/new-db.ts";
import UploadWrapper from "../../islands/Wrapper.tsx";
import { redirect } from "../../utils/http.ts";

export interface ListCreationPage extends State {
  user: User | null;
  filenames: string[];
  ownLists: ReadingList[];
}

export const handler: Handlers<ListCreationPage, State> = {
  async GET(req, ctx) {
    console.log("context in uploads:", ctx);
    // const readFiles = ctx.params.files;
    // console.log(readFiles);

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
    // const temporary = await getTmpBooksById(user.id);
    // return ctx.render({ ...ctx.state, user, filenames, ownLists, temporary });
    return ctx.render({ ...ctx.state, user, filenames, ownLists });
  },

  async POST(req, ctx) {
    // todo need to differentiate between new list and addition to old.
    if (!ctx.state.sessionId) {
      await req.body?.cancel();
      return new Response(null, { status: 401 });
    }

    const form = await req.formData();
    const title = form.get("title");
    const url = form.get("url");

    if (typeof title !== "string" || typeof url !== "string") {
      return new Response(null, { status: 400 });
    }

    try {
      // Throws if an invalid URL
      new URL(url);
    } catch {
      return new Response(null, { status: 400 });
    }

    const user = await getUserBySessionId(ctx.state.sessionId);

    if (!user) return new Response(null, { status: 400 });
    // todo add uploader data
    // todo add list description fields like in the regular form, or choose to which form these are added

    const initBooks: InitBook[] = [];
    // todo move this to a separaate place, one function to parse the full object starting from the pdf upload
    initBooks.forEach(async (book, index) => {
      await createBook(book);
    });

    return redirect(`/lists/some-new-list-id}`);
  },
};

export default function ListCreationPage(props: PageProps<ListCreationPage>) {
  return (
    <>
      <Head title="Lists" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <h1 class="text-3xl mb-4">
            <strong>Create a new list</strong>
          </h1>
          <UploadWrapper ownLists={props.data.ownLists} />
        </div>
      </Layout>
    </>
  );
}
